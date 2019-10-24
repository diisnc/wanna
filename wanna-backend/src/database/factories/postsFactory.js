const faker = require('faker');
// eslint-disable-next-line no-unused-expressions
('use strict');

faker.locale = 'pt_BR';

exports.createFakeDataPosts = (Sequelize, nr) => {
	const posts = [];
	var hisID = 200;

	for (let i = 0; i < nr; i++) {
		const post = {
			id: hisID,
			description: faker.name.jobDescriptor(),
			price: faker.commerce.price(),
			isAvailable: faker.random.boolean(),
		};

		hisID = hisID + 1;

		posts.push(post);
	}

	console.log('Foram criados ' + posts.length + ' posts.');
	return posts;
}

module.exports = this;
