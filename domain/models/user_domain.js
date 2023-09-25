const UserData = require('../data/user_data');

class UserDomain {
	constructor(id, username, email, name, password, role, status) {
		this.id = id ? id : '';
		this.username = username;
		this.email = email;
		this.name = name;
		this.password = password;
		this.role = role;
		this.status = status;
	}

	toDomainObjectFromDataObject(userData) {
		return UserDomain(
			userData.username,
			userData.email,
			userData.name,
			userData.role,
			userData.status
		);
	}

	toDataObjectFromDomainObject() {
		return UserData({
			username: this.username,
			email: this.email,
			name: this.name,
			password: this.password,
			role: this.role,
			status: this.status,
		});
	}
}

module.exports = UserDomain;
