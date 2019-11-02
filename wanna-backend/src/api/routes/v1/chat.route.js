const express = require('express');
const router = express.Router();
const controller = require('../../controllers/chat.controller');
const rules = require('../../validations/chat.validation');
const validate = require('../../validations/handler');

//router.route('/')

//router.route('/:userName');

router
	.route('/sendMessage/:userName')
	.post(validate(rules.sendMessage), controller.sendMessage);

module.exports = router;
