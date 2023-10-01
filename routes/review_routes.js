const mongoose = require('mongoose');
const express = require('express');
const { protect } = require('../controllers/auth_controller');

const reviewController = require('../controllers/review_controller');

const router = express.Router();

router.use(protect);
router
	.route('/')
	.get(reviewController.getAllReviews)
	.post(reviewController.createReview);

router.route('/:id').get(reviewController.getReview);

module.exports = router;
