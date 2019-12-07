const express = require('express');
const validate = require('../../validations/handler');
const controller = require('../../controllers/user.controller');
const rules = require('../../validations/user.validation');

const router = express.Router();

/**
 * Load user when API with userId route parameter is hit
 */
router.param('userId', controller.load);

router
	.route('/')
	.get(validate(rules.listUsers), controller.list)
	.post(validate(rules.createUser), controller.create)
	.patch(controller.update);

router
	.route('/:userId')
	.get(controller.get)
	.delete(controller.remove);

router
	.route('/search/:userString')
	.get(validate(rules.search), controller.search);

module.exports = router;
