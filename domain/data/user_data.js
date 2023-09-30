const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		userName: {
			type: String,
			required: true,
			unique: true,
		},
		mobile: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			lowercase: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			select: false,
		},
		role: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			required: true,
		},
		passwordChangedAt: {
			type: Date,
			required: false,
		},
		refreshToken: {
			type: String,
			required: false,
		},
	},
	{ timestamps: true }
);

UserSchema.methods.isPasswordMatching = async (
	enteredPassword,
	originalPassword
) => {
	return await bcrypt.compare(enteredPassword, originalPassword);
};

UserSchema.methods.isPasswordChangedAfter = (jwtTimestamp) => {
	if (this.passwordChangedAt) {
		const passwordChangeTime = parseInt(
			this.passwordChangedAt.getTime() / 1000,
			10
		);

		return jwtTimestamp < passwordChangeTime;
	}

	// false specifies that the password was either not changed or changed before token issue
	return false;
};

module.exports = mongoose.model('User', UserSchema);
