/* eslint-disable prefer-destructuring */
const path = require('path');
const fs = require('fs');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('../../database/config.js')[env];

const db = {};
const basename = path.basename(__filename);

const { createFakeUsers } = require('../../database/factories/usersFactory');
const { createFakePosts } = require('../../database/factories/postsFactory');
const { createFakePhotos } = require('../../database/factories/photosFactory');
const { createFakeComments } = require('../../database/factories/commentsFactory');
const { createFakeFollowers } = require('../../database/factories/followersFactory');
const { createFakeLikes } = require('../../database/factories/likesFactory');

if (!config.password) {
	config.password = '';
}

const sequelize = new Sequelize(
	config.database,
	config.username,
	config.password,
	config,
);

sequelize
	.authenticate()
	.then(() => {
		console.log('Conexão com a DB Heroku estabelecida com sucesso.');
	})
	.catch(err => {
		console.error('Não foi possível conectar à DB Heroku:', err);
	});

fs.readdirSync(__dirname)
	.filter(
		file =>
			file.indexOf('.') !== 0 &&
			file !== basename &&
			file.slice(-3) === '.js',
	)
	.forEach(file => {
		const model = sequelize.import(path.join(__dirname, file));
		db[model.name] = model;
	});

Object.keys(db).forEach(modelName => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

async function createFakeData() {
	try {
		await sequelize.sync({ force: true });
		await db.User.bulkCreate(createFakeUsers(sequelize, 10), {
			individualHooks: true,
		});
		const posts = await createFakePosts(db, sequelize, 10);
		await db.Post.bulkCreate(posts, {
			individualHooks: true,
		});
		const photos = await createFakePhotos(db, sequelize, 10);
		await db.Photo.bulkCreate(photos, {
			individualHooks: true,
		});
		const comments = await createFakeComments(db, sequelize, 20);
		db.Comment.bulkCreate(comments, {
			individualHooks: true,
		});
		const followers = await createFakeFollowers(db, sequelize, 100);
		db.FollowRelationship.bulkCreate(followers, {
			individualHooks: true,
		});
		const likes = await createFakeLikes(db, sequelize, 100);
		db.UserPost.bulkCreate(likes, {
			individualHooks: true,
		});
	} catch (e) {
		console.log(e);
	}
}

createFakeData();
module.exports = db;
