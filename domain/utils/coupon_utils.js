const CouponData = require('../data/coupon_data');
const CouponApiResponse = require('../models/coupon_api');

exports.convertToCouponDataObjectFromApiRequest = (req) => {
	return new CouponData({
		code: req.code,
		name: req.name,
		expiry: new Date(req.expiry),
		discount: req.discount,
		minimumAmountApplicability: req.minimumAmountApplicability,
		applicableOn: req.applicableOn,
		description: req.description,
	});
};

exports.convertToCouponApiObjectFromDataObject = (couponData) => {
	return new CouponApiResponse(
		couponData._id,
		couponData.code,
		couponData.name,
		couponData.expiry,
		couponData.discount,
		couponData.minimumAmountApplicability,
		couponData.applicableOn,
		couponData.description
	);
};
