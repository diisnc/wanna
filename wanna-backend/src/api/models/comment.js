module.exports = (sequelize, DataTypes) => {
	const Comment = sequelize.define('Comment', {
		commentText: {
			type: DataTypes.TEXT,
			validate: {
				notEmpty: { msg: 'Text is required' },
			},
		},
	});
	Comment.associate = function(models) {
		Comment.belongsTo(models.Post, {
			foreignKey: 'idPost',
			targetKey: 'id',
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
		});
		Comment.belongsTo(models.User, {
			foreignKey: 'idUser',
			targetKey: 'username',
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
		});
	};
	return Comment;
};