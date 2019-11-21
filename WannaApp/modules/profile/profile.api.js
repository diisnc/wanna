import { ourFetchWithToken } from '../api';

export const follow = usernameToFollow => {
	const config = {
		endpoint: '/v1/profile/follow/',
		method: 'POST',
		params: {
			username: usernameToFollow
		}
	};
	return ourFetchWithToken(config);
};

export const unfollow = usernameToUnfollow => {
	const config = {
		endpoint: '/v1/profile/unfollow/',
		method: 'POST',
		params: {
			username: usernameToUnfollow
		}
	};
	return ourFetchWithToken(config);
};

export const getWishlist = () => {
	const config = {
		endpoint: '/v1/profile/wishlist',
		method: 'GET'
	};
	return ourFetchWithToken(config);
};

export const getFollowers = () => {
	const config = {
		endpoint: '/v1/profile/followers',
		method: 'GET'
	};
	return ourFetchWithToken(config);
};

export const getFollowings = () => {
	const config = {
		endpoint: '/v1/profile/followings',
		method: 'GET'
	};
	return ourFetchWithToken(config);
};

export const getMyProfile = () => {
	const config = {
		endpoint: '/v1/profile/',
		method: 'GET'
	};
	return ourFetchWithToken(config);
};

export const getUserProfile = userID => {
	const config = {
		endpoint: '/v1/profile/',
		method: 'GET',
		query: {
			username: userID
		}
	};
	return ourFetchWithToken(config);
};

export const getBuyHistory = () => {
	const config = {
		endpoint: '/v1/profile/buyHistory',
		method: 'GET'
	};
	return ourFetchWithToken(config);
};

export const getSalesHistory = () => {
	const config = {
		endpoint: '/v1/profile/salesHistory',
		method: 'GET'
	};
	return ourFetchWithToken(config);
};
