const { User } = require('../models');

/**
 * Returns Get photo from user
 * @public
 */
exports.create = async (req, res, next) => {

	var imageData = fs.readFileSync('/path/to/file');

	try {
		list = await User.getProfileInfo(req.user.id);
		res.json(list);
	} catch (e) {
		next(e);
	}
};
