const faker = require('faker');
const { User } = require('../../api/models');
const Sequelize = require('sequelize');
// eslint-disable-next-line no-unused-expressions
('use strict');

faker.locale = 'pt_BR';

exports.createFakePosts = async (db, sequelize, nr) => {
	var categories = ['Top', 'Blusa', 'Camisola', 'Camisa', 'T-Shirt', 'Calças', 'Calções', 'Sapatos', 'Acessórios'];
	var colors = ['Preto', 'Branco', 'Vermelho', 'Azul', 'Bege', 'Rosa'];
	var sizes = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'];

	const posts = [];

	// console.log(Sequelize);

	for (let i = 0; i < nr; i++) {
		const user = await db.User.findOne({
			order: sequelize.random(),
		});
		const post = {
			idUser: user.username,
			description: faker.name.jobDescriptor(),
			price: faker.random.number({ min: 3, max: 50 }),
			category: categories[Math.floor(Math.random() * categories.length)],
			color: colors[Math.floor(Math.random() * colors.length)],
			size: sizes[Math.floor(Math.random() * sizes.length)],
			isAvailable: faker.random.boolean(),
		};

		posts.push(post);
	}

	console.log('Foram criados ' + posts.length + ' posts.');
	return posts;
}

module.exports = this;
