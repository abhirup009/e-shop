const mongoose = require('mongoose');

var colorSchema = new mongoose.Schema({
	title: {
		type: String,
		unique: true,
		index: true,
		required: true,
	},
});

module.exports = mongoose.model('Color', colorSchema);
