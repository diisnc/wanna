const { Post } = require('../models');
const { Photo } = require('../models');
const { UserPost } = require('../models');
const { Comment } = require('../models');
var fs = require('fs');
const httpStatus = require('http-status');

/* Load post and append to req.
 * @public
 */
exports.load = async (req, res, next, id) => {
	try {
		const post = await Post.findByPk(id);
		if (!post) throw new ApiError({ status: httpStatus.NOT_FOUND });
		next();
	} catch (e) {
		next(e);
	}
};

/**
 * Returns Upload photo
 * @public
 */
exports.create = async (req, res, next) => {
	try {
		const post = await Post.create({
			description: req.body.description,
			price: req.body.price,
			isAvailable: req.body.isAvailable,
			idUser: req.user.username,
			color: req.body.color,
			category: req.body.category,
			size: req.body.size,
		});

		for (var i = 0; i < req.files.length; i++) {
			var imageData = fs.readFileSync(req.files[i].path);

			const photo = await Photo.create({
				photoData: imageData,
				photoType: req.files[i].mimetype,
			});

			photo.setPost(post);

			fs.unlink(req.files[i].path, err => {
				if (err) {
					console.log('failed to delete local image:' + err);
				} else {
					console.log('successfully deleted local image');
				}
			});
		}

		return res.status(httpStatus.CREATED).json({
			post: post.transform(),
			photo: 'Fotos adicionadas: ' + req.files.length,
		});
	} catch (e) {
		next(e);
	}
};

/**
 * Returns Get feed
 * @public
 */
exports.feed = async (req, res, next) => {
	try {
		list = await Post.feed();

		const result1 = [];

		for (var i = 0; i < list.length;) {
			var currentID = list[i].id;
			const post = {
				id: list[i].id,
				idUser: list[i].idUser,
				description: list[i].description,
				isAvailable: list[i].isAvailable,
				price: list[i].price,
				photoType1: list[i].photoType,
				photoData1: list[i].photoData,
			};

			i += 1;

			var index = 2;
			while (
				(parseInt(list[i].id, 10) == currentID) &
				(i < list.length)
			) {
				post['photoType' + index] = list[i].photoType;
				post['photoData' + index] = list[i].photoData;
				i += 1;
				index += 1;

				if (i >= list.length) break;
			}

			result1.push(post);
		}

		res.json(result1);
	} catch (e) {
		next(e);
	}
};

/**
 *
 * Creates a UserPost
 * @public
 */

exports.createUserPost = async (req, res, next) => {
	try {
		const userPost = await UserPost.create({
			likeTimeStamp: new Date(),
			user_id: req.user.username,
			post_id: req.body.idPost,
		});
		return res.status(httpStatus.CREATED).json(userPost);
	} catch (e) {
		next(e);
	}
};

exports.createComment = async (req, res, next) => {
	try {
		const comment = await Comment.create({
			commentData: req.body.commentData,
			idUser: req.user.username,
			idPost: req.body.idPost,
		});
		return res.status(httpStatus.CREATED).json(comment);
	} catch (e) {
		next(e);
	}
};
