const mongoose = require('mongoose');
const ProductCategoryData = require('./product_category_data');
const BrandData = require('./brand_data');
const ColorData = require('./color_data');
const EShopError = require('../errors/error');

//Declare the Schema of the Product Model
var productSchema = new mongoose.Schema(
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
			type: mongoose.Schema.ObjectId,
			ref: 'Brand',
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
		color: [
			{
				type: mongoose.Schema.ObjectId,
				ref: 'Color',
			},
		],
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

productSchema.virtual('reviews', {
	ref: 'Review',
	foreignField: 'product',
	localField: '_id',
});

productSchema.pre('validate', async function (next) {
	const productCategory = await ProductCategoryData.findById(this.category);
	const brand = await BrandData.findById(this.brand);

	if (!productCategory) {
		return next(
			new EShopError(
				'The entered product category ID does not exist!',
				400
			)
		);
	}
	if (!brand) {
		return next(
			new EShopError('The entered brand ID does not exist!', 400)
		);
	}

	if (this.color) {
		await Promise.all(
			this.color.map(async (col) => {
				const doc = await ColorData.findById(col);
				if (!doc) {
					return next(
						new EShopError(
							`The entered color Id ${col} does not exist!`,
							400
						)
					);
				}
			})
		);
	}
	next();
});

module.exports = mongoose.model('Product', productSchema);
