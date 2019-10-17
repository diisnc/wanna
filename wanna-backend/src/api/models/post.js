/* eslint-disable no-param-reassign */
const { omit } = require('lodash');

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
		Post.hasMany(models.Comment, {
			foreignKey: 'idPost',
			sourceKey: 'id',
			onDelete: 'SET NULL',
			onUpdate: 'CASCADE',
		});
		Post.hasMany(models.Category, {
			foreignKey: 'idPost',
			sourceKey: 'id',
			onDelete: 'SET NULL',
			onUpdate: 'CASCADE',
		});
		Post.belongsTo(models.User, {
			foreignKey: 'idUser',
			targetKey: 'id',
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
