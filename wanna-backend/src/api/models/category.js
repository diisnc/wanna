module.exports = (sequelize, DataTypes) => {
	const Category = sequelize.define('Category', {
		CategoryData: {
			type: DataTypes.BLOB,
		},
		imageType: {
			type: DataTypes.STRING,
			allowNull: false,
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
