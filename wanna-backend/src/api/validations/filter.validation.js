const { body } = require('express-validator');

module.exports = {
	createFilter: [
		body('category').exists(),
		body('priceMin').exists(),
		body('priceMax').exists(),
		body('size').exists(),
		body('color').exists(),
		body('isActive').exists(),
	],

	searchByFilter: [body('idFilter', 'Filter id is required').exists()],
};
