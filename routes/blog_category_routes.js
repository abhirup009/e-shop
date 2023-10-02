const mongoose = require('mongoose');
const express = require('express');
const {
	createBlogCategory,
	deleteBlogCategory,
	updateBlogCategory,
	getAllBlogCategories,
} = require('../controllers/blog_category_controller');
const blogRoutes = require('./blog_routes');

const { protect } = require('../controllers/auth_controller');

const router = express.Router();

router.use('/:categoryId/blogs', blogRoutes);

router.route('/').get(getAllBlogCategories).post(protect, createBlogCategory);

router
	.route('/:id')
	.patch(protect, updateBlogCategory)
	.delete(protect, deleteBlogCategory);

module.exports = router;
