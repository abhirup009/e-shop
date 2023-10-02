const mongoose = require('mongoose');
const express = require('express');
const productRouter = require('./product_routes');
const {
	createProductCategory,
	getAllProductCategories,
} = require('../controllers/product_category_controller');
const { protect } = require('../controllers/auth_controller');

const router = express.Router();

router.use('/:categoryId/products', productRouter);

router
	.route('/')
	.get(protect, getAllProductCategories)
	.post(protect, createProductCategory);

module.exports = router;
