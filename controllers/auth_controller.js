const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const UserData = require('../domain/data/user_data');
const EShopError = require('../domain/errors/error');
const { generateRefreshToken } = require('../domain/utils/token_utils');

const restrictTo = (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			return next(
				new EShopError('You do not have access to this route', 403)
			);
		}

		next();
	};
};

const loginUserWithEmail = asyncHandler(async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password) {
		throw new EShopError('Please provide email and password', 400);
	}

	const user = await UserData.findOne({ email }).select('+password');

	if (user && (await user.isPasswordMatching(password, user.password))) {
		const refreshToken = await generateRefreshToken(user.id);

		res.cookie('refreshToken', refreshToken, {
			httpOnly: true,
			maxAge: 72 * 60 * 60 * 1000,
		});

		res.json({
			id: user.id,
			firstname: user.firstname,
			lastname: user.lastname,
			email: user.email,
			mobile: user.mobile,
			token: refreshToken,
		});
	} else {
		throw new EShopError('Invalid Credentials', 403);
	}
});

// checking if the token used to access routes is a valid token
const protect = asyncHandler(async (req, res, next) => {
	// check and get the token if it is provided in req
	let token;
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		token = req.headers.authorization.split(' ')[1];
	} else if (req.cookies?.refreshToken) {
		token = req.cookies.refreshToken;
	}

	if (!token) {
		throw new EShopError(
			'You are not logged in ! Please provide the token to continue...',
			401
		);
	}

	// verify the token
	const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

	// validate if the user still exists
	const currUser = await UserData.findById(decoded.id);
	if (!currUser) {
		throw new EShopError(
			'user belonging to this request no longer exists!',
			401
		);
	}

	// validate if the last password change was before this token was issued
	if (currUser.isPasswordChangedAfter(decoded.iat)) {
		throw new EShopError(
			'User recently changed password! Please login again!!',
			401
		);
	}

	req.user = currUser;
	next();
});

module.exports = { loginUserWithEmail, restrictTo, protect };
