module.exports = (sequelize, DataTypes) => {
	const Comment = sequelize.define('Comment', {
		commentText: {
			type: DataTypes.TEXT,
		},
	});
	Comment.associate = function(models) {
		Comment.belongsTo(models.Post, {
			foreignKey: 'idPost',
			targetKey: 'id',
			onDelete: 'SET NULL',
			onUpdate: 'CASCADE',
		});
		Comment.belongsTo(models.User, {
			foreignKey: 'idUser',
			targetKey: 'id',
			onDelete: 'SET NULL',
			onUpdate: 'CASCADE',
		});
	};
	return Comment;
};