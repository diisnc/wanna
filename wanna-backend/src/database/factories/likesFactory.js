const faker = require('faker');
// eslint-disable-next-line no-unused-expressions
('use strict');

faker.locale = 'pt_BR';

exports.createFakeLikes = async (db, sequelize, nr) => {
	const likes = [];
	var created = [];
	for (let i = 0; i < nr; i++) {
		const user = await db.User.findOne({
			order: sequelize.random(),
		});
		const post = await db.Post.findOne({
			order: sequelize.random(),
		});

		const pair = { username: user.username, post: post.id };

		if (
			created.some(
				el => (el.username == pair.username) & (el.post == pair.post),
			)
		) {
			console.log('Duplicado... Erro!!!');
			i = i - 1;
			continue;
		}
		const like = {
			user_id: user.username,
			post_id: post.id,
			likeTimeStamp: faker.date.recent(),
			type: faker.random.number({ max: 1, min: 0 }),
		};
		likes.push(like);
		created.push(pair);
	}
	console.log('Foram criados ' + nr + ' likes.');
	return likes;
};

module.exports = this;
