const mongoose = require('mongoose');
const express = require('express');
const productRouter = require('./product_routes');
const { createProduct } = require('../controllers/product_category_controller');
const { protect } = require('../controllers/auth_controller');

const router = express.Router();

router.use('/:categoryId/products', productRouter);

router.route('/').post(protect, createProduct);

module.exports = router;
