import { ourFetchWithToken } from '../api';
import { isAvailable } from 'expo/build/AR';

export const feed = nrPage => {
	const config = {
		endpoint: '/v1/post/feed',
		method: 'GET',
		query: {
			page: nrPage
		}
	};
	return ourFetchWithToken(config);
};

export const vote = (idPost, type) => {
	const config = {
		endpoint: '/v1/post/vote',
		method: 'POST',
		body: {
			idPost: idPost,
			type: type
		}
	};
	return ourFetchWithToken(config);
};

export const removeVote = (idPost, type) => {
	const config = {
		endpoint: '/v1/post/vote',
		method: 'DELETE',
		body: {
			idPost: idPost,
			type: type
		}
	};
	return ourFetchWithToken(config);
};

export const getComments = idPost => {
	const config = {
		endpoint: '/v1/post/getComments',
		method: 'POST',
		body: {
			idPost: idPost
		}
	};
	return ourFetchWithToken(config);
};

export const comment = (idPost, type) => {
	const config = {
		endpoint: '/v1/post/comment',
		method: 'POST',
		body: {
			idPost: idPost
		}
	};
	return ourFetchWithToken(config);
};

export const deleteComment = (idPost, type) => {
	const config = {
		endpoint: '/v1/post/deleteComment',
		method: 'POST',
		body: {
			idPost: idPost
		}
	};
	return ourFetchWithToken(config);
};

export const getPost = idPost => {
	const config = {
		endpoint: '/v1/post/',
		method: 'GET',
		params: {
			idPost: idPost
		}
	};
	return ourFetchWithToken(config);
};

export const markPost = (idPost, type) => {
	const config = {
		endpoint: '/v1/post/markUnavailable',
		method: 'POST',
		body: {
			idPost: idPost
		}
	};
	return ourFetchWithToken(config);
};

export const createPost = (genre, clothe, color, brand, size, price, images, description) => {
	const config = {
		endpoint: '/v1/post/createPost',
		method: 'POST',
		body: {
			genre: genre,
			description: description,
			price: price,
			category: clothe,
			color: color,
			brand: brand,
			imageData: images,
			size: size
		}
	};
	return ourFetchWithToken(config);
};

export const editPost = idPost => {
	const config = {
		endpoint: '/v1/post/editPost',
		method: 'POST',
		body: {
			idPost: idPost
		}
	};
	return ourFetchWithToken(config);
};

export const upperitemsCombine = () => {
	const config = {
		endpoint: '/v1/post/upperitems',
		method: 'GET'
	};
	return ourFetchWithToken(config);
};

export const loweritemsCombine = () => {
	const config = {
		endpoint: '/v1/post/loweritems',
		method: 'GET'
	};
	return ourFetchWithToken(config);
};
