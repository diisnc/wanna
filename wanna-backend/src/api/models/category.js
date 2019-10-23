module.exports = (sequelize, DataTypes) => {
	const Category = sequelize.define('Category', {
		name: {
			type: DataTypes.TEXT,
		},
	});

	Category.associate = function(models) {
		Category.belongsTo(models.Post, {
			foreignKey: 'idPost',
			targetKey: 'id',
			onDelete: 'SET NULL',
			onUpdate: 'CASCADE',
		});
	};

	return Category;
};
