const mongoose = require('mongoose');
const BlogCategoryData = require('../data/blog_category_data');
const EShopError = require('../errors/error');

//declare the Schema for blog Model
var blogSchema = new mongoose.Schema(
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
		numViews: {
			type: Number,
			default: 0,
		},
		category: {
			type: mongoose.Schema.ObjectId,
			ref: 'Blog',
			required: true,
		},
		images: [],
		isLiked: {
			type: Boolean,
			default: false,
		},
		isDisliked: {
			type: Boolean,
			default: false,
		},
		author: {
			type: String,
			default: 'Admin',
		},
		likes: [
			{
				type: mongoose.Schema.ObjectId,
				ref: 'User',
			},
		],
		dislikes: [
			{
				type: mongoose.Schema.ObjectId,
				ref: 'User',
			},
		],
	},
	{
		timestamps: true,
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

blogSchema.pre('validate', async function (next) {
	const blogCategory = await BlogCategoryData.findById(this.category);
	if (!blogCategory) {
		return next(
			new EShopError('The entered blog category Id does not exist', 400)
		);
	}

	next();
});

module.exports = mongoose.model('Blog', blogSchema);
