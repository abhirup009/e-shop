const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const EShopError = require('../domain/errors/error');
const CartData = require('../domain/data/cart_data');
const ProductData = require('../domain/data/product_data');
const {
	covertToApiResponseFromCartDataObject,
	covertToExpandedApiResponseFromExpandedCartDataObject,
} = require('../domain/utils/cart_utils');

const createOrRefreshCart = asyncHandler(async (req, res, next) => {
	const cart = req.body;

	try {
		let products = [];
		const user = req.user;

		const alreadyExistingCart = await CartData.findOne({
			userId: user.id,
		});

		if (alreadyExistingCart) {
			alreadyExistingCart.remove();
		}

		cart.products.map(async (product) => {
			products.push({
				product: product.id,
				count: product.count,
				color: product.color,
			});
		});

		const newCart = await new CartData({
			products,
			couponApplied: cart.couponApplied,
			userId: user._id,
		}).save();

		const cartApiResponse = covertToApiResponseFromCartDataObject(newCart);

		res.json({ data: cartApiResponse });
	} catch (error) {
		throw new EShopError('Unable to create Cart', 400);
	}
});

const getCart = asyncHandler(async (req, res) => {
	try {
		const cart = await CartData.findOne({ userId: req.user.id })
			.populate('products.product')
			.populate('couponApplied');

		let cartTotal = 0;
		cart.products.map((product) => {
			cartTotal = cartTotal + product.product.price * product.count;
		});

		const cartApiResponse =
			covertToExpandedApiResponseFromExpandedCartDataObject(
				cart,
				cartTotal
			);

		res.json({ data: cartApiResponse });
	} catch (error) {
		throw new EShopError('Unable to get Cart', 400);
	}
});

const deleteCart = asyncHandler(async (req, res) => {
	try {
		const cart = await CartData.findOneAndRemove({ userId: req.user.id });
		const deletedCartApiResponse =
			covertToApiResponseFromCartDataObject(cart);
		res.json({ data: deletedCartApiResponse });
	} catch (error) {
		throw new EShopError('Unable to delete Cart', 400);
	}
});

module.exports = {
	createOrRefreshCart,
	getCart,
	deleteCart,
};
