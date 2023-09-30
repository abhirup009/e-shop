const mongoose = require('mongoose');

var CouponSchema = new mongoose.Schema({
	code: {
		type: String,
		required: true,
		unique: true,
		uppercase: true,
	},
	name: {
		type: String,
		required: true,
	},
	expiry: {
		type: Date,
		required: true,
	},
	discount: {
		type: Number,
		required: true,
	},
	minimumAmountApplicability: {
		type: Number,
		required: true,
	},
	applicableOn: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model('Coupon', CouponSchema);
