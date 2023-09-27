const UserData = require('../domain/data/user_data');
const EShopError = require('../domain/errors/error');
const { generateRefreshToken } = require('../domain/utils/token_utils');
const asyncHandler = require('express-async-handler');

const loginUserWithEmail = asyncHandler(async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password) {
		throw new EShopError('Please provide email and password', 400);
	}

	const user = await UserData.findOne({ email });

	if (user && (await user.isPasswordMatching(password, user.password))) {
		const refreshToken = await generateRefreshToken(user._id);

		const updateuser = await UserData.findByIdAndUpdate(
			user.id,
			{
				refreshToken: refreshToken,
			},
			{ new: true }
		);

		res.cookie('refreshToken', refreshToken, {
			httpOnly: true,
			maxAge: 72 * 60 * 60 * 1000,
		});

		res.json({
			_id: user?._id,
			firstname: user?.firstname,
			lastname: user?.lastname,
			email: user?.email,
			mobile: user?.mobile,
			token: refreshToken,
		});
	} else {
		throw new EShopError('Invalid Credentials', 403);
	}
});

module.exports = { loginUserWithEmail };
