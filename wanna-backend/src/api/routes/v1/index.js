const express = require('express');
const statusMonitor = require('express-status-monitor')();
const passport = require('passport');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
const profileRoutes = require('./profile.route');
const postRoutes = require('./post.route');
const chatRoutes = require('./chat.route')
const filterRoutes = require('./filter.route');
const authenticate = require('../../middlewares/authenticate');

const router = express.Router();
const jwtAuth = passport.authenticate('jwt', { session: false });

/**
 * GET v1/status
 */
router.use(statusMonitor);

/**
 * GET v1/docs
 */
router.use('/docs', express.static('docs'));
router.use('/docs-examples', express.static('docs-examples'));

//Questão do search ter ou não um controlador proprio
//router.use('/users', jwtAuth, authenticate('admin'), userRoutes);
router.use('/users', authenticate('user'), userRoutes);
router.use('/profile', authenticate('user'), profileRoutes);
router.use('/post', authenticate('user'), postRoutes);
router.use('/filter', authenticate('user'), filterRoutes);
router.use('/chat', authenticate('user'), chatRoutes);
router.use('/auth', authRoutes);

module.exports = router;
