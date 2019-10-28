const faker = require('faker');
// eslint-disable-next-line no-unused-expressions
('use strict');

faker.locale = 'pt_BR';

exports.createFakeComments = async (db, sequelize, nr) => {
	const comments = [];
	for (let i = 0; i < nr; i++) {
		const user = await db.User.findOne({
			order: sequelize.random(),
		});

		const post = await db.Post.findOne({
			order: sequelize.random(),
		});

		const comment = {
			commentText: faker.lorem.paragraph(),
			idUser: user.username,
			idPost: post.id,
		};
		comments.push(comment);
	}
	console.log('Foram criados ' + nr + ' comments.');
	return comments;
};

module.exports = this;
