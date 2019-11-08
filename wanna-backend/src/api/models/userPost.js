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
			validate: {
				notEmpty: { msg: 'Type is required' },
			},
		},
		user_id: {
			type: DataTypes.INTEGER(),
			primaryKey: true,
			references: { model: 'User', key: 'id' },
			onDelete: 'cascade',
		},
		post_id: {
			type: DataTypes.INTEGER(),
			primaryKey: true,
			references: { model: 'Post', key: 'id' },
			onDelete: 'cascade',
		},
	});
	
	return UserPost;
};
