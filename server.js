const mongoose = require('mongoose');

const dbConfig = require('./config/database-config');
const app = require('./app');

const port = 3000;

process.on('uncaughtException', (err) => {
	console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
	console.log(err.name, err.message);
	process.exit(1);
});

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
