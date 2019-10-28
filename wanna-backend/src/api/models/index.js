/* eslint-disable prefer-destructuring */
const path = require('path');
const fs = require('fs');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('../../database/config.js')[env];

const db = {};
const basename = path.basename(__filename);

const {
	createFakeDataUsers,
} = require('../../database/factories/usersFactory');
const {
	createFakeDataPosts,
} = require('../../database/factories/postsFactory');
const {
	createFakeDataPhotos,
} = require('../../database/factories/photosFactory');
const {
	createFakeDataComments,
} = require('../../database/factories/commentsFactory');
const {
	createFakeDataCategories,
} = require('../../database/factories/categoriesFactory');

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

// sequelize.sync({ force: true });

// db.User.bulkCreate(createFakeDataUsers(sequelize, 10), { individualHooks: true });

async function getAPIData() {
	let payload;
	try {
		await sequelize.sync({ force: true });
		await db.User.bulkCreate(createFakeDataUsers(sequelize, 10), {
			individualHooks: true,
		});
		const posts = await createFakeDataPosts(db, sequelize, 10);
		await db.Post.bulkCreate(posts, {
			individualHooks: true,
		});
		const photos = await createFakeDataPhotos(db, sequelize, 10);
		await db.Photo.bulkCreate(photos, {
			individualHooks: true,
		});

		db.Comment.bulkCreate(createFakeDataComments(sequelize, 20), {
			individualHooks: true,
		});
		db.Category.bulkCreate(createFakeDataCategories(sequelize, 7), {
			individualHooks: true,
		});

	} catch(e) {
	  console.log(e);
	}
}

getAPIData();
module.exports = db;
