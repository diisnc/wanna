const express = require('express');
const validate = require('../../validations/handler');
const controller = require('../../controllers/post.controller');
const rules = require('../../validations/post.validation');

const router = express.Router();

/**
 * Load post when API with postId route parameter is hit
 */
router.param('postId', controller.load);

router
	.route('/')
	/**
	 * @api {get} v1/posts List Posts
	 * @apiDescription Get a list of posts
	 * @apiVersion 1.0.0
	 * @apiName ListPosts
	 * @apiGroup Post
	 * @apiPermission admin
	 *
	 * @apiHeader {String} Authorization  Post's access token
	 *
	 * @apiParam  {Number{1-}}         [page=1]     List page
	 * @apiParam  {Number{1-100}}      [qty=1]  Posts per page
	 *
	 * @apiSuccess {PaginationObject[]} posts List of posts.
	 *
	 * @apiError (Unauthorized 401)  Unauthorized  Only authenticated posts can access the data
	 * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
	 */
	.get(validate(rules.listPosts), controller.list)
	/**
	 * @api {post} v1/posts Create Post
	 * @apiDescription Create a new post
	 * @apiVersion 1.0.0
	 * @apiName CreatePost
	 * @apiGroup Post
	 * @apiPermission admin
	 *
	 * @apiHeader {String} Authorization  Post's access token
	 *
	 * @apiParam  {String}             email        Post's email
	 * @apiParam  {String{6..128}}     password     Post's password
	 * @apiParam  {String{..128}}      firstName   Post's first name
	 * @apiParam  {String{..128}}      lastName    Post's last name
	 *
	 * @apiSuccess (Created 201) {String}  id         Post's id
	 * @apiSuccess (Created 201) {String}  firstName Post's first name
	 * @apiSuccess (Created 201) {String}  lastName  Post's last name
	 * @apiSuccess (Created 201) {String}  email      Post's email
	 * @apiSuccess (Created 201) {String}  role       Post's role
	 * @apiSuccess (Created 201) {Date}    createdAt  Timestamp
	 *
	 * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
	 * @apiError (Unauthorized 401)  Unauthorized     Only authenticated posts can create the data
	 * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
	 */
	.post(validate(rules.createPost), controller.create);

router
	.route('/:postId')
	/**
	 * @api {get} v1/posts/:postId Get Post
	 * @apiDescription Get post information
	 * @apiVersion 1.0.0
	 * @apiName GetPost
	 * @apiGroup Post
	 * @apiPermission post
	 *
	 * @apiHeader {String} Authorization Post's access token
	 *
	 * @apiSuccess {String}  id         Post's id
	 * @apiSuccess {String}  firstName  Post's first name
	 * @apiSuccess {String}  lastName   Post's last name
	 * @apiSuccess {String}  email      Post's email
	 * @apiSuccess {String}  role       Post's role
	 * @apiSuccess {Date}    createdAt  Timestamp
	 *
	 * @apiError (Unauthorized 401) Unauthorized Only authenticated posts can access the data
	 * @apiError (Forbidden 403)    Forbidden    Only post with same id or admins can access the data
	 * @apiError (Not Found 404)    NotFound     Post does not exist
	 */
	.get(controller.get)
	/**
	 * @api {patch} v1/posts/:postId Update Post
	 * @apiDescription Update some fields of a post document
	 * @apiVersion 1.0.0
	 * @apiName UpdatePost
	 * @apiGroup Post
	 * @apiPermission post
	 *
	 * @apiHeader {String} Authorization Post's access token
	 *
	 * @apiParam  {String}             email        Post's email
	 * @apiParam  {String{6..128}}     password     Post's password
	 * @apiParam  {String{..128}}      firstName   Post's first name
	 * @apiParam  {String{..128}}      lastName    Post's last name
	 * @apiParam  {String=post,admin}  [role]       Post's role
	 * (You must be an admin to change the post's role)
	 *
	 * @apiSuccess {String}  id         Post's id
	 * @apiSuccess {String}  firstName Post's first name
	 * @apiSuccess {String}  lastName  Post's last name
	 * @apiSuccess {String}  email      Post's email
	 * @apiSuccess {String}  role       Post's role
	 * @apiSuccess {Date}    createdAt  Timestamp
	 *
	 * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
	 * @apiError (Unauthorized 401) Unauthorized Only authenticated posts can modify the data
	 * @apiError (Forbidden 403)    Forbidden    Only post with same id or admins can modify the data
	 * @apiError (Not Found 404)    NotFound     Post does not exist
	 */
	.patch(validate(rules.updatePost), controller.update)
	/**
	 * @api {patch} v1/posts/:postId Delete Post
	 * @apiDescription Delete a post
	 * @apiVersion 1.0.0
	 * @apiName DeletePost
	 * @apiGroup Post
	 * @apiPermission post
	 *
	 * @apiHeader {String} Authorization Post's access token
	 *
	 * @apiSuccess (No Content 204)  Successfully deleted
	 *
	 * @apiError (Unauthorized 401) Unauthorized  Only authenticated posts can delete the data
	 * @apiError (Forbidden 403)    Forbidden     Only post with same id or admins can delete the data
	 * @apiError (Not Found 404)    NotFound      Post does not exist
	 */
	.delete(controller.remove);

module.exports = router;
