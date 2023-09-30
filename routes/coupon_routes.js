const express = require('express');
const router = express.Router();

const {
	createCoupon,
	getAllCoupons,
	updateCoupon,
	deleteCoupon,
	getCoupon,
} = require('../controllers/coupon_controller');

router.post('/:code', createCoupon);
router.get('/:code', getCoupon);
router.patch('/:code', updateCoupon);
router.delete('/:code', deleteCoupon);
router.get('/', getAllCoupons);

module.exports = router;
