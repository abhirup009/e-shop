class UserApiResponse {
	constructor(id, username, email, name, role, status) {
		this.id = id;
		this.username = username;
		this.email = email;
		this.name = name;
		this.role = role;
		this.status = status;
	}
}

module.exports = UserApiResponse;