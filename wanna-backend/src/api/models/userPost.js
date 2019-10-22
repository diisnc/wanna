
module.exports = (sequelize, DataTypes) => {
	const UserPost = sequelize.define('UserPost', {
		likeTimeStamp: {
			type: DataTypes.DATE(),
			validate: {
				notEmpty: { msg: 'TimeStamp is required' },
			},
		},
		user_id: {
			type: DataTypes.INTEGER(),
			primaryKey: true,
			references: { model: 'User', key: 'id' },
		},
		post_id: {
			type: DataTypes.INTEGER(),
			primaryKey: true,
			references: { model: 'Post', key: 'id' },
		},
	});

// UserPost.sync({ force: true });

	return UserPost;
};
