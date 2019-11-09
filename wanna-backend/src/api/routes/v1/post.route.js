const express = require('express');
const validate = require('../../validations/handler');
const controller = require('../../controllers/post.controller');
const rules = require('../../validations/post.validation');

const router = express.Router();

const multer = require('multer');
const upload = multer({ dest: __dirname + '/images' });

/**
 * Load post when API with postId route parameter is hit
 */
//router.param('postId', controller.load);

router.route('/feed').get(controller.feed);

router
	.route('/createPost')
	.post(
		upload.any('imageData'),
		validate(rules.createPost),
		controller.create,
	);

router
	.route('/createUserPost')
	.post(validate(rules.createUserPost), controller.createUserPost);

router
	.route('/comment')
	.post(validate(rules.createComment), controller.createComment)
	.delete(validate(rules.deleteComment), controller.removeComment);

	

router
	.route('/:postId')
	.get(controller.get)
	.delete(controller.remove);

/*
	.patch(validate(rules.updatePost), controller.update)

*/

module.exports = router;
