const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const dotenv = require('dotenv').config();
const userRoutes = require('./routes/user_routes');
const authRoutes = require('./routes/auth_routes');
const couponRoutes = require('./routes/coupon_routes');
const { BaseV1 } = require('./domain/named_entites/base_endpoints');
const { errorHandler } = require('./handlers/error_handler');
const morgan = require('morgan');

/* configure body-parser */
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(`${BaseV1}/users/`, userRoutes);
app.use(`${BaseV1}/auth/`, authRoutes);
app.use(`${BaseV1}/coupons/`, couponRoutes);
app.use(errorHandler);

module.exports = app;
