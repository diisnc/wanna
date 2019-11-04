import { ourFetchWithToken } from '../api';

export const follow = usernameToFollow => ({
	[CALL_API]: {
		endpoint: '/v1/profile/follow/${}',
		method: 'POST',
		body: {
			email: 'esben@esben.dk',
			password: '1234'
		}
	}
});

export const unfollow = usernameToUnfollow => ({
	[CALL_API]: {
		endpoint: '/v1/profile/unfollow/${}',
		method: 'POST'
	}
});

export const getWishlist = () => ({
	[CALL_API]: {
		endpoint: '/v1/profile/wishlist',
		method: 'POST'
	}
});

export const getFollowers = () => ({
	[CALL_API]: {
		endpoint: '/v1/profile/followers',
		method: 'POST'
	}
});

export const getFollowings = () => ({
	[CALL_API]: {
		endpoint: '/v1/profile/followings',
		method: 'POST'
	}
});

export const getMyProfile = () => ({
	[CALL_API]: {
		endpoint: '/v1/profile/',
		method: 'POST'
	}
});

export const getUserProfile = () => ({
	[CALL_API]: {
		endpoint: '/v1/profile/${}',
		method: 'POST'
	}
});

export const getBuyHistory = () => ({
	[CALL_API]: {
		endpoint: '/v1/profile/buyHistory',
		method: 'POST'
	}
});

export const getSalesHistory = () => ({
	[CALL_API]: {
		endpoint: '/v1/profile/salesHistory',
		method: 'POST'
	}
});
