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
		return res.sendStatus(200)
	} catch (e) {
		next(e);
	}
};

exports.getFilters = async (req, res, next) => {
	try {
		list = await Filter.getFilters();
		return res.json(list);
	} catch (e) {
		next(e);
	}
};

exports.createFilter = async (req, res, next) => {
	try {
		await Filter.create({
			category: req.body.category,
			idUser: req.user.username,
			priceMin: req.body.priceMin,
			priceMax: req.body.priceMax,
			size: req.body.size,
			color: req.body.color,
			isActive: req.body.isActive,
		});
		return res.sendStatus(200)
	} catch (e) {
		next(e);
	}
};

exports.searchByFilter = async (req, res, next) => {
	try {
		list = await Post.getFilteredPosts(req.body);
		return res.json(list);
	} catch (e) {
		next(e);
	}
};
