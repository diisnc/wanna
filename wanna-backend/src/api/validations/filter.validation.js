const { body } = require('express-validator');

module.exports = {
	createFilter: [
		body('category'),
		body('priceMin'),
		body('priceMax'),
		body('size'),
		body('color'),
		body('isActive'),
	],

	searchByFilter: [
		body('categories'),
		body('pricesMin'),
		body('pricesMax'),
		body('sizes'),
		body('colors'),
		body('length'),
	],
};