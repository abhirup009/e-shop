class EShopError extends Error {
	constructor(message, statusCode) {
		super(message);

		this.statusCode = statusCode;
		this.status = 'error';

		Error.captureStackTrace(this, this.constructor);
	}
}

module.exports = EShopError;
