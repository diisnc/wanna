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
		validate(rules.createPost),
		controller.create,
	);

router
	.route('/vote')
	.post(validate(rules.createVote), controller.createVote)
	.delete(validate(rules.removeVote), controller.removeVote);

router
	.route('/comment')
	.get(validate(rules.getComments),controller.getPostComments)
	.post(validate(rules.createComment), controller.createComment)
	.delete(validate(rules.deleteComment), controller.removeComment);

router
	.route('/savedpost')
	.post(validate(rules.savedPosts),controller.savePost)
	.delete(validate(rules.savedPosts),controller.unsavePost);
	

router
	.route('/:idPost')
	.get(controller.get)
	.delete(controller.remove)
	.post(controller.markUnavailable);

/*
	.patch(validate(rules.updatePost), controller.update)

*/

module.exports = router;