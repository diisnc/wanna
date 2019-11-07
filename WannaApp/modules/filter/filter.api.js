import { ourFetchWithToken } from '../api';

export const getFilters = () => {
	const config = {
		endpoint: '/v1/filter/',
		method: 'GET'
	};
	return ourFetchWithToken(config);
};

export const createFilter = filter => {
	const config = {
		endpoint: '/v1/filter/createFilter',
		method: 'POST',
		body: {
			username: usernameToUnFollow
		}
	};
	return ourFetchWithToken(config);
};

export const searchByFilter = idFilter => {
	const config = {
		endpoint: '/v1/filter/searchByFilter',
		method: 'POST',
		body: {
			idFilter: idFilter
		}
	};
	return ourFetchWithToken(config);
};

export const deleteFilter = idFilter => {
	const config = {
		endpoint: '/v1/filter/deleteFilter',
		method: 'POST',
		body: {
			idFilter: idFilter
		}
	};
	return ourFetchWithToken(config);
};
