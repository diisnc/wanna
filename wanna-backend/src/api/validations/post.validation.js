const { body } = require('express-validator');

module.exports = {
	// POST /v1/createPost
	createPost: [
		body('description', 'Description is invalid').exists(),
		body('price'),
		body('isAvailable', 'Status is required').exists(),
	],
};
