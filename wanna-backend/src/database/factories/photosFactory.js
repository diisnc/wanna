const faker = require('faker');
var request = require('request');
// eslint-disable-next-line no-unused-expressions
('use strict');
var cloudinary = require('cloudinary').v2;

cloudinary.config({
	cloud_name: 'dc7hjsttf',
	api_key: '336844426425166',
	api_secret: '2TZg-Y8fDx6EtXZL2vJv61Ymvnk',
});

faker.locale = 'pt_BR';

var doRequest = function () {
	var options = {
		url: 'https://loremflickr.com/320/240/clothes,fashion/all',
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

exports.createFakePhotos = async (db, sequelize, nr) => {
	const photos = [];

	for (let i = 0; i < nr; i++) {
		const nrImages = Math.floor(Math.random() * (5 - 1) + 1);

		for (var j = 0; j < nrImages; j++) {
			value = await doRequest();
			photoData = Buffer.from(value).toString('base64');
			var uploadStr = 'data:image/jpeg;base64,' + photoData;

			let result;
			try {
				result = await cloudinary.uploader.upload(uploadStr);
			} catch (e) {
				return next(e);
			}
			const photo = {
				photoData: result.url,
				photoType: 'image/jpeg',
				idPost: i + 1,
			};
			photos.push(photo);
		}
	}

	console.log('Foram criados ' + photos.length + ' fotos.');
	return photos;
};

module.exports = this;
