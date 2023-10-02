const express = require('express');
const router = express.Router({ mergeParams: true });

const { restrictTo, protect } = require('../controllers/auth_controller');
const {
	createProduct,
	getProduct,
	getAllProducts,
	updateProduct,
	deleteProduct,
} = require('../controllers/product_controller');

router.route('/').get(getAllProducts).post(protect, createProduct);

router.use(protect);
router.route('/:id').get(getProduct).patch(updateProduct).delete(deleteProduct);

module.exports = router;
