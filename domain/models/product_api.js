class ProductApiResponse {
	constructor(
		_id,
		title,
		slug,
		description,
		price,
		category,
		brand,
		quantity,
		color,
		images
	) {
		this._id = _id;
		this.title = title;
		this.slug = slug;
		this.description = description;
		this.price = price;
		this.category = category;
		this.brand = brand;
		this.quantity = quantity;
		this.color = color;
		this.images = images;
	}
}

module.exports = ProductApiResponse;
