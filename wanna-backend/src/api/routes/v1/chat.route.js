const express = require('express');
const validate = require('../../validations/handler');
const controller = require('../../controllers/chat.controller');
const rules = require('../../validations/user.validation');


const router = express.Router();

router.route('/').get(controller.getContacts);

module.exports = router;