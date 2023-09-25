const User = require('../models/user');

const UserController = {
	/* get all users */
	async getUsers(req, res) {
		try {
			const users = await User.find();

			res.status(200).json({
				type: 'success',
				users,
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
			const user = await User.findById(req.params.id);
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
