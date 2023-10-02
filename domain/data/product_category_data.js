const mongoose = require('mongoose');

//declare Schema for ProductCategory Model
var productCategorySchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		index: true,
		unique: true,
	},
});

module.exports = mongoose.model('ProductCategory', productCategorySchema);
