const { Filter } = require('../models');
const { Post } = require('../models');
const httpStatus = require('http-status');

exports.get = async (req, res, next) => {
	try {
		list = await Filter.getFilterInfo(req.params.idFilter);
		return res.json(list);
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
		return res.sendStatus(200);
	} catch (e) {
		next(e);
	}
};

exports.getFilters = async (req, res, next) => {
	try {
		list = await Filter.getFilters(req.user.username);
		return res.json(list);
	} catch (e) {
		next(e);
	}
};

exports.createFilter = async (req, res, next) => {
	try {
		await Filter.create({
			category: req.body.category,
			priceMin: req.body.priceMin,
			priceMax: req.body.priceMax,
			size: req.body.size,
			color: req.body.color,
			idUser: req.user.username,
		});
		return res.sendStatus(200);
	} catch (e) {
		next(e);
	}
};

exports.searchByFilter = async (req, res, next) => {
	try {
		list = await Post.getFilteredPosts(req.user.username);
		return res.json(list);
	} catch (e) {
		next(e);
	}
};

exports.enableFilter = async (req, res, next) => {
	try {
		await Filter.update(
			{ isActive: 'true' },
			{ where: { id: req.body.idFilter } },
		);
		return res.sendStatus(200);
	} catch (e) {
		next(e);
	}
};

exports.disableFilter = async (req, res, next) => {
	try {
		await Filter.update(
			{ isActive: 'false' },
			{ where: { id: req.body.idFilter } },
		);
		return res.sendStatus(200);
	} catch (e) {
		next(e);
	}
};
