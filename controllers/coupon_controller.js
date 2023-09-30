const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const EShopError = require('../domain/errors/error');
const {
	convertToCouponDataObjectFromApiRequest,
	convertToCouponApiObjectFromDataObject,
} = require('../domain/utils/coupon_utils');
const CouponData = require('../domain/data/coupon_data');

const createCoupon = asyncHandler(async (req, res, next) => {
	const { code } = req.params;
	req.body.code = code;

	try {
		const couponData = convertToCouponDataObjectFromApiRequest(req.body);
		const savedCoupon = await couponData.save();
		const couponApiResponse =
			convertToCouponDataObjectFromApiRequest(savedCoupon);

		res.json({ coupon: couponApiResponse });
	} catch (error) {
		throw new EShopError('Unable to create coupon: ', 400);
	}
});

const getAllCoupons = asyncHandler(async (req, res) => {
	try {
		const couponsData = await CouponData.find();
		const couponsApiResponse = couponsData.map((couponData) => {
			return convertToCouponApiObjectFromDataObject(couponData);
		});
		res.json({ data: couponsApiResponse });
	} catch (error) {
		throw new EShopError('Unable to find coupons', 400);
	}
});

const updateCoupon = asyncHandler(async (req, res) => {
	const { code } = req.params;

	try {
		const updatedCoupon = await CouponData.findOneAndUpdate(
			{ code },
			req.body,
			{ new: true }
		);

		res.json({ data: updatedCoupon });
	} catch (error) {
		throw new EShopError('Unable to update coupon', 400);
	}
});

const deleteCoupon = asyncHandler(async (req, res) => {
	const { code } = req.params;

	try {
		const deletedCoupon = await CouponData.findOneAndDelete({ code });

		res.json(deletedCoupon);
	} catch (error) {
		throw new EShopError('Unable to delete coupon', 400);
	}
});

const getCoupon = asyncHandler(async (req, res) => {
	const { code } = req.params;

	try {
		const coupon = await CouponData.findOne({ code });
		res.json({ data: coupon });
	} catch (error) {
		throw new EShopError('Unable to find coupon.', 400);
	}
});

module.exports = {
	createCoupon,
	getAllCoupons,
	updateCoupon,
	deleteCoupon,
	getCoupon,
};
