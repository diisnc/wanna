module.exports = (sequelize, DataTypes) => {
	const SavedPost = sequelize.define('SavedPost', {
		user_id: {
			type: DataTypes.STRING,
			primaryKey: true,
			references: { model: 'User', key: 'username' },
		},
		post_id: {
			type: DataTypes.INTEGER(),
			primaryKey: true,
			references: { model: 'Post', key: 'id' },

		},
	});
	
	return SavedPost;
};
