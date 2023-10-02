class BlogApiResponse {
	constructor(
		title,
		description,
		category,
		numViews,
		author,
		images,
		isLiked,
		isDisliked
	) {
		(this.title = title),
			(this.description = description),
			(this.category = category),
			(this.numViews = numViews),
			(this.author = author),
			(this.images = images),
			(this.isLiked = isLiked),
			(this.isDisliked = isDisliked);
	}
}

module.exports = BlogApiResponse;
