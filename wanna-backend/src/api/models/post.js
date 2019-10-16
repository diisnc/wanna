/* eslint-disable no-param-reassign */
const bcrypt = require('bcryptjs');
const uuidv4 = require('uuid/v4');
const { omit } = require('lodash');
const mailer = require('../services/mailer');

module.exports = (sequelize, DataTypes) => {
	const Post = sequelize.define('Post', {
		description: {
			type: DataTypes.STRING,
			defaultValue: '',
		},
		price: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
		},
		isAvailable: {
			defaultValue: true,
			type: DataTypes.BOOLEAN,
		},
	});

	Post.associate = function(models) {
		Post.belongsToMany(models.User, {
			through: 'UserPost',
			as: 'users',
			foreignKey: 'post_id',
			onDelete: 'SET NULL',
			onUpdate: 'CASCADE',
		});
		Post.hasMany(models.Photo, {
			foreignKey: 'idPost',
			sourceKey: 'id',
			onDelete: 'SET NULL',
			onUpdate: 'CASCADE',
		});
	};

	// Post.sync({ force: true });

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
			const post = await this.save();
			return mailer(
				post.email,
				'Reset password email',
				'reset-password',
				{
					post,
				},
			);
		},
	};

	Post.prototype = Object.assign(Post.prototype, objectMethods);
	return Post;
};
