const faker = require('faker');
var request = require('request');
const { generateRefreshToken } = require('../../api/services/tokenGenerator');
var cloudinary = require('cloudinary').v2;

cloudinary.config({
	cloud_name: 'dc7hjsttf',
	api_key: '336844426425166',
	api_secret: '2TZg-Y8fDx6EtXZL2vJv61Ymvnk',
});

// eslint-disable-next-line no-unused-expressions
('use strict');

faker.locale = 'pt_BR';

var doRequest = function () {
	var options = {
		url: 'https://loremflickr.com/320/240/people,face/all',
		method: 'get',
		encoding: null,
		timeout: 5000,
	};

	console.log('Requesting image..');

	return new Promise((resolve, reject) => {
		request(options, function (error, response, body) {
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
		const userTemp = { username: faker.internet.userName() };
		value = await doRequest();
		photoData = Buffer.from(value).toString('base64');
		var uploadStr = 'data:image/jpeg;base64,' + photoData;

		let result;
		try {
			result = await cloudinary.uploader.upload(uploadStr);
		} catch (e) {
			return next(e);
		}

		const user = {
			username: userTemp.username,
			firstName: faker.name.firstName(),
			lastName: faker.name.lastName(),
			email: faker.internet.email(),
			password: faker.internet.password(),
			role: 'user',
			refreshToken: generateRefreshToken(userTemp),
			avatarData: result.url,
			avatarType: 'image/jpeg',
			location: faker.address.city(),
		};
		users.push(user);
	}

	console.log('Foram criados ' + nr + ' utilizadores.');

	return users;
};

module.exports = this;
