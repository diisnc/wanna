const { Filter } = require('../models');
const { Post } = require('../models');
const httpStatus = require('http-status');

exports.get = async (req, res, next) => {
	try {
		list = await Filter.getFilterInfo(req.params.idFilter);
		res.json(list);
	} catch (e) {
		next(e);
	}
};

exports.delete = async (req, res, next) => {
	try {
		await Filter.destroy({
			where: {
				id: req.params.idFilter,
			},
		});
		res.status(httpStatus.NO_CONTENT).json({ result: 'delete' });
	} catch (e) {
		next(e);
	}
};

exports.getFilters = async (req, res, next) => {
	try {
		list = await Filter.getFilters();
		res.json(result1);
	} catch (e) {
		next(e);
	}
};

exports.createFilter = async (req, res, next) => {
	try {
		const userFilter = await Filter.create({
			category: req.body.category,
			idUser: req.user.username,
			priceMin: req.body.priceMin,
			priceMax: req.body.priceMax,
			size: req.body.size,
			color: req.body.color,
			isActive: req.body.isActive,
		});
		return res.status(httpStatus.CREATED).json(userFilter);
	} catch (e) {
		next(e);
	}
};

exports.searchByFilter = async (req, res, next) => {
	try {
		list = await Post.getFilteredPosts(req.body);
		res.json(list);
	} catch (e) {
		next(e);
	}
};
