module.exports = (sequelize, DataTypes) => {
	const Like = sequelize.define('Like', {});
	Like.associate = function(models) {
		Like.belongsTo(models.Post, {
			foreignKey: 'idPost',
			targetKey: 'id',
			onDelete: 'SET NULL',
			onUpdate: 'CASCADE',
		});
		Like.belongsTo(models.User, {
			foreignKey: 'idUser',
			targetKey: 'username',
			onDelete: 'SET NULL',
			onUpdate: 'CASCADE',
		});
	};
	return Like;
};