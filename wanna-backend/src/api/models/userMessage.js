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
	

	/**
	 * 
	 * Returns previous messages in chat
	 */
	UserMessage.getMessages = async function (idUser, idPost){
		result = await this.sequelize.query(
			'SELECT "UserMessages"."messageText", "UserMessages"."seenAt", "UserMessages"."createdAt" FROM "UserMessages"'+
			' WHERE "UserMessages"."idPost" = (:idPost) AND ("UserMessages"."idSender" = (:idUser) OR "UserMessages"."idReceiver" = (:idUser))'+
			' ORDER BY "UserMessages"."createdAt"',
			{
				replacements: {
					idUser: idUser,
					idPost: idPost,
				},
				type: this.sequelize.QueryTypes.SELECT,
			},
		);

	};

	return UserMessage;
};

