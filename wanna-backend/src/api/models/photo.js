const { omit } = require('lodash');

module.exports = (sequelize, DataTypes) => {
	const Photo = sequelize.define('Photo', {
		photoData: {
			type: DataTypes.BLOB(),
		},
		photoType: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	});

	Photo.associate = function (models) {
		Photo.belongsTo(models.Post, {
			foreignKey: 'idPost',
			targetKey: 'id',
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
		});
	};

	/** Object methods */
	const objectMethods = {
		/**
		 * Prepare object to serialization
		 * @returns {Object}
		 */
		transform() {
			return omit(this.get({ plain: true }), ['photoData']);
		},
	};

	Photo.prototype = Object.assign(Photo.prototype, objectMethods);

	return Photo;
};
