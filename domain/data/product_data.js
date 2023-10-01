const mongoose = require('mongoose');

//Declare the Schema of the Product Model
var ProductSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
		},
		slug: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
		},
		description: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		category: {
			type: mongoose.Schema.ObjectId,
			ref: 'PCategory',
		},
		brand: {
			type: String,
			required: true,
		},
		quantity: {
			type: Number,
			required: true,
		},
		sold: {
			type: Number,
			default: 0,
		},
		images: [
			{
				public_id: String,
				url: String,
			},
		],
		color: [],
		tags: String,
		numRatings: {
			type: Number,
			default: 0,
		},
	},
	{
		timestamps: true,
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

ProductSchema.virtual('reviews', {
	ref: 'Review',
	foreignField: 'product',
	localField: '_id',
});

module.exports = mongoose.model('Product', ProductSchema);
