const { Filter } = require('../models');
const httpStatus = require('http-status');

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
		return res.status(httpStatus.CREATED).json();
	} catch (e) {
		next(e);
	}
};
