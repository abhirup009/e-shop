const EShopError = require('../domain/errors/error');

const errorHandler = (err, req, res, next) => {
	res.status(err.statusCode ? err.statusCode : 500).json({
		status: err.status,
		message: err.message,
		stack: err.stack ? err.stack : 'N/A',
	});
};

module.exports = { errorHandler };
