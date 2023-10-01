const ProductData = require('../data/product_data');
const slugify = require('slugify');
const ProductApiResponse = require('../models/product_api');

exports.convertToProductDataObjectFromApiRequest = (req) => {
	return new ProductData({
		title: req.body?.title,
		slug: slugify(req.body?.title),
		description: req.body?.description,
		price: req.body?.price,
		category: req.body?.category,
		brand: req.body?.brand,
		quantity: req.body?.quantity,
		color: req.body?.color,
	});
};

exports.covertToApiResponseFromProductDataObject = (productData) => {
	return new ProductApiResponse(
		productData._id,
		productData.title,
		productData.slug,
		productData.description,
		productData.price,
		productData.category,
		productData.brand,
		productData.quantity,
		productData.color,
		productData.images
	);
};
