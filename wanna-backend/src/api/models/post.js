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
			foreignKey:{
				name: 'post_id',
			},
			onDelete: 'SET NULL',
			onUpdate: 'CASCADE',
		});
		Post.belongsToMany(models.User, {
			through: 'UserPost',
			as: 'users',
			foreignKey:{
				name: 'post_id',
			},
			onDelete: 'SET NULL',
			onUpdate: 'CASCADE',
		});
		Post.hasMany(models.Photo, {
			foreignKey: 'idPost',
			sourceKey: 'id',
			onDelete: 'SET_NULL',
			onUpdate: 'CASCADE',
		});
		Post.hasMany(models.Comment, {
			foreignKey: 'idPost',
			sourceKey: 'id',
			onDelete: 'SET_NULL',
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
	Post.feed = async function feed() {
		result = await this.sequelize.query(
			'SELECT "Posts"."id", "Posts"."idUser", "Posts"."description", "Posts"."isAvailable", "Posts"."price", "Photos"."photoType", "Photos"."photoData" FROM "Posts" JOIN "Photos" ON "Posts"."id" = "Photos"."idPost" AND "Photos"."id" IN (SELECT MAX("Photos"."id") FROM "Photos" GROUP BY "Photos"."idPost") ORDER BY "Posts"."createdAt"',
			{
				type: this.sequelize.QueryTypes.SELECT,
			},
		);

		return result;
	};

	/**
	 * Returns post information and basic owner information
	 *
	 */

	Post.getPostInfo = async function getPostInfo(idPost){
		userinfo = await this.sequelize.query(
			'SELECT "Users"."avatarType", "Users"."firstName", "Users"."lastName", "Users"."avatarData"'+
		    'FROM "Users" JOIN "Posts" ON "Users"."username" = "Posts"."idUser"'+
			'WHERE "Posts"."id" = (:idPost)',
			{
				replacements: {idPost: idPost},
				type: this.sequelize.QueryTypes.SELECT,
			}
		);
		postinfo = await this.sequelize.query(
			'SELECT "Posts"."idUser","Posts"."category", "Posts"."color", "Posts"."description", "Posts"."isAvailable" ,"Posts"."price", "Posts"."size", "UserPosts"."type" AS VOTETYPE, COUNT("UserPosts"."type") AS NRVOTES'+
			'FROM "Posts"  JOIN "UserPosts" ON "Posts"."id" = "UserPosts"."post_id" WHERE "Posts"."id" = (:idPost)'+
			'GROUP BY "Posts"."idUser","Posts"."category", "Posts"."color", "Posts"."description", "Posts"."isAvailable" ,"Posts"."price", "Posts"."size", "UserPosts"."type"',
			{
				replacements: {idPost: idPost},
				type: this.sequelize.QueryTypes.SELECT,
			},
		);
		photos = await this.sequelize.query(
			'SELECT "Photos"."photoType", "Photos"."photoData" FROM "Photos" WHERE "idPost" = (:idPost)',
			{
				replacements: {idPost: idPost},
				type: this.sequelize.QueryTypes.SELECT,
			}
		);


		return userinfo.concat(postinfo.concat(photos));
	};

	/*
	*
	* Returns all post comments and some information from the user that made the comment
	*/

	Post.getComments = async function getComments(idPost){

		comments = await this.sequelize.query(
			'SELECT "Comments"."commentText", "Comments"."id", "Comments"."idUser", "Users"."avatarType","Users"."avatarData"'+
			'FROM "Comments"'+
			'JOIN "Posts" ON "Posts"."id" = "Comments"."idPost"'+
			'JOIN "Users" ON "Users"."username" = "Comments"."idUser"'+
			'WHERE "Posts"."id" = (:idPost)'+
			'ORDER BY "Comments"."createdAt"',
			{
				replacements: {idPost: idPost},
				type: this.sequelize.QueryTypes.SELECT,
			}
		);
		return comments;
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
