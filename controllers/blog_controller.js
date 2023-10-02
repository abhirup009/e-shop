const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const BlogData = require('../domain/data/blog_data');
const {
	validateMongoDbId,
} = require('../domain/utils/helpers/validate_mongodb_id');
const {
	convertApiRequestToBlogDataObject,
	convertBlogDataObjectToAPiResponse,
} = require('../domain/utils/blog_utils');

const createBlog = asyncHandler(async (req, res, next) => {
	//intentionally removed try/catch blocks as it hides the actual point
	// where error is thrown in the error stack
	const blogData = convertApiRequestToBlogDataObject(req);
	const currBlog = await blogData.save();
	const apiResponse = convertBlogDataObjectToAPiResponse(currBlog);

	res.status(201).json({
		status: 'success',
		data: apiResponse,
	});
});

const deleteBlog = asyncHandler(async (req, res, next) => {
	const id = req.params;
	validateMongoDbId(id);

	await BlogData.findByIdAndDelete(id);

	res.status(204).json({
		status: 'success',
		data: null,
	});
});

const updateBlog = asyncHandler(async (req, res, next) => {
	const { id } = req.params;
	validateMongoDbId(id);

	if (req.body.title) {
		req.body.slug = slugify(req.body.title);
	}

	const updatedBlog = await BlogData.findByIdAndUpdate(id, req.body, {
		new: true,
		runValidators: true,
	});

	res.status(200).json({
		status: 'success',
		data: updateBlog,
	});
});

const getBlog = async (req, res, next) => {
	const { id } = req.params;
	validateMongoDbId(id);

	const blog = await BlogData.findById(id)
		.populate('likes')
		.populate('dislikes');

	// update the number of views for the blog
	await BlogData.findByIdAndUpdate(
		id,
		{
			$inc: { numViews: 1 },
		},
		{
			new: true,
			runValidators: true,
		}
	);

	res.status(200).json({
		status: 'success',
		data: blog,
	});
};

const getAllBlogs = asyncHandler(async (req, res, next) => {
	//checking if categoryId field is present in req.params and merging it with req.query in case it does
	let filter = {};
	if (req.params.categoryId) {
		filter = { category: req.params.categoryId };
	}
	//Filtering
	let queryObj = { ...req.query, ...filter };
	const excludedFields = ['page', 'sort', 'fields', 'limit'];
	excludedFields.forEach((el) => delete queryObj[el]);

	//Advance Filtering
	let queryStr = JSON.stringify(queryObj);
	queryStr = queryStr.replace(/\b(lte|gte\gt\lt)\b/g, (match) => `$${match}`);
	let query = BlogData.find(JSON.parse(queryStr));

	//selecting specific fields
	if (req.query.fields) {
		const selectedFields = JSON.stringify(req.query.fields)
			.split(',')
			.join(' ');
		query.select(selectedFields);
	} else {
		query.select('-__v');
	}

	const blogs = await query;

	res.status(200).json({
		status: 'success',
		data: blogs,
	});
});

const likeTheBlog = asyncHandler(async (req, res, next) => {
	const { id } = req.params;
	validateMongoDbId(id);

	//find the blog doc to be liked
	const blog = await BlogData.findById(id);

	//get the current logges in user
	const loggedInUserId = req.user?._id;

	//check if the user has already liked the blog
	const alreadyLiked = blog.likes?.includes(loggedInUserId);

	//check if the user has already disliked the blog
	const alreadyDisLiked = blog.dislikes?.includes(loggedInUserId);

	if (alreadyDisLiked) {
		const updatedBlog = await BlogData.findByIdAndUpdate(
			id,
			{
				$pull: { dislikes: loggedInUserId },
			},
			{
				new: true,
				runValidators: true,
			}
		);

		//check if there are no dislikes for the blog
		if (updatedBlog.dislikes.length == 0) {
			updatedBlog.isDisliked = false;
			await updatedBlog.save();
		}

		res.status(200).json({
			status: 'success',
			data: updatedBlog,
		});
	}

	if (alreadyLiked) {
		const updatedBlog = await BlogData.findByIdAndUpdate(
			id,
			{
				$pull: { likes: loggedInUserId },
			},
			{
				new: true,
				runValidators: true,
			}
		);

		//check if there are no likes for the blog
		if (updatedBlog.likes.length == 0) {
			updatedBlog.isLiked = false;
			await updatedBlog.save();
		}

		res.status(200).json({
			status: 'success',
			data: updatedBlog,
		});
	} else {
		const updatedBlog = await BlogData.findByIdAndUpdate(
			id,
			{
				$push: { likes: loggedInUserId },
				isLiked: true,
			},
			{
				new: true,
				loggedInUserId: true,
			}
		);

		await updatedBlog.save();

		res.status(200).json({
			status: 'success',
			data: updatedBlog,
		});
	}
});

const disLikeTheBlog = asyncHandler(async (req, res, next) => {
	const { id } = req.params;
	validateMongoDbId(id);

	//find the blog doc to be disliked
	const blog = await BlogData.findById(id, { id: 0 });

	//get the current logges in user
	const loggedInUserId = req.user?._id;

	//check if the user has already liked the blog
	const alreadyLiked = blog.likes?.includes(loggedInUserId);

	//check if the user has already disliked the blog
	const alreadyDisLiked = blog.dislikes?.includes(loggedInUserId);

	if (alreadyLiked) {
		const updatedBlog = await BlogData.findByIdAndUpdate(
			id,
			{
				$pull: { likes: loggedInUserId },
			},
			{
				new: true,
				runValidators: true,
			}
		);

		//check if there are no likes for the blog
		if (updatedBlog.likes.length == 0) {
			updatedBlog.isLiked = false;
			await updatedBlog.save();
		}

		res.status(200).json({
			status: 'success',
			data: updatedBlog,
		});
	}

	if (alreadyDisLiked) {
		const updatedBlog = await BlogData.findByIdAndUpdate(
			id,
			{
				$pull: { dislikes: loggedInUserId },
			},
			{
				new: true,
				runValidators: true,
			}
		);

		//check if there are no dislikes for the blog
		if (updatedBlog.dislikes.length == 0) {
			updatedBlog.isDisliked = false;
			await updatedBlog.save();
		}

		res.status(200).json({
			status: 'success',
			data: updatedBlog,
		});
	} else {
		const updatedBlog = await BlogData.findByIdAndUpdate(
			id,
			{
				$push: { dislikes: loggedInUserId },
				isDisliked: true,
			},
			{
				new: true,
				loggedInUserId: true,
			}
		);

		await updatedBlog.save();

		res.status(200).json({
			status: 'success',
			data: updatedBlog,
		});
	}
});

module.exports = {
	createBlog,
	likeTheBlog,
	disLikeTheBlog,
	updateBlog,
	getBlog,
	getAllBlogs,
	deleteBlog,
};
