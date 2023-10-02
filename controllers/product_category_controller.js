const mongoose = require('mongoose');
const ProductCategoryData = require('../domain/data/product_category_data');
const asyncHandler = require('express-async-handler');
const EShopError = require('../domain/errors/error');
const {
	validateMongoDbId,
} = require('../domain/utils/helpers/validate_mongodb_id');

const createProductCategory = asyncHandler(async (req, res, next) => {
	try {
		const savedProductCategory = await ProductCategoryData.create(req.body);

		res.status(201).json({
			data: savedProductCategory,
			status: 'success',
		});
	} catch (err) {
		throw new EShopError(err.message, err.statusCode);
	}
});

const getAllProductCategories = asyncHandler(async (req, res, next) => {
	try {
		// build query
		// Filtering
		let queryObj = { ...req.query };
		const excludedFields = ['page', 'sort', 'fields', 'limit'];
		excludedFields.forEach((el) => delete queryObj[el]);

		//Advance Filtering
		let queryStr = JSON.stringify(queryObj);
		queryStr = queryStr.replace(
			/\b(lte|gte|lt|gt)\b/g,
			(match) => `$${match}`
		);

		let query = ProductCategoryData.find(JSON.parse(queryStr));

		//Sorting
		if (req.query.sort) {
			const sortBy = req.query.sort.split(',').join(' ');
			query = query.sort(sortBy);
		} else {
			query = query.sort('-createdAt');
		}

		// fields limiting
		if (req.query.fields) {
			const fields = req.query.fields.split(',').join(' ');
			query = query.select(fields);
		} else {
			query = query.select('-__v');
		}

		//pagination
		const page = req.query.page * 1 || 1;
		const limit = req.query.limit * 1 || 100;
		const skip = (page - 1) * limit;

		query = query.skip(skip).limit(limit);
		if (req.query.page) {
			const numDocuments = await ProductCategoryData.countDocuments();
			if (skip >= numDocuments) {
				throw new EShopError('This Page does not exist', 400);
			}
		}

		//execute query
		const categories = await query;

		res.status(200).json({
			status: 'success',
			data: categories,
		});
	} catch (err) {
		if (JSON.stringify(err.statusCode).startsWith('4')) {
			return next(err);
		}
		throw new EShopError('Unable to get all reviews', 500);
	}
});

const updateProductCategory = asyncHandler(async (req, res, next) => {
	const id = req.params;
	validateMongoDbId(id);

	const updatedProductCategoryDoc =
		await ProductCategoryData.findByIdAndUpdate(id, req.body, {
			new: true,
			runValidators: true,
		});

	res.status(200).json({
		status: 'success',
		data: updatedProductCategoryDoc,
	});
});

const deleteProductCategory = asyncHandler(async (req, res, next) => {
	const id = req.params;
	validateMongoDbId(id);

	await ProductCategoryData.findByIdAndDelete(id);

	res.status(204).json({
		status: 'success',
		data: null,
	});
});

module.exports = {
	createProductCategory,
	getAllProductCategories,
	updateProductCategory,
	deleteProductCategory,
};
