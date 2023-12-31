const CartApiResponse = require('../models/cart_api');
const { covertToApiResponseFromProductDataObject } = require('./product_utils');
const { convertToCouponApiObjectFromDataObject } = require('./coupon_utils');

exports.covertToApiResponseFromCartDataObject = (cartData) => {
	return new CartApiResponse(
		cartData.id,
		cartData.products.map((product) => {
			return {
				product: product.product,
				count: product.count,
				color: product.color,
			};
		}),
		cartData.couponApplied,
		cartData.userId
	);
};

exports.covertToExpandedApiResponseFromExpandedCartDataObject = (
	cartData,
	cartTotal
) => {
	return new CartApiResponse(
		cartData.id,
		cartData.products.map((product) => {
			return {
				...covertToApiResponseFromProductDataObject(product.product),
				count: product.count,
				selectedColor: product.color,
			};
		}),
		convertToCouponApiObjectFromDataObject(cartData.couponApplied),
		cartData.userId,
		cartTotal
	);
};
