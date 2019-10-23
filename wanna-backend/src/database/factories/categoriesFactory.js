const faker = require('faker');
// eslint-disable-next-line no-unused-expressions
('use strict');

faker.locale = 'pt_BR';

exports.createFakeDataCategories = (Sequelize, nr) => {
	const categories = [];
	var hisID = 200;
	for (let i = 0; i < nr; i++) {
		const category = {
			id: hisID,
			name: faker.random.word()
		};
		hisID = hisID + 1;
		categories.push(category);
	}
	console.log('Foram criados ' + nr + ' categories.');
	return categories;
};

module.exports = this;
