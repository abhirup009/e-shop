const mongoose = require('mongoose');
const ProductCategoryData = require('./product_category_data');
const EShopError = require('../errors/error');

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
			ref: 'ProductCategory',
			required: true,
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

ProductSchema.pre('validate', async function (next) {
	const productCategory = await ProductCategoryData.findById(this.category);
	if (!productCategory) {
		return next(
			new EShopError(
				'The entered product category ID does not exist!',
				400
			)
		);
	}
	next();
});

module.exports = mongoose.model('Product', ProductSchema);
