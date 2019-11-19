/* eslint-disable no-param-reassign */
const bcrypt = require('bcryptjs');
const moment = require('moment-timezone');
const uuidv4 = require('uuid/v4');
const { omit } = require('lodash');
const mailer = require('../services/mailer');

module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define('User', {
		username: {
			type: DataTypes.STRING,
			primaryKey: true,
			defaultValue: '',
			unique: { msg: 'Username already exists' },
			validate: {
				notEmpty: { msg: 'Username is required' },
			},
		},
		firstName: {
			type: DataTypes.STRING,
			defaultValue: '',
			validate: {
				notEmpty: { msg: 'First Name is required' },
			},
		},
		lastName: {
			type: DataTypes.STRING,
			defaultValue: '',
			validate: {
				notEmpty: { msg: 'Last Name is required' },
			},
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: '',
			unique: { msg: 'Email already exists' },
			validate: {
				notEmpty: { msg: 'Email is required' },
				isEmail: { msg: 'Email is not valid' },
			},
		},
		location: {
			type: DataTypes.STRING,
			defaultValue: '',
			validate: {
				notEmpty: { msg: 'Location is required' },
			},
		},
		password: {
			type: DataTypes.STRING,
			defaultValue: '',
			validate: {
				notEmpty: { msg: 'Password is required' },
				len: {
					args: [6],
					msg: 'Password should be more then 6 chars',
				},
			},
		},
		services: {
			type: DataTypes.JSONB,
			defaultValue: 'local',
		},
		role: {
			type: DataTypes.ENUM(['user', 'admin']),
			defaultValue: 'user',
		},
		refreshToken: DataTypes.JSONB,
		resetToken: {
			type: DataTypes.STRING,
			unique: true,
		},
		isActive: {
			defaultValue: true,
			type: DataTypes.BOOLEAN,
		},
		rating: {
			defaultValue: 3.0,
			type: DataTypes.DECIMAL(10, 1),
		},
		avatarData: {
			type: DataTypes.BLOB(),
			allowNull: true,
			defaultValue: null,
		},
		avatarType: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: null,
		},
	});

	/** Models Hooks */
	User.beforeSave(async user => {
		try {
			if (user._changed.email) {
				user.email = user.email.toLowerCase();
			}
			if (user._changed.password) {
				user.password = await bcrypt.hash(user.password, 10);
			}
			return user;
		} catch (error) {
			return sequelize.Promise.reject(error);
		}
	});

	User.associate = function (models) {
		User.belongsToMany(models.Post, {
			through: 'SavedPost',
			as: 'savedposts',
			foreignKey: {
				name: 'user_id',
			},
			onDelete: 'SET NULL',
			onUpdate: 'CASCADE',
		});
		User.belongsToMany(models.Post, {
			through: 'UserPost',
			as: 'posts',
			foreignKey: {
				name: 'user_id',
			},
			onDelete: 'SET NULL',
			onUpdate: 'CASCADE',
		});
		User.belongsToMany(models.User, {
			through: 'FollowRelationship',
			as: 'followed',
			foreignKey: 'followed_id',
			onDelete: 'SET NULL',
			onUpdate: 'CASCADE',
		});
		User.belongsToMany(models.User, {
			through: 'FollowRelationship',
			as: 'followers',
			foreignKey: 'follower_id',
			onDelete: 'SET NULL',
			onUpdate: 'CASCADE',
		});
		User.hasMany(models.Filter, {
			foreignKey: 'idUser',
			sourceKey: 'username',
			onDelete: 'SET NULL',
			onUpdate: 'CASCADE',
		});
		User.hasMany(models.Comment, {
			foreignKey: 'idUser',
			sourceKey: 'username',
			onDelete: 'SET NULL',
			onUpdate: 'CASCADE',
		});
		User.hasMany(models.UserMessage, {
			foreignKey: 'idSender',
			sourceKey: 'username',
			onDelete: 'SET NULL',
			onUpdate: 'CASCADE',
		});
		User.hasMany(models.UserMessage, {
			foreignKey: 'idReceiver',
			sourceKey: 'username',
			onDelete: 'SET NULL',
			onUpdate: 'CASCADE',
		});
	};

	/** Static methods */

	/**
	 * Find user by refresh token
	 * @param token
	 * @returns {Promise<*>}
	 */
	User.getByRefreshToken = async function getByRefreshToken(token) {
		const user = await this.findOne({
			where: { 'refreshToken.token': token },
		});
		return user && moment().isBefore(moment(user.refreshToken.expires))
			? user
			: false;
	};

	/**
	 * Return count of all users and rows with offset
	 * @param page
	 * @param limit
	 * @returns {Promise<*>}
	 */
	User.paginate = async function paginate(page = 1, limit = 10) {
		const offset = limit * (page - 1);
		const result = await this.findAndCountAll({ limit, offset });
		result.rows.map(user => user.transform());
		return result;
	};

	/**
	 * Return profile info
	 *
	 * and the last photo of each post
	 * @returns {Promise<*>}
	 */
	User.getProfileInfo = async function getProfileInfo(username) {
		object = new Object();
		profileInfo = await this.sequelize.query(
			'SELECT "avatarData","avatarType","firstName", "lastName", "username", "email", "rating" FROM "Users" WHERE "Users"."username" = (:username)',
			{
				replacements: { username: username },
				type: this.sequelize.QueryTypes.SELECT,
			},
		);

		object['info'] = profileInfo[0];

		nrFollowings = await this.sequelize.query(
			'SELECT count("follower_id") AS number FROM "FollowRelationships" WHERE "follower_id" = (:username)',
			{
				replacements: { username: username },
				type: this.sequelize.QueryTypes.SELECT,
			},
		);

		object['nrFollowings'] = nrFollowings[0];

		nrFollowers = await this.sequelize.query(
			'SELECT count("followed_id") AS number FROM "FollowRelationships" WHERE "followed_id" = (:username)',
			{
				replacements: { username: username },
				type: this.sequelize.QueryTypes.SELECT,
			},
		);

		object['nrFollowers'] = nrFollowers[0];

		postsInfo = await this.sequelize.query(
			'SELECT "Posts"."id" AS PostID, "Posts"."idUser", "Posts"."isAvailable", "Photos"."photoType", "Photos"."photoData", "Photos"."id" AS PhotoId ' +
				'FROM "Posts" JOIN "Photos" ON "Posts"."id" = "Photos"."idPost" ' +
				'AND "Photos"."id" IN (SELECT MIN("Photos"."id") FROM "Photos" GROUP BY "Photos"."idPost") ' +
				'WHERE "Posts"."idUser" = (:username) ' +
				'ORDER BY "Posts"."createdAt"',
			{
				replacements: { username: username },
				type: this.sequelize.QueryTypes.SELECT,
			},
		);

		object['posts'] = postsInfo;
		return object;
	};

	/**
	 * Return user profiles
	 * @returns {Promise<*>}
	 */
	User.getUsernames = async function getUsernames(usernameString) {
		result = await this.sequelize.query(
			'SELECT "username" FROM "Users" WHERE "Users"."username" LIKE :usernameLike',
			{
				replacements: { usernameLike: "%" + usernameString + "%" },
				type: this.sequelize.QueryTypes.SELECT,
			},
		);
		return result;
	};

	/**
	 * Return list of followings
	 * @returns {Promise<*>}
	 */
	User.getFollowings = async function getFollowings(username) {
		result = await this.sequelize.query(
			'SELECT "followed_id" FROM "FollowRelationships" where "follower_id" = :username',
			{
				replacements: { username: username },
				type: this.sequelize.QueryTypes.SELECT,
			},
		);
		return result;
	};

	/**
	 * Return list of followers
	 * @returns {Promise<*>}
	 */
	User.getFollowers = async function getFollowers(username) {
		result = await this.sequelize.query(
			'SELECT "follower_id" FROM "FollowRelationships" where "followed_id" = :username',
			{
				replacements: { username: username },
				type: this.sequelize.QueryTypes.SELECT,
			},
		);
		return result;
	};

	User.oAuthLogin = async function oAuthLogin({
		service,
		id,
		email,
		firstName,
		lastName,
	}) {
		const user = await this.findOne({
			where: [{ [`services.${service}`]: id }, { email }],
		});
		if (user) {
			user.services[service] = id;
			if (!user.firstName) user.firstName = firstName;
			if (!user.lastName) user.lastName = lastName;
			return user.save();
		}
		const password = uuidv4();
		return this.create({
			services: { [service]: id },
			email,
			password,
			firstName,
			lastName,
		});
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

		/**
		 * Compare hashed passwords
		 * @param password
		 * @returns {Promise}
		 */
		async verifyPassword(password) {
			return bcrypt.compare(password, this.password);
		},

		/**
		 * Create reset password token and send email
		 * @returns {Promise}
		 */
		async resetPassword() {
			this.resetToken = uuidv4();
			const user = await this.save();
			return mailer(
				user.email,
				'Reset password email',
				'reset-password',
				{
					user,
				},
			);
		},
	};

	User.prototype = Object.assign(User.prototype, objectMethods);
	return User;
};
