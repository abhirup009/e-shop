const mongoose = require('mongoose');

//declare the Schema of BlogCategory Model
var blogCategorySchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			unique: true,
			index: true,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('BlogCategory', blogCategorySchema);
