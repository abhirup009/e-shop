const UserData = require('../domain/data/user_data');
const EShopError = require('../domain/errors/error');
const UserApiResponse = require('../domain/models/user_api');
const {
	toUserDataObjectFromDomainObject,
	toUserDomainObjectFromRequest,
	toUserApiObjectFromDataObject,
} = require('../domain/utils/user_utils');
const asyncHandler = require('express-async-handler');

const createUser = asyncHandler(async (req, res, next) => {
	console.log(`Attempting to insert user: ${req.body.username} to DB`);

	const user = toUserDomainObjectFromRequest(req);

	const userData = toUserDataObjectFromDomainObject(user);

	try {
		const savedUser = await userData.save();

		const userApiResponse = toUserApiObjectFromDataObject(savedUser);

		res.json({
			data: userApiResponse,
		});
	} catch (err) {
		throw new EShopError('Unable to create User.', 401);
	}
});

const getUsers = asyncHandler(async (req, res, next) => {
	try {
		const users = await UserData.find();

		const convertedUsers = users.map((user) => {
			return toUserApiObjectFromDataObject(user);
		});

		res.json({
			data: convertedUsers,
		});
	} catch (err) {
		throw new EShopError('Unable to get Users.', 401);
	}
});

const getUser = asyncHandler(async (req, res) => {
	try {
		const user = await UserData.findById(req.params.id);

		const convertedUser = toUserApiObjectFromDataObject(user);

		res.json({
			data: convertedUser,
		});
	} catch (err) {
		throw new EShopError('Unable to get User.', 401);
	}
});

module.exports = { createUser, getUsers, getUser };
