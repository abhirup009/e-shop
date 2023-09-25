const bcrypt = require('bcryptjs');
const Role = require('../named_entites/roles');
const Status = require('../named_entites/status');
const UserApiResponse = require('../models/user_api');
const UserData = require('../data/user_data');
const UserDomain = require('../models/user_domain');

exports.toUserDataObjectFromDomainObject = (userDomain) => {
	return new UserData({
		username: userDomain.username,
		email: userDomain.email,
		name: userDomain.name,
		password: userDomain.password,
		role: userDomain.role,
		status: userDomain.status,
	});
};

exports.toUserDomainObjectFromRequest = (req) => {
	return new UserDomain(
		null,
		req.body.username,
		req.body.email,
		req.body.name,
		bcrypt.hashSync(req.body.password, 11),
		Role.User.description,
		Status.Active.description
	);
};

exports.toUserApiObjectFromDataObject = (userData) => {
	return new UserApiResponse(
		userData.id,
		userData.username,
		userData.email,
		userData.name,
		userData.role,
		userData.status
	);
};
