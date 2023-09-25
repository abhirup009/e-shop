const UserData = require('../domain/data/user_data');
const UserApiResponse = require('../domain/models/user_api');
const Role = require('../domain/named_entites/roles');
const Status = require('../domain/named_entites/status');
const bcrypt = require('bcryptjs');

const UserController = {
	/* create new user */
	async createUser(req, res, next) {
		console.log(`Attempting to insert user: ${req.body.username} to DB`);

		const newUser = new UserData({
			username: req.body.username,
			email: req.body.email,
			name: req.body.name,
			password: bcrypt.hashSync(req.body.password, 11),
			role: Role.User.description,
			status: Status.Active.description,
		});

		try {
			const user = await newUser.save();

			const userApiResponse = new UserApiResponse(
				user.username,
				user.email,
				user.name,
				user.role,
				user.status
			);

			res.status(201).json({
				type: 'success',
				message: 'User has been created successfuly',
				user: userApiResponse,
			});
		} catch (err) {
			res.status(500).json({
				type: 'error',
				message: 'Something went wrong please try again',
				err,
			});
		}
	},

	/* get all users */
	async getUsers(req, res, next) {
		try {
			const users = await UserData.find();

			const convertedUserApiResponse = users.map((user) => {
				return new UserApiResponse(
					user.username,
					user.email,
					user.name,
					user.role,
					user.status
				);
			});

			res.status(200).json({
				type: 'success',
				users: convertedUserApiResponse,
			});
		} catch (err) {
			res.status(500).json({
				type: 'error',
				message: 'Something went wrong please try again',
				err,
			});
		}
	},

	/* get single user */
	async getUser(req, res) {
		try {
			const user = await UserData.findById(req.params.id);
			const { password, ...data } = user._doc;
			res.status(200).json({
				type: 'success',
				data,
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
