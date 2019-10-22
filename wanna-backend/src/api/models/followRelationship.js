module.exports = (sequelize, DataTypes) => {
	const followRelationship = sequelize.define('followRelationship', {
		followed_id: {
			type: DataTypes.INTEGER(),
			primaryKey: true,
			references: { model: 'User', key: 'id' },
		},
		follower_id: {
			type: DataTypes.INTEGER(),
			primaryKey: true,
			references: { model: 'User', key: 'id' },
		},
	});
	return followRelationship;
};
