/* eslint-disable no-param-reassign */
const { omit } = require('lodash');

module.exports = (sequelize, DataTypes) => {
	const Post = sequelize.define('Post', {
		description: {
			type: DataTypes.STRING,
			defaultValue: '',
		},
		price: {
			type: DataTypes.DECIMAL(10, 2),
			defaultValue: 0,
		},
		category: {
			type: DataTypes.STRING,
			defaultValue: '',
			validate: {
				notEmpty: { msg: 'Category is required' },
			},
		},
		brand: {
			type: DataTypes.STRING,
			defaultValue: '',
			validate: {
				notEmpty: { msg: 'Brand is required' },
			},
		},
		genre: {
			type: DataTypes.STRING,
			defaultValue: '',
			validate: {
				notEmpty: { msg: 'Genre is required' },
			},
		},
		color: {
			type: DataTypes.STRING,
			defaultValue: '',
			validate: {
				notEmpty: { msg: 'Color is required' },
			},
		},
		size: {
			type: DataTypes.STRING,
			defaultValue: '',
			validate: {
				notEmpty: { msg: 'Size is required' },
			},
		},
		isAvailable: {
			allowNull: true,
			defaultValue: true,
			type: DataTypes.BOOLEAN,
		},
		status: {
			allowNull: true,
			type: DataTypes.INTEGER(),
			defaultValue: 0,
		},
	});

	Post.associate = function(models) {
		Post.belongsToMany(models.User, {
			through: 'SavedPost',
			as: 'usersavedposts',
			foreignKey: {
				name: 'post_id',
			},
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
		});
		Post.belongsToMany(models.User, {
			through: 'UserPost',
			as: 'users',
			foreignKey: {
				name: 'post_id',
			},
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
		});
		Post.hasMany(models.Photo, {
			foreignKey: 'idPost',
			sourceKey: 'id',
			onDelete: 'CASCADE',
			hooks: 'true',
			onUpdate: 'CASCADE',
		});
		Post.hasMany(models.Comment, {
			foreignKey: 'idPost',
			sourceKey: 'id',
			onDelete: 'CASCADE',
			hooks: 'true',
			onUpdate: 'CASCADE',
		});
		Post.hasMany(models.UserMessage, {
			foreignKey: 'idPost',
			sourceKey: 'id',
			onDelete: 'CASCADE',
			hooks: 'true',
			onUpdate: 'CASCADE',
		});
		Post.belongsTo(models.User, {
			foreignKey: 'idUser',
			targetKey: 'username',
			onDelete: 'SET NULL',
			onUpdate: 'CASCADE',
		});
	};

	/* TODO - cena pra alterar um post... alterar descrição, preço...
	/** Models Hooks
	Post.beforeSave(async post => {
		try {
			if (post._changed.email) {
				post.email = post.email.toLowerCase();
			}
			if (post._changed.password) {
				post.password = await bcrypt.hash(post.password, 10);
			}
			return post;
		} catch (error) {
			return sequelize.Promise.reject(error);
		}
	});

	*/

	/**
	 * Return feed
	 * @returns {Promise<*>}
	 */
	Post.feed = async function feed(pageArg, usernameArg) {
		result = await this.sequelize.query(
			'SELECT "Posts"."id", "Posts"."idUser", "Posts"."description",' +
				' "Posts"."isAvailable", "Posts"."color", "Posts"."size", "Posts"."category", "Posts"."brand", "Posts"."price", "Photos"."photoType", ' +
				' "Photos"."photoData", "Users"."avatarData", "Users"."location",' +
				' coalesce((SELECT type AS "voteType" FROM "UserPosts" WHERE "user_id" = :idUser AND "post_id" = "Posts"."id"), 0) AS voteType,' +
				' coalesce((SELECT count(type) AS "nrLikes" FROM "UserPosts" WHERE "post_id" = "Posts"."id" AND "type" = 1), 0) AS nrLikes,' +
				' coalesce((SELECT count(type) AS "nrDislikes" FROM "UserPosts" WHERE "post_id" = "Posts"."id" AND "type" = -1), 0) AS nrDislikes,' +
				' coalesce((SELECT count("SavedPosts"."createdAt") AS "saved" FROM "SavedPosts" WHERE "post_id" = "Posts"."id" AND "user_id" = :idUser), 0) AS saved' +
				' FROM "Posts" JOIN "Photos" ON "Posts"."id" ' +
				' = "Photos"."idPost" JOIN "Users" ON "Posts"."idUser" = "Users"."username" AND "Photos"."id" IN (SELECT MIN("Photos"."id") ' +
				' FROM "Photos" GROUP BY "Photos"."idPost") ' +
				' WHERE EXISTS (SELECT * FROM "FollowRelationships" ' +
				' WHERE "follower_id" = :idUser AND "Posts"."idUser"="followed_id") ' +
				' ORDER BY "Posts"."createdAt"' +
				' OFFSET :page1 ROWS' +
				' FETCH NEXT :page2 ROWS ONLY',
			{
				replacements: {
					idUser: usernameArg,
					page1: 5 * pageArg,
					page2: 5 * pageArg + 5,
				},
				type: this.sequelize.QueryTypes.SELECT,
			},
		);

		return result;
	};

	/**
	 * Returns post information and basic owner information
	 *
	 */

	Post.getPostInfo = async function getPostInfo(idPost, username) {
		object = new Object();

		userInfo = await this.sequelize.query(
			'SELECT "Users"."avatarType", "Users"."username", "Users"."avatarData" ' +
				'FROM "Users" JOIN "Posts" ON "Users"."username" = "Posts"."idUser"' +
				'WHERE "Posts"."id" = (:idPost)',
			{
				replacements: { idPost: idPost },
				type: this.sequelize.QueryTypes.SELECT,
			},
		);

		object['userInfo'] = userInfo[0];

		postInfo = await this.sequelize.query(
			'SELECT "Posts"."id", "Posts"."idUser","Posts"."category", "Posts"."color", "Posts"."description", "Posts"."isAvailable" ,"Posts"."price", "Posts"."size", ' +
				' coalesce((SELECT type AS "voteType" FROM "UserPosts" WHERE "user_id" = :idUser AND "post_id" = "Posts"."id"), 0) AS voteType,' +
				' coalesce((SELECT count(type) AS "nrLikes" FROM "UserPosts" WHERE "post_id" = "Posts"."id" AND "type" = 1), 0) AS nrLikes,' +
				' coalesce((SELECT count(type) AS "nrDislikes" FROM "UserPosts" WHERE "post_id" = "Posts"."id" AND "type" = -1), 0) AS nrDislikes,' +
				' coalesce((SELECT count("SavedPosts"."createdAt") AS "saved" FROM "SavedPosts" WHERE "post_id" = "Posts"."id" AND "user_id" = :idUser), 0) AS saved' +
				' FROM "Posts" WHERE "Posts"."id" = (:idPost)',
			{
				replacements: { idPost: idPost, idUser: username },
				type: this.sequelize.QueryTypes.SELECT,
			},
		);

		object['postInfo'] = postInfo[0];

		photos = await this.sequelize.query(
			'SELECT "Photos"."photoType", "Photos"."photoData" FROM "Photos" WHERE "idPost" = (:idPost)',
			{
				replacements: { idPost: idPost },
				type: this.sequelize.QueryTypes.SELECT,
			},
		);

		object['photos'] = photos;

		return object;
	};

	/*
	 *
	 * Returns all post comments and some information from the user that made the comment
	 */

	Post.getComments = async function getComments(idPost) {
		comments = await this.sequelize.query(
			'SELECT "Comments"."commentText", "Comments"."id", "Comments"."idUser", "Users"."avatarType","Users"."avatarData"' +
				'FROM "Comments"' +
				'JOIN "Posts" ON "Posts"."id" = "Comments"."idPost"' +
				'JOIN "Users" ON "Users"."username" = "Comments"."idUser"' +
				'WHERE "Posts"."id" = (:idPost)' +
				'ORDER BY "Comments"."createdAt"',
			{
				replacements: { idPost: idPost },
				type: this.sequelize.QueryTypes.SELECT,
			},
		);
		return comments;
	};

	/**
	 *
	 * Returns every post saved by a User
	 */

	Post.getSavedPosts = async function getSavedPosts(idUser) {
		list = await this.sequelize.query(
			'SELECT "SavedPosts"."user_id", "Posts"."idUser", "Posts"."id", "Posts"."category", "Posts"."color", "Posts"."description", "Posts"."isAvailable" ,"Posts"."price", "Posts"."size", "Photos"."photoData" ' +
				'FROM "Posts" JOIN "SavedPosts" ON "SavedPosts"."post_id" = "Posts"."id" ' +
				'JOIN "Photos" ON "Photos"."idPost" = "Posts"."id" AND "Photos"."id" IN (SELECT MIN("Photos"."id") ' +
				'FROM "Photos" GROUP BY "Photos"."idPost") ' +
				'WHERE "SavedPosts"."user_id" = (:idUser) ' +
				'ORDER BY "SavedPosts"."createdAt"',
			{
				replacements: { idUser: idUser },
				type: this.sequelize.QueryTypes.SELECT,
			},
		);
		return list;
	};

	Post.getFilteredPosts = async function getFilteredPosts(idUser) {

		body = await this.sequelize.query(
			'SELECT * FROM "Filters" WHERE "Filters"."idUser" = (:idUser)',
			{
				replacements: { idUser: idUser },
				type: this.sequelize.QueryTypes.SELECT,
			},
		);
		var sql = '';
		for (var i = 0; i < body.length; i++) {
			sql = sql.concat(' SELECT * FROM "Posts" JOIN "Photos" ON "Photos"."idPost" = "Posts"."id" AND "Photos"."id" IN (SELECT MIN("Photos"."id") FROM "Photos" GROUP BY "Photos"."idPost") WHERE ');
			if (body[i].category) {
				sql = sql.concat(
					' "category" = \'' + body[i].category + "' AND ",
				);
			}
			if (body[i].color) {
				sql = sql.concat(' "color" = \'' + body[i].color + "' AND ");
			}
			if (body[i].size) {
				sql = sql.concat(' "size" = \'' + body[i].size + "' AND ");
			}
			if (body[i].priceMin) {
				sql = sql.concat(' "price" >= ' + body[i].priceMin + ' AND ');
			}
			if (body[i].priceMax) {
				sql = sql.concat(' "price" <= ' + body[i].priceMax + ' AND ');
			}
			sql = sql.concat(' 1 = 1 ');
			if (i < body.length - 1) {
				sql = sql.concat(' UNION ');
			}
		}
		if (sql) {
			list = await this.sequelize.query(sql, {
				replacements: { idUser: idUser },
				type: this.sequelize.QueryTypes.SELECT,
			});
			return list;
		} else {
			return '';
		}
	};


	/*
	 *
	 * Returns items that according to the category should be displayed in the upper side of the body
	 */

	Post.getUpperItems = async function getUpperItems(){
		result = await this.sequelize.query(
			'SELECT "Posts"."id", "Posts"."category", "Posts"."price", "Photos"."photoType", "Photos"."photoData"'+
			' FROM "Posts" JOIN "Photos" ON "Posts"."id" = "Photos"."idPost"'+
			' AND "Photos"."id" IN (SELECT MIN("Photos"."id") FROM "Photos" GROUP BY "Photos"."idPost")'+
			' WHERE "Posts"."category" = (:Top) OR'+
					'"Posts"."category" = (:Blusa) OR'+
					'"Posts"."category" = (:Camisola) OR'+
					'"Posts"."category" = (:Camisa) OR'+
					'"Posts"."category" = (:TShirt)',
			{
				replacements: {
								Top: 'Top',
								Blusa: 'Blusa',
								Camisola: 'Camisola',
								Camisa: 'Camisa',
								TShirt: 'T-Shirt',
							  },
				type: this.sequelize.QueryTypes.SELECT,
			},
		);
		return result;
	};


	/*
	 *
	 *  Returns items that according to the category should be displayed in the lower side of the body
	 */

	Post.getLowerItems = async function getLowerItems(){
		result = await this.sequelize.query(
			'SELECT "Posts"."id", "Posts"."category", "Posts"."price", "Photos"."photoType", "Photos"."photoData"'+
			' FROM "Posts" JOIN "Photos" ON "Posts"."id" = "Photos"."idPost"'+
			' AND "Photos"."id" IN (SELECT MIN("Photos"."id") FROM "Photos" GROUP BY "Photos"."idPost")'+
			' WHERE "Posts"."category" = (:Calcas) OR'+
					'"Posts"."category" = (:Calcoes) OR'+
					'"Posts"."category" = (:Sapatos)',
			{
				replacements: {
								Calcas: 'Calças',
								Calcoes: 'Calções',
								Sapatos: 'Sapatos',
							  },
				type: this.sequelize.QueryTypes.SELECT,
			},
		);
		return result;
	};

	/** Object methods */
	const objectMethods = {
		/**
		 * Prepare object to serialization
		 * @returns {Object}
		 */
		transform() {
			return omit(this.get({ plain: true }), [
				'password',
				'refreshToken',
				'resetToken',
			]);
		},
	};

	Post.prototype = Object.assign(Post.prototype, objectMethods);
	return Post;
};
