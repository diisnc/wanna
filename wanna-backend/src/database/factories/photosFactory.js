const faker = require('faker');
var request = require('request'),
	fs = require('fs');

const http = require('http');
// eslint-disable-next-line no-unused-expressions
('use strict');

faker.locale = 'pt_BR';

var doRequest = function() {
	var options = {
		url: 'http://loremflickr.com/150/150/clothes',
		method: 'get',
		encoding: null,
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

exports.createFakePhotos = async (db, sequelize, nr) => {
	const photos = [];

	for (let i = 0; i < nr; i++) {
		const nrImages = Math.floor(Math.random() * (5 - 1) + 1);

		const post = await db.Post.findOne({
			order: sequelize.random(),
		});

		for (var j = 0; j < nrImages; j++) {
			await doRequest().then(function(value) {
				const photo = {
					photoData: value,
					photoType: 'image/jpeg',
					idPost: post.id,
				};
				photos.push(photo);
			});
		}
	}

	console.log('Foram criados ' + photos.length + ' fotos.');
	return photos;
};

module.exports = this;
