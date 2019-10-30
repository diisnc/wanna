module.exports = (sequelize, DataTypes) => {
	const FollowRelationship = sequelize.define('FollowRelationship', {
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
	return FollowRelationship;
};
