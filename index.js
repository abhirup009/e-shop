const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

/* configure body-parser */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const { userRoute } = require('./routes');

const { BaseV1 } = require('./named_entites/base_endpoints');
console.log(`jkdjksjkd ->>>>>>>  ----- ${BaseV1}`);
app.use(`${BaseV1}/users`, userRoute);

/* connecting to the database */
const dbConfig = require('./config/database-config');

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
