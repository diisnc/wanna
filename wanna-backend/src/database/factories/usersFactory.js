const faker = require('faker');
var request = require('request');
const { generateRefreshToken } = require('../../api/services/tokenGenerator');

// eslint-disable-next-line no-unused-expressions
('use strict');

faker.locale = 'pt_BR';

var doRequest = function() {
	var options = {
		url: 'https://placeimg.com/250/250/people',
		method: 'get',
		encoding: null,
		timeout: 5000,
	};

	console.log('Requesting image..');

	return new Promise((resolve, reject) => {
		request(options, function(error, response, body) {
			if (error) {
				console.error('error:', error);
				resolve(reject);
			} else {
				console.log('Image received..');
				resolve(body);
			}
		});
	});
};

exports.createFakeUsers = async (Sequelize, nr) => {
	const users = [];

	for (let i = 0; i < nr; i++) {
		await doRequest().then(function(value) {
			const userTemp = { username: faker.internet.userName() };
			const user = {
				username: userTemp.username,
				firstName: faker.name.firstName(),
				lastName: faker.name.lastName(),
				email: faker.internet.email(),
				password: faker.internet.password(),
				role: 'user',
				refreshToken: generateRefreshToken(userTemp),
				avatarData: value,
				avatarType: 'image/jpeg',
			};
			users.push(user);
		});
	}

	console.log('Foram criados ' + nr + ' utilizadores.');

	return users;
};

module.exports = this;
