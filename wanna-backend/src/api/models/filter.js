module.exports = (sequelize, DataTypes) => {
	const Filter = sequelize.define('Filter', {
		category: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		color: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		priceMin: {
			type: DataTypes.DECIMAL(10, 2),
			allowNull: true,
		},
		priceMax: {
			type: DataTypes.DECIMAL(10, 2),
			allowNull: true,
		},
		size: {
			type: DataTypes.STRING,
			allowNull: true,
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

	Filter.getFilters = async function getFilters(username) {
		result = await this.findAll({ where: { idUser: username } });
		return result;
	};

	Filter.getFilterInfo = async function getFilterInfo(idFilter){
		filterInfo = await this.sequelize.query(
			'SELECT * FROM "Filters" WHERE "Filters"."id" = (:idFilter)',
			{
				replacements: {idFilter: idFilter},
				type: this.sequelize.QueryTypes.SELECT,
			}
		);
		return filterInfo;
	};

	return Filter;
};
