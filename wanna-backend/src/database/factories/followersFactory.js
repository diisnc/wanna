const faker = require('faker');
// eslint-disable-next-line no-unused-expressions
('use strict');

faker.locale = 'pt_BR';

exports.createFakeFollowers = async (db, sequelize, nr) => {
	const followers = [];
	var created = [];
	for (let i = 0; i < nr; i++) {
		const user1 = await db.User.findOne({
			order: sequelize.random(),
		});

		const user2 = await db.User.findOne({
			order: sequelize.random(),
		});

		const pair = { user1: user1.username, user2: user2.username };

		if (
			created.some(
				el => (el.user1 == pair.user1) & (el.user2 == pair.user2),
			)
		) {
			console.log('Duplicado... Erro!!!');
			i = i - 1;
			continue;
		}

		const followerRelationship = {
			followed_id: user1.username,
			follower_id: user2.username,
		};
		followers.push(followerRelationship);
		created.push(pair);
	}
	console.log('Foram criados ' + nr + ' followers.');
	return followers;
};

module.exports = this;
