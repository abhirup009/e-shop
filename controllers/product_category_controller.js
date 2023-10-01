const mongoose = require('mongoose');
const ProductCategoryData = require('../domain/data/product_category_data');
const asyncHandler = require('express-async-handler');

const createProduct = asyncHandler(async (req, res, next) => {
	try {
		const savedProduct = await ProductCategoryData.create(req.body);

		res.status(201).json({
			data: savedProduct,
			status: 'success',
		});
	} catch (err) {
		throw new EShopError('Unable to create Product Category', 400);
	}
});

module.exports = { createProduct };
