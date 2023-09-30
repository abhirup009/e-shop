const bcrypt = require('bcryptjs');
const Role = require('../named_entites/roles');
const Status = require('../named_entites/status');
const UserApiResponse = require('../models/user_api');
const UserData = require('../data/user_data');

exports.convertToUserDataObjectFromApiRequest = (req) => {
	return new UserData({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		userName: req.body.userName,
		mobile: req.body.mobile,
		email: req.body.email,
		password: bcrypt.hashSync(req.body.password, 11),
		role: Role.User.description,
		status: Status.Active.description,
	});
};

exports.convertToUserApiObjectFromDataObject = (userData) => {
	return new UserApiResponse(
		userData.id,
		userData.firstName,
		userData.lastName,
		userData.userName,
		userData.mobile,
		userData.email,
		userData.name,
		userData.role,
		userData.status
	);
};
