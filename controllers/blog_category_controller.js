const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const BlogCategoryData = require('../domain/data/blog_category_data');

const createBlogCategory = asyncHandler(async (req, res, next) => {
	const savedBlogCategory = await BlogCategoryData.create(req.body);

	res.status(201).json({
		data: savedBlogCategory,
		status: 'success',
	});
});

const deleteBlogCategory = asyncHandler(async (req, res, next) => {
	const { id } = req.params;
	validateMongoDbId(id);

	await BlogCategoryData.findByIdAndDelete(id);

	res.status(204).json({
		status: 'success',
		data: null,
	});
});

const getAllBlogCategories = async (req, res, next) => {
	const blogCategories = await BlogCategoryData.find();

	res.status(200).json({
		status: 'success',
		data: blogCategories,
	});
};

const updateBlogCategory = asyncHandler(async (req, res, next) => {
	const { id } = req.params;
	validateMongoDbId(id);

	const blogCategory = await BlogCategoryData.findByIdAndUpdate(
		id,
		req.body,
		{
			new: true,
			runValidators: true,
		}
	);

	res.status(200).json({
		status: 'succes',
		data: blogCategory,
	});
});

module.exports = {
	createBlogCategory,
	deleteBlogCategory,
	getAllBlogCategories,
	updateBlogCategory,
};
