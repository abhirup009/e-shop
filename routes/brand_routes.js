const mongoose = require('mongoose');
const express = require('express');
const { protect } = require('../controllers/auth_controller');
const {
	getAllBrands,
	deleteBrand,
	updateBrand,
	createBrand,
} = require('../controllers/brand_controller');

const router = express.Router();

router.route('/').get(getAllBrands).post(protect, createBrand);

router.route('/:id').patch(protect, updateBrand).delete(protect, deleteBrand);

module.exports = router;
