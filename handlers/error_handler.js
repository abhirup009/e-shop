const EShopError = require('../domain/errors/error');

const errorHandler = (err, req, res, next) => {
	// if (err instanceof EShopError) {
	// 	res.status(err.statusCode).json({
	// 		status: 'error',
	// 		message: err.message,
	// 	});
	// }

	res.status(err.statusCode).json({
		status: err.status,
		message: err.message,
		stack: err.stack ? err.stack : 'N/A',
	});
};

module.exports = { errorHandler };
