class CartApiResponse {
	constructor(id, products, couponApplied, userId, cartTotal) {
		this.id = id;
		this.products = products;
		this.couponApplied = couponApplied;
		this.userId = userId;
		this.cartTotal = cartTotal;
	}
}

module.exports = CartApiResponse;
