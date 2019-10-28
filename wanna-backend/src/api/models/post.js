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
			'SELECT "Posts"."id", "Posts"."idUser", "Posts"."description", "Posts"."isAvailable", "Posts"."price", "Photos"."photoType", "Photos"."photoData" FROM "Posts" JOIN "Photos" ON "Posts"."id" = "Photos"."idPost" ORDER BY "Posts"."createdAt"',
			{
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
