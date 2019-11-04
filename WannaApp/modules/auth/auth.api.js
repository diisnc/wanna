import { ourFetch, ourFetchWithToken  } from '../api';

class AuthApi {

	static login(email, password) {
		ourFetch('/v1/auth/login', 'POST', { email: email, password: password })
	}

	static logout(refreshToken) {
		ourFetch('/v1/auth/logout', 'POST', { refreshToken: refreshToken })
	}
	static register(username, firstName, lastName, email, password) {
		ourFetch('/v1/auth/register', 'POST', {
			username: username, firstName: firstName,
			lastName: lastName, email: email, password: password
		});
	}
	static refreshToken(refreshToken) {
		ourFetch('/v1/auth/refresh', 'POST', { refreshToken: refreshToken });
	}
	static checkAuthTest(token) {
		ourFetchWithToken('/v1/auth/test', 'GET', null);
	}
}
export default AuthApi;
