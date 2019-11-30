const express = require('express');
const validate = require('../../validations/handler');
const controller = require('../../controllers/chat.controller');
const rules = require('../../validations/chat.validation');


const router = express.Router();

router.route('/').get(controller.getContacts);
router.route('/previous-messages/').get(controller.getMessages);
router.route('/photos').get(controller.getPhotos);

module.exports = router;