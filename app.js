const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const dotenv = require('dotenv').config();
const userRoutes = require('./routes/user_routes');
const authRoutes = require('./routes/auth_routes');
const couponRoutes = require('./routes/coupon_routes');
const productRoutes = require('./routes/product_routes');
const reviewRoutes = require('./routes/review_routes');
const productCategoryRoutes = require('./routes/product_category_routes');
const cartRoutes = require('./routes/cart_routes');
const blogRoutes = require('./routes/blog_routes');
const blogCategoryRoutes = require('./routes/blog_category_routes');
const brandRoutes = require('./routes/brand_routes');
const colorRoutes = require('./routes/color_routes');
const { BaseV1 } = require('./domain/named_entites/base_endpoints');
const { errorHandler } = require('./handlers/error_handler');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

/* configure body-parser */
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(`${BaseV1}/users/`, userRoutes);
app.use(`${BaseV1}/auth/`, authRoutes);
app.use(`${BaseV1}/coupons/`, couponRoutes);
app.use(`${BaseV1}/products/`, productRoutes);
app.use(`${BaseV1}/reviews/`, reviewRoutes);
app.use(`${BaseV1}/product-categories/`, productCategoryRoutes);
app.use(`${BaseV1}/carts/`, cartRoutes);
app.use(`${BaseV1}/blogs/`, blogRoutes);
app.use(`${BaseV1}/blog-categories/`, blogCategoryRoutes);
app.use(`${BaseV1}/brands/`, brandRoutes);
app.use(`${BaseV1}/colors/`, colorRoutes);
app.use(errorHandler);

module.exports = app;
