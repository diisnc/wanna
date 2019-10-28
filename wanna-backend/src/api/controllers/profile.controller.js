const { followRelationship } = require('../models');
const { User } = require('../models');
const httpStatus = require('http-status');

/**
 * Returns Get logged in user info
 * @public
 */
exports.profileInfo = async (req, res, next) => {
	try {
		list = await User.getProfileInfo(req.user.username);
		res.json(list);
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
		const followPost = await followRelationship.create({
			followed_id: req.params.userID,
			follower_id: req.user.username,
		});

		return res.status(httpStatus.CREATED).json(followPost);
	} catch (e) {
		next(e);
	}
};

/**
 * Returns unfollow with success
 * @public
 */
exports.unfollow = async (req, res, next) => {
	followPost = await followRelationship
		.destroy({
			where: {
				followed_id: req.params.userID,
				follower_id: req.user.username,
			},
		})
		.then(function(deletedRecord) {
			if (deletedRecord === 1) {
				res.status(200).json({ message: 'Unfollow successfully!' });
			} else {
				res.status(404).json({
					message: 'You do not follow this page',
				});
			}
		})
		.catch(function(error) {
			res.status(500).json('Erro na operação ' + error);
		});
};

// Lista de posts dele
// Lista de posts guardados
