const faker = require('faker');
// eslint-disable-next-line no-unused-expressions
('use strict');

faker.locale = 'pt_BR';

exports.createFakeComments = (Sequelize, nr) => {
	const comments = [];
	var hisID = 200;
	for (let i = 0; i < nr; i++) {
		const comment = {
			id: hisID,
			commentText: faker.random.words(),
		};
		hisID = hisID + 1;
		comments.push(comment);
	}
	console.log('Foram criados ' + nr + ' comments.');
	return comments;
};

module.exports = this;
