const { User } = require('../models');

/**
 * Returns Get logged in user info
 * @public
 */
exports.profileInfo = async (req, res, next) => {
	try {
		list = await User.getProfileInfo(req.user.id);
		res.json(list);
	} catch (e) {
		next(e);
	}
};

// Lista de posts dele
// Lista de posts guardados
