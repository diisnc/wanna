const { body } = require('express-validator');

module.exports = {
	// POST /v1/publishPost
	createPost: [
		body('description', 'Description is invalid').exists(),
		body('price'),
		body('isAvailable', 'Status is required'),
		body('imageType', 'ImageType is required'),
		body('imageData', 'ImageData is required'),
	],
};
