const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
	{
		username: {
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
		name: {
			type: String,
			required: true,
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
		passwordChangedAt: Date,
		createdAt: Date,
		updatedAt: Date,
	},
	{ timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
