const { body } = require('express-validator');

module.exports = {
	// POST /v1/post/createPost
	createPost: [
		body('description', 'Description is invalid').exists(),
		body('price'),
		body('isAvailable', 'Status is required').exists(),
	],

	//POST /v1/post/createUserPost
	createUserPost: [body('idPost', 'Post id is required').exists()],

	//POST /v1/post/comment
	createComment: [
		body('commentData', 'Comment data is required').exists(),
		body('idPost', 'Post id is required').exists(),
	],
};
