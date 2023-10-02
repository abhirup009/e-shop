const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const BrandData = require('../domain/data/brand_data');
const {
	validateMongoDbId,
} = require('../domain/utils/helpers/validate_mongodb_id');

const createBrand = asyncHandler(async (req, res, next) => {
	const brand = await BrandData.create(req.body);

	res.status(201).json({
		data: brand,
		status: 'success',
	});
});

const deleteBrand = asyncHandler(async (req, res, next) => {
	const { id } = req.params;
	validateMongoDbId(id);

	await BrandData.findByIdAndDelete(id);

	res.status(204).json({
		status: 'success',
		data: null,
	});
});

const updateBrand = asyncHandler(async (req, res, next) => {
	const { id } = req.params;
	validateMongoDbId(id);

	const brand = await BrandData.findByIdAndUpdate(id, req.body, {
		new: true,
		runValidators: true,
	});

	res.status(200).json({
		status: 'succes',
		data: brand,
	});
});

const getAllBrands = async (req, res, next) => {
	const brands = await BrandData.find();

	res.status(200).json({
		status: 'success',
		data: brands,
	});
};

module.exports = { createBrand, deleteBrand, updateBrand, getAllBrands };
