const mongoose = require('mongoose');
const express = require('express');
const { protect } = require('../controllers/auth_controller');
const {
	getAllColors,
	updateColor,
	deleteColor,
	createColor,
} = require('../controllers/color_controller');

const router = express.Router();

router.use(protect);
router.route('/').get(getAllColors).post(createColor);
router.route('/:id').patch(updateColor).delete(deleteColor);

module.exports = router;
