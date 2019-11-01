import { handleTokenErrors } from '../errors/error.service';

const config = { url: 'http://192.168.1.11:8000'};

class AuthApi {
	static login(email, password) {
		console.log(config.url);
		console.log('cenas');
		return fetch(`${config.url}/v1/auth/login`, {
			method: 'POST',
			body: JSON.stringify({ email: email, password: password }),
			headers: { "Content-Type": "application/json" },
		})
			.then(response => response.text())
			.then(handleTokenErrors)
			.catch(error => {
				throw error;
			});
	}
	static register(first, last, email, password) {
		return fetch(`${config.url}/api/auth/signup`, {
			method: 'POST',
			body: JSON.stringify({ first, last, email, password }),
			headers: config.configHeaders
		})
			.then(response => response.json())
			.then(handleTokenErrors)
			.catch(error => {
				throw error;
			});
	}
	static refreshToken(refreshToken) {
		return fetch(`${config.url}/api/auth/refreshToken`, {
			method: 'POST',
			body: JSON.stringify({ refreshToken: refreshToken }),
			headers: config.configHeaders
		})
			.then(response => response.json())
			.then(handleTokenErrors)
			.catch(error => {
				throw error;
			});
	}
	static checkAuthTest(token) {
		return fetch(`${config.url}/api/auth/getAll`, {
			method: 'POST',
			headers: {
				...config.configHeaders,
				Authorization: 'Bearer ' + token
			}
		})
			.then(response => response.json())
			.then(handleTokenErrors)
			.catch(error => {
				throw error;
			});
	}
}
export default AuthApi;
