class ReviewApiResponse {
	constructor(review, rating, postedBy, product) {
		this.review = review;
		this.rating = rating;
		this.postedBy = postedBy;
		this.product = product;
	}
}

module.exports = ReviewApiResponse;
