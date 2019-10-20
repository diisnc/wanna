const { Post } = require('../models');
const { Photo } = require('../models');
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
			idUser: req.user.id,
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
		res.json(list);
	} catch (e) {
		next(e);
	}
};
