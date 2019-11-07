const passport = require('passport');
const httpStatus = require('http-status');
const { ApiError } = require('../utils/customErrors');
const jwt = require('jsonwebtoken');

const roles = {
	admin: ['guest', 'user'],
	user: ['guest'],
	guest: [],
};

const invalidToken = {
	message: 'Invalid token',
	status: httpStatus.UNAUTHORIZED,
};
const userBlocked = {
	message: 'User is blocked',
	status: httpStatus.UNAUTHORIZED,
};
const expiredToken = {
	message: 'Token is expired',
	status: httpStatus.UNAUTHORIZED,
};
const noPermissions = {
	message: 'Access denied',
	status: httpStatus.FORBIDDEN,
};

function hasPermissions(userRole, allowedRole) {
	return (
		userRole in roles &&
		(userRole === allowedRole || roles[userRole].includes(allowedRole))
	);
}

module.exports = (role = 'guest') => (req, res, next) => {
	// Se a chamada à função for com 0 argumentos, o role = guest em vez de null
	passport.authenticate('jwt', { session: false }, (error, user) => {
		let token = req.headers.authorization.split(' ')[1];
		// Use to ensure token is valid and debug non-working bearer
		try {
			jwt.verify(token, process.env.SECRET_STRING);
		} catch (e) {
			return next(new ApiError(expiredToken));
		}

		if (error) {
			return next(new ApiError(invalidToken));
		}
		if (role !== 'guest') {
			if (!user.isActive) {
				return next(new ApiError(userBlocked));
			}
			if (!hasPermissions(user.role, role)) {
				return next(new ApiError(noPermissions));
			}
		}

		return req.login(user, { session: false }, err => next(err));
	})(req, res, next);
};
