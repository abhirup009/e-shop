const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const UserData = require('../domain/data/user_data');
const EShopError = require('../domain/errors/error');

const createOrder = asyncHandler(async (req, res) => {
	const { COD, couponApplied } = req.body;
	const { _id } = req.user;
	validateMongoDbId(_id);
	try {
		if (!COD) throw new Error('Create cash order failed');
		const user = await User.findById(_id);
		let userCart = await Cart.findOne({ orderby: user._id });
		let finalAmout = 0;
		if (couponApplied && userCart.totalAfterDiscount) {
			finalAmout = userCart.totalAfterDiscount;
		} else {
			finalAmout = userCart.cartTotal;
		}

		let newOrder = await new Order({
			products: userCart.products,
			paymentIntent: {
				id: uniqid(),
				method: 'COD',
				amount: finalAmout,
				status: 'Cash on Delivery',
				created: Date.now(),
				currency: 'usd',
			},
			orderby: user._id,
			orderStatus: 'Cash on Delivery',
		}).save();
		let update = userCart.products.map((item) => {
			return {
				updateOne: {
					filter: { _id: item.product._id },
					update: {
						$inc: { quantity: -item.count, sold: +item.count },
					},
				},
			};
		});
		const updated = await Product.bulkWrite(update, {});
		res.json({ message: 'success' });
	} catch (error) {
		throw new Error(error);
	}
});
