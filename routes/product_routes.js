const express = require('express');
const router = express.Router();

const { restrictTo, protect } = require('../controllers/auth_controller');
const {
	createProduct,
	getProduct,
	getAllProducts,
} = require('../controllers/product_controller');

router.use(protect);

router.route('/').get(getAllProducts).post(createProduct);

router.route('/:id').get(getProduct);

module.exports = router;
