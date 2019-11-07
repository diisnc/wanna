import { ourFetchAuth } from '../api';

export const login = (email, password) => {
	const config = {
		endpoint: '/v1/auth/login',
		method: 'POST',
		body: {
			email: email,
			password: password
		}
	};
	return ourFetchAuth(config);
};

export const register = (username, firstName, lastName, email, password) => {
	const config = {
		endpoint: '/v1/auth/register',
		method: 'POST',
		body: {
			username: username,
			firstName: firstName,
			lastName: lastName,
			email: email,
			password: password
		}
	};
	ourFetchAuth(config);
};

export const logout = refreshToken => {
	const config = {
		endpoint: '/v1/auth/logout',
		method: 'POST',
		body: {
			refreshToken: refreshToken
		}
	};
	ourFetchAuth(config);
};

export const refreshToken = refreshToken => {
	const config = {
		endpoint: '/v1/auth/refresh-token',
		method: 'POST',
		body: {
			refreshToken: refreshToken
		}
	};
	return ourFetchAuth(config);
};
