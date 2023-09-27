const bcrypt = require('bcryptjs');
const Role = require('../named_entites/roles');
const Status = require('../named_entites/status');
const UserApiResponse = require('../models/user_api');
const UserData = require('../data/user_data');
const UserDomain = require('../models/user_domain');

exports.convertToUserDataObjectFromDomainObject = (userDomain) => {
	return new UserData({
		firstName: userDomain.firstName,
		lastName: userDomain.lastName,
		userName: userDomain.userName,
		mobile: userDomain.mobile,
		email: userDomain.email,
		password: userDomain.password,
		role: userDomain.role,
		status: userDomain.status,
	});
};

exports.convertToUserDomainObjectFromRequest = (req) => {
	return new UserDomain(
		null,
		req.body.firstName,
		req.body.lastName,
		req.body.userName,
		req.body.mobile,
		req.body.email,
		bcrypt.hashSync(req.body.password, 11),
		Role.User.description,
		Status.Active.description
	);
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
