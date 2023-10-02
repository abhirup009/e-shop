const mongoose = require('mongoose');
const EShopError = require('../../errors/error');

const validateMongoDbId = (id) => {
	const isValidId = mongoose.Types.ObjectId.isValid(id);

	if (!isValidId) {
		throw new EShopError('The input id is not valid or not found ', 400);
	}
};

module.exports = { validateMongoDbId };
