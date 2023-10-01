const mongoose = require('mongoose');

var CartSchema = new mongoose.Schema(
	{
		products: [
			{
				product: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Product',
				},
				count: Number,
				color: String,
			},
		],
		couponApplied: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Coupon',
		},
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Cart', CartSchema);
