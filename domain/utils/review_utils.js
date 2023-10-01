const ReviewData = require('../data/review_data');
const ReviewApiResponse = require('../models/review_api');

exports.convertApiRequestToReviewDataObject = (req) => {
	return new ReviewData({
		review: req.body.review,
		rating: req.body.rating,
		postedBy: req.body.postedBy,
		product: req.body.product,
	});
};

exports.convertReviewDataObjectToApiResponse = (reviewData) => {
	return new ReviewApiResponse(
		reviewData.review,
		reviewData.rating,
		reviewData.postedBy,
		reviewData.product
	);
};
