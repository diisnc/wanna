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
			foreignKey: 'idSender',
			targetKey: 'username',
			onDelete: 'SET NULL',
			onUpdate: 'CASCADE',
		});
		UserMessage.belongsTo(models.User, {
			foreignKey: 'idReceiver',
			targetKey: 'username',
			onDelete: 'SET NULL',
			onUpdate: 'CASCADE',
		});
		UserMessage.belongsTo(models.Post, {
			foreignKey: 'idPost',
			targetKey: 'id',
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
		});
	};
	return UserMessage;
};

