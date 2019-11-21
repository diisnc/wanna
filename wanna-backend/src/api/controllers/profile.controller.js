const { FollowRelationship } = require('../models');
const { User } = require('../models');
const { Post } = require('../models');
const httpStatus = require('http-status');

/**
 * Returns Get logged in user info
 * @public
 */
exports.profileInfo = async (req, res, next) => {
	try {
		if (req.query.username) {
			object = await User.getProfileInfo(req.query.username);
			followingQ = await User.amIFollowing(
				req.user.username,
				req.query.username,
			);
			object['following'] = followingQ[0].exists;
		} else object = await User.getProfileInfo(req.user.username);
		return res.status(httpStatus.OK).json(object);
	} catch (e) {
		next(e);
	}
};

/**
 * Returns Get followers list
 * @public
 */
exports.getFollowers = async (req, res, next) => {
	try {
		console.log('aqui');
		list = await User.getFollowers(req.user.username);
		console.log('aqui2');
		return res.json(list);
	} catch (e) {
		next(e);
	}
};

/**
 * Returns Get followings list
 * @public
 */
exports.getFollowings = async (req, res, next) => {
	try {
		list = await User.getFollowings(req.user.username);
		return res.json(list);
	} catch (e) {
		next(e);
	}
};

/**
 * Returns follow with success
 * @public
 */
exports.follow = async (req, res, next) => {
	try {
		await FollowRelationship.create({
			followed_id: req.params.userID,
			follower_id: req.user.username,
		});

		return res.sendStatus(200);
	} catch (e) {
		next(e);
	}
};

/**
 * Returns unfollow with success
 * @public
 */
exports.unfollow = async (req, res, next) => {
	followPost = await FollowRelationship.destroy({
		where: {
			followed_id: req.params.userID,
			follower_id: req.user.username,
		},
	})
		.then(function(deletedRecord) {
			if (deletedRecord === 1) {
				return res.sendStatus(200);
			} else {
				return res.status(404).json({
					message: 'You do not follow this page',
				});
			}
		})
		.catch(function(error) {
			res.status(500).json('Erro na operação ' + error);
		});
};

/**
 *
 * Returns the list of saved posts *
 *
 * needs rework if post images are required.
 *
 */
exports.getSavedPosts = async (req, res, next) => {
	try {
		list = await Post.getSavedPosts(req.user.username);
		res.json(list);
	} catch (e) {
		next(e);
	}
};
