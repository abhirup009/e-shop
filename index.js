const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const dotenv = require('dotenv').config();
const userRoutes = require('./routes/user_routes');
const authRoutes = require('./routes/auth_routes');
const { BaseV1 } = require('./domain/named_entites/base_endpoints');
const dbConfig = require('./config/database-config');
const { errorHandler } = require('./handlers/error_handler');
const morgan = require('morgan');

/* configure body-parser */
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(`${BaseV1}/users/`, userRoutes);
app.use(`${BaseV1}/auth/`, authRoutes);
app.use(errorHandler);

mongoose
	.connect(dbConfig.url, {
		useNewUrlParser: true,
	})
	.then(() => {
		console.log('Successfully connected to the database!!');
	})
	.catch((err) => {
		console.log('Could not connect to the database. Exiting now...\n', err);
		process.exit();
	});

/* listen for requests */
app.listen(3000, () => {
	console.log('Server is listening on port 3000');
});

process.on('unhandledRejection', (err) => {
	console.log('UNHANDLED REJECTION! 💥 Shutting down...', err);

	server.close(() => {
		process.exit(1);
	});
});
