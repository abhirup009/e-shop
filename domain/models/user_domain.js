const UserData = require('../data/user_data');

class UserDomain {
	constructor(
		id,
		firstName,
		lastName,
		userName,
		mobile,
		email,
		password,
		role,
		status
	) {
		this.id = id ? id : '';
		this.firstName = firstName;
		this.lastName = lastName;
		this.userName = userName;
		this.mobile = mobile;
		this.email = email;
		this.password = password;
		this.role = role;
		this.status = status;
	}
}

module.exports = UserDomain;
