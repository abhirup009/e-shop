const express = require('express');
const router = express.Router();
const {
	createOrRefreshCart,
	getCart,
	deleteCart,
} = require('../controllers/cart_controller');
const { protect } = require('../controllers/auth_controller');

router.post('/', protect, createOrRefreshCart);
router.get('/', protect, getCart);
router.delete('/', protect, deleteCart);

module.exports = router;
