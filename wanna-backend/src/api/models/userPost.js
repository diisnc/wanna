module.exports = (sequelize, DataTypes) => {
	const UserPost = sequelize.define('UserPost', {
		likeTimeStamp: {
			type: DataTypes.DATE(),
			validate: {
				notEmpty: { msg: 'TimeStamp is required' },
			},
		},
		type: {
			type: DataTypes.INTEGER(),
		},
		user_id: {
			type: DataTypes.INTEGER(),
			primaryKey: true,
			references: { model: 'User', key: 'username' },
		},
		post_id: {
			type: DataTypes.INTEGER(),
			primaryKey: true,
			references: { model: 'Post', key: 'id' },
		},
	});
	return UserPost;
};
