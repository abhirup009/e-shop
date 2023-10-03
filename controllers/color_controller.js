const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const ColorData = require('../domain/data/color_data');
const {
	validateMongoDbId,
} = require('../domain/utils/helpers/validate_mongodb_id');

const createColor = asyncHandler(async (req, res, next) => {
	const color = await ColorData.create(req.body);

	res.status(201).json({
		data: color,
		status: 'success',
	});
});

const deleteColor = asyncHandler(async (req, res, next) => {
	const { id } = req.params;
	validateMongoDbId(id);

	await ColorData.findByIdAndDelete(id);

	res.status(204).json({
		status: 'success',
		data: null,
	});
});

const getAllColors = async (req, res, next) => {
	const colors = await ColorData.find();

	res.status(200).json({
		status: 'success',
		data: colors,
	});
};

const updateColor = asyncHandler(async (req, res, next) => {
	const { id } = req.params;
	validateMongoDbId(id);

	const color = await ColorData.findByIdAndUpdate(id, req.body, {
		new: true,
		runValidators: true,
	});

	res.status(200).json({
		status: 'succes',
		data: color,
	});
});

module.exports = {
	createColor,
	updateColor,
	getAllColors,
	deleteColor,
};
