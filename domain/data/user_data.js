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

module.exports = mongoose.model('User', UserSchema);
