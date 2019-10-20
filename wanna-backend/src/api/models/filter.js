module.exports = (sequelize, DataTypes) => {
	const Filter = sequelize.define('Filter', {
		FilterData: {
			type: DataTypes.BLOB,
		},
		imageType: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	});

	Filter.associate = function(models) {
		Filter.belongsTo(models.Filter, {
			foreignKey: 'idFilter',
			targetKey: 'id',
			onDelete: 'SET NULL',
			onUpdate: 'CASCADE',
		});
	};

	return Filter;
};
