const { param } = require('express-validator');

module.exports = {
	follow: [param('userID', 'User id is required').exists()],

	unfollow: [param('userID', 'User id is required').exists()],
};
