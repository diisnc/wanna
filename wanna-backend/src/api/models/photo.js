module.exports = (sequelize, DataTypes) => {
	const Photo = sequelize.define('Photo', {
		photoData: {
			type: DataTypes.BLOB,
		},
		imageType: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	});

	Photo.associate = function(models) {
		Photo.belongsTo(models.Post, {
			foreignKey: 'idPost',
			targetKey: 'id',
			onDelete: 'SET NULL',
			onUpdate: 'CASCADE',
		});
	};

	return Photo;
};
