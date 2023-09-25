class UserApiResponse {
	constructor(username, email, name, role, status) {
		this.username = username;
		this.email = email;
		this.name = name;
		this.role = role;
		this.status = status;
	}
}

module.exports = UserApiResponse;
