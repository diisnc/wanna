import { ourFetchWithToken } from '../api';

export const feed = () => {
	const config = {
		endpoint: '/v1/post/feed',
		method: 'GET'
	};
	ourFetchWithToken(config);
};

export const like = (idPost, type) => {
	const config = {
		endpoint: '/v1/post/createUserPost',
		method: 'POST',
		body: {
			idPost: idPost
		}
	};
	ourFetchWithToken(config);
};

export const getComments = idPost => {
	const config = {
		endpoint: '/v1/post/getComments',
		method: 'POST',
		body: {
			idPost: idPost
		}
	};
	ourFetchWithToken(config);
};

export const comment = (idPost, type) => {
	const config = {
		endpoint: '/v1/post/comment',
		method: 'POST',
		body: {
			idPost: idPost
		}
	};
	ourFetchWithToken(config);
};

export const deleteComment = (idPost, type) => {
	const config = {
		endpoint: '/v1/post/deleteComment',
		method: 'POST',
		body: {
			idPost: idPost
		}
	};
	ourFetchWithToken(config);
};

export const markPost = (idPost, type) => {
	const config = {
		endpoint: '/v1/post/markUnavailable',
		method: 'POST',
		body: {
			idPost: idPost
		}
	};
	ourFetchWithToken(config);
};

export const createPost = post => {
	const config = {
		endpoint: '/v1/post/createPost',
		method: 'POST',
		body: {
			username: usernameToUnFollow
		}
	};
	ourFetchWithToken(config);
};

export const editPost = idPost => {
	const config = {
		endpoint: '/v1/post/editPost',
		method: 'POST',
		body: {
			idPost: idPost
		}
	};
	ourFetchWithToken(config);
};

export const deleteFilter = idFilter => {
	const config = {
		endpoint: '/v1/filter/deleteFilter',
		method: 'POST',
		body: {
			idFilter: idFilter
		}
	};
	ourFetchWithToken(config);
};
