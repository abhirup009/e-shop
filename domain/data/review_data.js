const mongoose = require('mongoose');

// declare the Schema of Review Model
var ReviewSchema = new mongoose.Schema(
	{
		review: {
			type: String,
			required: [true, 'Review cannot be empty!'],
		},
		rating: {
			type: Number,
			min: 1,
			max: 5,
		},
		postedBy: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
			required: [true, 'Review must belong to a user'],
		},
		product: {
			type: mongoose.Schema.ObjectId,
			ref: 'Product',
			required: [true, 'Review must belong to a Product'],
		},
	},
	{
		timestamps: true,
	}
);

ReviewSchema.pre(/^find/, function (next) {
	this.populate({
		path: 'postedBy',
		select: 'userName email',
	});
	next();
});

module.exports = mongoose.model('Review', ReviewSchema);
