const httpStatus = require('http-status');
const { omit } = require('lodash');
const { User } = require('../models');
const { UserPost } = require('../models');
const { ApiError } = require('../utils/customErrors');
const paginate = require('../middlewares/paginationResponse');

/**
 * Load user and append to req.
 * @public
 */
exports.load = async (req, res, next, id) => {
	try {
		const user = await User.findByPk(id);
		if (!user) throw new ApiError({ status: httpStatus.NOT_FOUND });
		req.locals = { user };
		next();
	} catch (e) {
		next(e);
	}
};

/**
 * Get user
 * @public
 */
exports.get = (req, res) => {
	res.json(req.locals.user.transform());
};

/**
 * Create new user
 * @public
 */
exports.create = async (req, res, next) => {
	try {
		await User.create(req.body);
		res.send(200);
	} catch (e) {
		next(e);
	}
};

/**
 * Update existing user
 * @public
 */
exports.update = async (req, res, next) => {
	const ommitRole = req.locals.user.role !== 'admin' ? 'role' : '';
	const updatedUser = omit(req.body, ommitRole);
	let user = Object.assign(req.locals.user, updatedUser);
	user = await user.save();
	try {
		res.json(user.transform());
	} catch (e) {
		next(e);
	}
};

/**
 * Get user list
 * @public
 */
exports.list = [
	async (req, res, next) => {
		try {
			const { page, qty } = req.query;
			req.pagination = await User.paginate(page, qty);
			next();
		} catch (e) {
			next(e);
		}
	},
	paginate,
];

/**
 * Delete user
 * @public
 */
exports.remove = async (req, res, next) => {
	const { user } = req.locals;

	try {
		await UserPost.destroy({
			where: {
				user_id: req.params.userId,
			},
		});
		await user.destroy();
		res.status(httpStatus.NO_CONTENT).json({ result: 'delete' });
	} catch (e) {
		next(e);
	}
};

/**
 * Returns searched Usernames
 * @public
 */
exports.search = async (req, res, next) => {
	try {
		list = await User.getUsernames(req.params.userString);
		res.json(list);
	} catch (e) {
		next(e);
	}
};
