const router = require('express').Router();
const validate = require('../../validations/handler');
const controller = require('../../controllers/auth.controller');
const rules = require('../../validations/auth.validation');
const passport = require('passport');

// * @apiDescription Register a new user
router.post('/register', controller.register);

// * @apiDescription Get an accessToken
router.route('/login').post(validate(rules.login), controller.login);

// * @apiDescription Delete user's refresh token
router.route('/logout').post(controller.logout);

// * @apiDescription Refresh expired accessToken
// * @apiParam  {String}  refreshToken  Refresh token required when user logged in
router
	.route('/refresh-token')
	.post(validate(rules.refresh), controller.refresh);

router
	.route('/reset-password')
	// * @apiDescription Send reset password email
	// * @apiParam  {String}  email         User's email
	.post(validate(rules.email), controller.reset)
	// * @apiDescription Set new password after reset
	// * @apiParam  {String}  id          User's id
	// * @apiParam  {String}  resetToken Reset token
	// * @apiParam  {String}  password    New user password
	.put(validate(rules.changePassword), controller.changePassword);

// * @apiDescription Login with facebook. Creates a new user if it does not exist
// * @apiParam  {String}  access_token  Facebook's access_token
router
	.route('/facebook')
	.post(
		validate(rules.oAuth),
		passport.authenticate('facebook', { session: false }),
		controller.oAuth,
	);

// * @apiDescription Login with google. Creates a new user if it does not exist
// * @apiParam  {String}  access_token  Google's access_token
router
	.route('/google')
	.post(
		validate(rules.oAuth),
		passport.authenticate('google', { session: false }),
		controller.oAuth,
	);

module.exports = router;
