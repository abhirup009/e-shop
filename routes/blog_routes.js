const mongoose = require('mongoose');
const express = require('express');
const {
	createBlog,
	likeTheBlog,
	disLikeTheBlog,
	getBlog,
	updateBlog,
	getAllBlogs,
	deleteBlog,
} = require('../controllers/blog_controller');
const { protect } = require('../controllers/auth_controller');

const router = express.Router({ mergeParams: true });

router.use(protect);
router.route('/').post(createBlog).get(getAllBlogs);

router.route('/:id').get(getBlog).patch(updateBlog).delete(deleteBlog);

router.route('/:id/likes').post(likeTheBlog);
router.route('/:id/dislikes').post(disLikeTheBlog);

module.exports = router;
