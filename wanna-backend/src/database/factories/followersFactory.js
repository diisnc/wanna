const faker = require('faker');
// eslint-disable-next-line no-unused-expressions
('use strict');

faker.locale = 'pt_BR';

exports.createFakeFollowers = async (db, sequelize, nr) => {
	const followers = [];
	for (let i = 0; i < nr; i++) {
		const user1 = await db.User.findOne({
			order: sequelize.random()
		});

		const user2 = await db.User.findOne({
			order: sequelize.random()
		});

		const followerRelationship = {
			followed_id: user1.username,
			follower_id: user2.username
		};
		followers.push(followerRelationship);
	}
	console.log('Foram criados ' + nr + ' followers.');
	return followers;
};

module.exports = this;
