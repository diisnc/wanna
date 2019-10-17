const faker = require('faker');

// eslint-disable-next-line no-unused-expressions
('use strict');

module.exports = {
	up: (queryInterface, Sequelize) => {
		const users = [];

		for (let i = 0; i < 10; i++) {
			users.push({
				firstName: faker.name.firstName(),
				lastName: faker.name.lastName(),
				email: faker.internet.email(),
				password: faker.internet.password(),
				role: 'user',
				createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
				updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
			});
		}
		return queryInterface.bulkInsert('Users', users);
	},

	down: queryInterface => queryInterface.bulkDelete('Users', null, {}),
};
