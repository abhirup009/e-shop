class CartApiResponse {
	constructor(id, products, couponApplied, userId) {
		this.id = id;
		this.products = products;
		this.couponApplied = couponApplied;
		this.userId = userId;
	}
}

module.exports = CartApiResponse;
