const { query, body, param } = require('express-validator');

module.exports = {
	// GET /v1/users
	listUsers: [
		query('page', 'Page is required')
			.exists()
			.toInt(),
		query('qty', 'Qty is required')
			.exists()
			.toInt(),
	],

	// POST /v1/users
	createUser: [
		body('email', 'Invalid email').isEmail(),
		body('username', 'username is Required').exists(),
		body('password', 'Passwords must be at least 8 chars long').isLength({
			min: 8,
		}),
		body('firstName', 'firstName is Required').exists(),
		body('lastName', 'lastName is Required').exists(),
		body('location', 'location is Required').exists(),
	],

	// PATCH /v1/users/:userId
	updateUser: [
	],

	// PATCH /v1/users/:userString
	search: [param('userString', 'Username id is required').exists()],
};
