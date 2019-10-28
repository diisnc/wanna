module.exports = (sequelize, DataTypes) => {
	const Filter = sequelize.define('Filter', {
		category: {
			type: DataTypes.STRING,
			defaultValue: '',
		},
		color: {
			type: DataTypes.STRING,
			defaultValue: '',
		},
		priceMin: {
			type: DataTypes.DECIMAL(10, 2),
			defaultValue: 0,
		},
		priceMax: {
			type: DataTypes.DECIMAL(10, 2),
			defaultValue: 0,
		},
		size: {
			type: DataTypes.STRING,
			defaultValue: '',
		},
		isActive: {
			defaultValue: true,
			type: DataTypes.BOOLEAN,
		},
	});

	Filter.associate = function(models) {
		Filter.belongsTo(models.User, {
			foreignKey: 'idUser',
			targetKey: 'username',
			onDelete: 'SET NULL',
			onUpdate: 'CASCADE',
		});
	};

	return Filter;
};
