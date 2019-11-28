const { query, body, param } = require('express-validator');

module.exports = {

	getMessages: [
		param('idContact', 'Contact username is required').exists(),
		param('idPost', 'Post id is required').exists()
	],
};