const router = require('express').Router();
const controller = require('../../controllers/filter.controller');
const rules = require('../../validations/filter.validation');
const validate = require('../../validations/handler');

router
	.route('/')
	.get(controller.getFilters);

router
	.route('/createFilter')
	.post(validate(rules.createFilter), controller.createFilter);

router
	.route('/searchByFilter')
	.get(controller.searchByFilter);

router
	.route('/:idFilter')
	.get(controller.get)
	.delete(controller.delete);

router
	.route('/enableFilter')
	.post(validate(rules.changeFilterStatus), controller.enableFilter);

router
	.route('/disableFilter')
	.post(validate(rules.changeFilterStatus), controller.disableFilter);

module.exports = router;