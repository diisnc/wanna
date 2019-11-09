const { body } = require('express-validator');

module.exports = {

	// POST /v1/post/createPost
	createPost: [
		body('description', 'Description is invalid').exists(),
		body('price', 'Price is required').exists(),
		body('isAvailable', 'Status is required').exists(),
		body('category', 'Category is required').exists(),
		body('color', 'Color is required').exists(),
		body('size', 'Size is required').exists(),
	],

	//POST /v1/post/createUserPost
	createUserPost: [
		body('idPost', 'Post id is required').exists(),
		body('type', 'Type is required').exists(),
	],

	//POST /v1/post/comment
	createComment: [
		body('commentData', 'Comment data is required').exists(),
		body('idPost', 'Post id is required').exists(),
	],
    deleteComment:[
		body('idComment', 'Comment id is required').exists(),
	],	
};
