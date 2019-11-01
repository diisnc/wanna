const faker = require('faker');
const { generateRefreshToken } = require('../../api/services/tokenGenerator');

// eslint-disable-next-line no-unused-expressions
('use strict');

faker.locale = 'pt_BR';

exports.createFakeUsers = (Sequelize, nr) => {
	const users = [];

	for (let i = 0; i < nr; i++) {
		const userTemp = { username: faker.internet.userName() };

		const user = {
			username: userTemp.username,
			firstName: faker.name.firstName(),
			lastName: faker.name.lastName(),
			email: faker.internet.email(),
			password: faker.internet.password(),
			role: 'user',
			refreshToken: generateRefreshToken(userTemp),
		};

		users.push(user);
	}

	console.log('Foram criados ' + nr + ' utilizadores.');

	return users;
};

module.exports = this;
