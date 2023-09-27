class UserApiResponse {
	constructor(
		id,
		firstName,
		lastName,
		userName,
		mobile,
		email,
		role,
		status
	) {
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.userName = userName;
		this.mobile = mobile;
		this.email = email;
		this.role = role;
		this.status = status;
	}
}

module.exports = UserApiResponse;
