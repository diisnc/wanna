const { body, param, query } = require('express-validator');

module.exports = {
	feed: [
		query('page', 'Page is required')
			.exists()
			.toInt(),
	],

	// POST /v1/post/createPost
	createPost: [
		body('price', 'Price is required').exists(),
		body('genre', 'Genre is required').exists(),
		body('brand', 'Brand is required').exists(),
		body('category', 'Category is required').exists(),
		body('color', 'Color is required').exists(),
		body('size', 'Size is required').exists(),
		body('imageData', 'Image is required').exists(),
	],

	//PATCH /v1/post/:idPost
	updatePost: [
		body('description', 'Description is required').exists(),
		body('price', 'Price is required').exists(),
		body('category', 'Category is required').exists(),
		body('color', 'Color is required').exists(),
		body('size', 'Size is required').exists(),
		body('brand', 'brand is required').exists(),
	],

	//POST /v1/post/vote
	createVote: [
		body('idPost', 'Post id is required').exists(),
		body('type', 'Type is required')
			.exists()
			.isInt()
			.isIn(['-1', '1']),
	],

	//DELETE /v1/post/vote

	removeVote: [body('idPost', 'Posto id is required').exists()],

	//POST /v1/post/comment
	createComment: [
		body('commentData', 'Comment data is required').exists(),
		body('idPost', 'Post id is required').exists(),
	],
	//DELETE /v1/post/comment
	deleteComment: [body('idComment', 'Comment id is required').exists()],
	//GET /v1/post/comment
	getComments: [
		query('idPost', 'Post id is required')
			.exists()
			.toInt(),
	],
	//POST /v1/post/savedposts AND //DELETE /v1/post/savedposts
	savedPosts: [body('idPost', 'Posts id is required').exists()],
};
