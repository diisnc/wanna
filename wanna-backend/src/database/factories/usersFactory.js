const faker = require('faker');
const { generateRefreshToken } = require('../../api/services/tokenGenerator');

// eslint-disable-next-line no-unused-expressions
('use strict');

faker.locale = 'pt_BR';

exports.createFakeDataUsers = (Sequelize, nr) => {
	const users = [];

	var hisID = 200;

	for (let i = 0; i < nr; i++) {
		const userTemp = { id: hisID };

		const user = {
			username: faker.internet.userName(),
			firstName: faker.name.firstName(),
			lastName: faker.name.lastName(),
			email: faker.internet.email(),
			password: faker.internet.password(),
			role: 'user',
			refreshToken: generateRefreshToken(userTemp),
		};

		hisID = hisID + 1;
		users.push(user);
	}

	console.log('Foram criados ' + nr + ' utilizadores.');

	return users;
};

module.exports = this;
