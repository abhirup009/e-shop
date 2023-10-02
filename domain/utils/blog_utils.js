const mongoose = require('mongoose');
const slugify = require('slugify');
const BlogData = require('../data/blog_data');
const BlogApiResponse = require('../models/blog_api');

exports.convertApiRequestToBlogDataObject = (req) => {
	return new BlogData({
		title: req.body.title,
		slug: slugify(req.body.title),
		description: req.body.description,
		category: req.body.category,
		images: req.body.images,
		author: req.body.author,
	});
};

exports.convertBlogDataObjectToAPiResponse = (blogData) => {
	return new BlogApiResponse(
		blogData.title,
		blogData.description,
		blogData.category,
		blogData.numViews,
		blogData.author,
		blogData.images,
		blogData.isLiked,
		blogData.isDisliked
	);
};
