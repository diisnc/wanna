module.exports = (sequelize, DataTypes) => {
	const UserMessage = sequelize.define('UserMessage', {
		messageText: {
			type: DataTypes.TEXT,
		},
		seenAt: {
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
	UserMessage.getMessages = async function(idContact, idUser, idPost) {
		result = await this.sequelize.query(
			'SELECT "UserMessages"."id", "UserMessages"."messageText" AS text, "UserMessages"."seenAt", "UserMessages"."createdAt", "UserMessages"."idSender" AS writer, "UserMessages"."idReceiver" FROM "UserMessages"' +
				' WHERE "UserMessages"."idPost" = (:idPost) AND ("UserMessages"."idSender" = (:idUser) AND "UserMessages"."idReceiver" = (:idContact)) OR ("UserMessages"."idSender" = (:idContact) AND "UserMessages"."idReceiver" = (:idUser))' +
				' ORDER BY "UserMessages"."createdAt"',
			{
				replacements: {
					idUser: idUser,
					idPost: idPost,
					idContact: idContact
				},
				type: this.sequelize.QueryTypes.SELECT,
			},
		);
		return result;
	};

	UserMessage.getContacts = async function(idUser) {
		result = await this.sequelize.query(
				'SELECT'+ 
				' t1."idSender",'+
				' t1."idReceiver",'+
				' t1."idPost",'+
				' MAX(t1."createdAt"),'+
				' "Photos"."photoType",'+ 
				' "Photos"."photoData"'+
				' FROM "UserMessages" t1'+
				' JOIN "Posts" ON "Posts"."id" = t1."idPost"'+
				' JOIN "Photos" ON "Photos"."idPost" = t1."idPost" AND "Photos"."id" IN (SELECT MIN("Photos"."id") FROM "Photos" GROUP BY "Photos"."idPost")'+
				' WHERE t1."idReceiver" = (:idUser)'+
        		' GROUP BY t1."idPost", t1."idSender", t1."idReceiver", "Photos"."photoType", "Photos"."photoData"',
		{
				replacements: {
					idUser: idUser,
				},
				type: this.sequelize.QueryTypes.SELECT,
			},
		);
		return result;
	};

	return UserMessage;
};
