const UserData = require('../domain/data/user_data');
const UserApiResponse = require('../domain/models/user_api');
const {
	toUserDataObjectFromDomainObject,
	toUserDomainObjectFromRequest,
	toUserApiObjectFromDataObject,
} = require('../domain/utils/user_utils');

const UserController = {
	async createUser(req, res, next) {
		console.log(`Attempting to insert user: ${req.body.username} to DB`);

		const user = toUserDomainObjectFromRequest(req);

		const userData = toUserDataObjectFromDomainObject(user);

		try {
			const savedUser = await userData.save();

			const userApiResponse = toUserApiObjectFromDataObject(savedUser);

			res.status(201).json({
				type: 'success',
				data: userApiResponse,
			});
		} catch (err) {
			res.status(500).json({
				type: 'error',
				message: 'Something went wrong please try again',
				err,
			});
		}
	},

	async getUsers(req, res, next) {
		try {
			const users = await UserData.find();

			const convertedUsers = users.map((user) => {
				return toUserApiObjectFromDataObject(user);
			});

			res.status(200).json({
				type: 'success',
				data: convertedUsers,
			});
		} catch (err) {
			res.status(500).json({
				type: 'error',
				message: 'Something went wrong please try again',
				err,
			});
		}
	},

	async getUser(req, res) {
		try {
			const user = await UserData.findById(req.params.id);

			const convertedUser = toUserApiObjectFromDataObject(user);

			res.status(200).json({
				type: 'success',
				data: convertedUser,
			});
		} catch (err) {
			res.status(500).json({
				type: 'error',
				message: 'Something went wrong please try again',
				err,
			});
		}
	},
};

module.exports = UserController;
