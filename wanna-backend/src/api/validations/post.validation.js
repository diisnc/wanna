const { body } = require('express-validator');

module.exports = {

	// POST /v1/post/createPost
	createPost: [
		body('description', 'Description is invalid').exists(),
		body('price', 'Price is required').exists(),
		body('isAvailable'),
		body('category', 'Category is required').exists(),
		body('color', 'Color is required').exists(),
		body('size', 'Size is required').exists(),
		body('imageData', 'Image is required').exists(),
	],

	//POST /v1/post/vote
	createVote: [
		body('idPost', 'Post id is required').exists(),
		body('type', 'Type is required').exists(),
	],

	//DELETE /v1/post/vote

	removeVote: [
		body('idPost', 'Posto id is required').exists(),
	],

	//POST /v1/post/comment
	createComment: [
		body('commentData', 'Comment data is required').exists(),
		body('idPost', 'Post id is required').exists(),
	],
	//DELETE /v1/post/comment
    deleteComment:[
		body('idComment', 'Comment id is required').exists(),
	],
	//GET /v1/post/comment
	getComments:[
		body('idPost', 'Post id is required').exists(),
	],
	//POST /v1/post/savedposts AND //DELETE /v1/post/savedposts 
	savedPosts:[
		body('idPost', 'Posts id is required').exists(),
	],
};
