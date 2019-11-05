import { ourFetchWithToken } from '../api';

export const follow = usernameToFollow => {
	const config = {
		endpoint: '/v1/profile/follow/',
		method: 'POST',
		query: {
			username: usernameToFollow
		}
	};
	ourFetchWithToken(config);
};

export const unfollow = usernameToUnfollow => {
	const config = {
		endpoint: '/v1/profile/unfollow/',
		method: 'POST',
		query: {
			username: usernameToUnFollow
		}
	};
	ourFetchWithToken(config);
};

export const getWishlist = () => {
	const config = {
		endpoint: '/v1/profile/wishlist',
		method: 'GET'
	};
	ourFetchWithToken(config);
};

export const getFollowers = () => {
	const config = {
		endpoint: '/v1/profile/followers',
		method: 'GET'
	};
	ourFetchWithToken(config);
};

export const getFollowings = () => {
	const config = {
		endpoint: '/v1/profile/followings',
		method: 'GET'
	};
	ourFetchWithToken(config);
};

export const getMyProfile = () => {
	const config = {
		endpoint: '/v1/profile/',
		method: 'GET'
	};
	ourFetchWithToken(config);
};

export const getUserProfile = userID => {
	const config = {
		endpoint: '/v1/profile/',
		method: 'GET',
		query: {
			username: userID
		}
	};
	ourFetchWithToken(config);
};

export const getBuyHistory = () => {
	const config = {
		endpoint: '/v1/profile/buyHistory',
		method: 'GET'
	};
	ourFetchWithToken(config);
};

export const getSalesHistory = () => {
	const config = {
		endpoint: '/v1/profile/salesHistory',
		method: 'GET'
	};
	ourFetchWithToken(config);
};
