module.exports = (sequelize, DataTypes) => {
	const UserMessage = sequelize.define('UserMessage', {
		messageText: {
			type: DataTypes.TEXT,
        },
        seenAt : {
            type: DataTypes.DATE(),
        },
	});
	UserMessage.associate = function(models) {
		UserMessage.belongsTo(models.User, {
			foreignKey: 'sender',
			targetKey: 'username',
			onDelete: 'SET NULL',
			onUpdate: 'CASCADE',
		});
		UserMessage.belongsTo(models.User, {
			foreignKey: 'receiver',
			targetKey: 'username',
			onDelete: 'SET NULL',
			onUpdate: 'CASCADE',
		});
	};
	return UserMessage;
};

