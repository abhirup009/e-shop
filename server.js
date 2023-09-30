const mongoose = require('mongoose');
const dotenv = require('dotenv');

const dbConfig = require('./config/database-config');
const app = require('./app');

dotenv.config({ path: './config.env' });

process.on('uncaughtException', (err) => {
	console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
	console.log(err.name, err.message);
	process.exit(1);
});

const port = process.env.PORT || 3000;

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
app.listen(port, () => {
	console.log(`Server listening on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
	console.log('UNHANDLED REJECTION! 💥 Shutting down...', err);

	server.close(() => {
		process.exit(1);
	});
});
