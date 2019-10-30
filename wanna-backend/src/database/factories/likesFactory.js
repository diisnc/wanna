const faker = require('faker');
// eslint-disable-next-line no-unused-expressions
('use strict');

faker.locale = 'pt_BR';

exports.createFakeLikes = async (db, sequelize, nr) => {
	const likes = [];
	for (let i = 0; i < nr; i++) {
		const user = await db.User.findOne({
			order: sequelize.random(),
		});
		const post = await db.Post.findOne({
			order: sequelize.random(),
		});
		const like = {
			user_id: user.username,
			post_id: post.id,
			likeTimeStamp: faker.date.recent()
		};
		likes.push(like);
	}
	console.log('Foram criados ' + nr + ' likes.');
	return likes;
};

module.exports = this;
