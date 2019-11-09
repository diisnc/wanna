const { Post } = require('../models');
const { Photo } = require('../models');
const { UserPost } = require('../models');
const { Comment } = require('../models');
var fs = require('fs');
const httpStatus = require('http-status');

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

		// devolver listas em múltiplos de 3
		length = list.length;
		console.log(length);
		while (length % 3 != 0) {
			length -= 1;
			console.log(length);
		}

		for (var i = 0; i < length; ) {
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

			if (i > length) break;

			result1.push(post);
		}

		return res.status(httpStatus.OK).json(result1);
	} catch (e) {
		next(e);
	}
};

/**
 *
 * Creates a UserPost which represents Like/Dislike
 * @public
 */

exports.createUserPost = async (req, res, next) => {
	try {
		const userPost = await UserPost.create({
			likeTimeStamp: new Date(),
			user_id: req.user.username,
			post_id: req.body.idPost,
			type: req.body.type,
		});
		return res.status(httpStatus.CREATED).json(userPost);
	} catch (e) {
		next(e);
	}
};

/**
 *
 * Creates a comment
 */

exports.createComment = async (req, res, next) => {
	try {
		const comment = await Comment.create({
			commentText: req.body.commentData,
			idUser: req.user.username,
			idPost: req.body.idPost,
		});
		return res.status(httpStatus.CREATED).json(comment);
	} catch (e) {
		next(e);
	}
};


/**
 * Deletes a comment
 */

exports.removeComment = async (req, res, next) => {
	try {
		await Comment.destroy(
			{
				where:{
					id: req.body.idComment
				}
			}
		);
		res.status(httpStatus.NO_CONTENT).json({ result: 'delete' });
	} catch (e) {
		next(e);
	}
};

/*
* Returns a post information
*/

exports.get = async (req, res, next) => {
	try{
		list = await Post.getPostInfo(req.params.idPost);
		res.json(list);
	}catch(e){
		next(e);
	}
};

/**
 *
 * Deletes a post (** NOT WORKING YET)
 *
 */

exports.remove = async (req, res, next) => {
	try {
		await UserPost.destroy({
			where:{
				post_id: req.params.idPost
			}
		})
		await Post.destroy(
			{
				where:{
					id: req.params.idPost
				}
		});
		res.status(httpStatus.NO_CONTENT).json({ result: 'delete' });
	} catch (e) {
		next(e);
	}
};

/***
 * marks a post as unavailable
 */

 exports.markUnavailable = async (req, res, next) =>{
		try{
			await Post.update(
				{ isAvailable: 'false' },
				{ where: { id: req.params.idPost } }
			);
			res.status(httpStatus.NO_CONTENT).json({ result: 'updated' });
		}catch(e){
			next(e);
		}
 }