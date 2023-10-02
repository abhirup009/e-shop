const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');

const {
	convertToProductDataObjectFromApiRequest,
	covertToApiResponseFromProductDataObject,
} = require('../domain/utils/product_utils');
const EShopError = require('../domain/errors/error');
const Product = require('../domain/data/product_data');

const createProduct = asyncHandler(async (req, res) => {
	//intentionally removed try/catch blocks as it hides the actual point
	// where error is thrown in the error stack

	const productData = convertToProductDataObjectFromApiRequest(req);
	const savedProduct = await productData.save();
	const productApiResponse =
		covertToApiResponseFromProductDataObject(savedProduct);

	res.status(201).json({
		data: productApiResponse,
		status: 'success',
	});
});

const getProduct = asyncHandler(async (req, res) => {
	try {
		const product = await Product.findById(req.params?.id).populate(
			'reviews'
		);

		const productApiResponse =
			covertToApiResponseFromProductDataObject(product);

		res.status(200).json({
			status: 'success',
			data: productApiResponse,
		});
	} catch (err) {
		throw new EShopError(
			`Error retrieving product for id ${req.params?.id}`,
			500
		);
	}
});

const getAllProducts = asyncHandler(async (req, res, next) => {
	try {
		// checking if categoryId exists in request params and merging it with req.query params
		let filter = {};
		if (req.params.categoryId) {
			filter = req.params.categoryId;
		}

		// build query
		// Filtering
		let queryObj = { ...req.query, ...filter };
		const excludedFields = ['page', 'sort', 'fields', 'limit'];
		excludedFields.forEach((el) => delete queryObj[el]);

		//Advance Filtering
		let queryStr = JSON.stringify(queryObj);
		queryStr = queryStr.replace(
			/\b(lte|gte|lt|gt)\b/g,
			(match) => `$${match}`
		);

		let query = Product.find(JSON.parse(queryStr));

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
			const numDocuments = await Product.countDocuments();
			if (skip >= numDocuments) {
				throw new EShopError('This Page does not exist', 400);
			}
		}

		//execute query
		const products = await query;

		const convertedProducts = products.map((product) => {
			return covertToApiResponseFromProductDataObject(product);
		});

		res.status(200).json({
			status: 'success',
			data: convertedProducts,
		});
	} catch (err) {
		if (JSON.stringify(err.statusCode).startsWith('4')) {
			return next(err);
		}
		throw new EShopError('Unable to get all products', 500);
	}
});

module.exports = { createProduct, getProduct, getAllProducts };
