module.exports = (sequelize, DataTypes) => {
	const Comment = sequelize.define('Comment', {
		CommentData: {
			type: DataTypes.BLOB,
		},
		imageType: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	});

	Comment.associate = function(models) {
		Comment.belongsTo(models.Post, {
			foreignKey: 'idPost',
			targetKey: 'id',
			onDelete: 'SET NULL',
			onUpdate: 'CASCADE',
		});
	};

	return Comment;
};
