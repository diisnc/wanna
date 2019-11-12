const router = require('express').Router();
const controller = require('../../controllers/profile.controller');
const rules = require('../../validations/profile.validation');
const validate = require('../../validations/handler');

router.route('/').get(controller.profileInfo);

router.route('/follow/:userID').post(validate(rules.follow), controller.follow);

router
	.route('/unfollow/:userID')
	.post(validate(rules.follow), controller.unfollow);

router
	.route('/savedposts')
	.get(controller.getSavedPosts);

module.exports = router;
