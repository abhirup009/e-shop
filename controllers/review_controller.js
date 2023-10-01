const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const ReviewData = require('../domain/data/review_data');
const {
	convertApiRequestToReviewDataObject,
	convertReviewDataObjectToApiResponse,
} = require('../domain/utils/review_utils');
const EShopError = require('../domain/errors/error');

const createReview = asyncHandler(async (req, res) => {
	try {
		const reviewData = convertApiRequestToReviewDataObject(req);

		const currentReview = await reviewData.save();
		const reviewApiResponse =
			convertReviewDataObjectToApiResponse(currentReview);

		res.status(201).json({
			status: 'success',
			data: reviewApiResponse,
		});
	} catch (err) {
		throw new EShopError('Unable to post a new review!', 500);
	}
});

const getReview = asyncHandler(async (req, res) => {
	try {
		const review = await ReviewData.findById(req.params?.id);

		const reviewApiResponse = convertReviewDataObjectToApiResponse(review);

		res.status(200).json({
			status: 'success',
			data: reviewApiResponse,
		});
	} catch (err) {
		throw new EShopError(
			`Error retrieving product for id ${req.params?.id}`,
			500
		);
	}
});

const getAllReviews = asyncHandler(async (req, res, next) => {
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

		let query = ReviewData.find(JSON.parse(queryStr));

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
			const numDocuments = await ReviewData.countDocuments();
			if (skip >= numDocuments) {
				throw new EShopError('This Page does not exist', 400);
			}
		}

		//execute query
		const reviews = await query;

		const convertedReviews = reviews.map((review) => {
			return convertReviewDataObjectToApiResponse(review);
		});

		res.status(200).json({
			status: 'success',
			data: convertedReviews,
		});
	} catch (err) {
		if (JSON.stringify(err.statusCode).startsWith('4')) {
			return next(err);
		}
		throw new EShopError('Unable to get all reviews', 500);
	}
});

module.exports = { createReview, getAllReviews, getReview };
