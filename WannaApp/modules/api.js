import { handleTokenErrors } from './errors/error.service';

const config = { url: 'http://192.168.1.11:8000' };

export const CALL_API = 'Call API';
// import qs from "query-string";

const API_ROOT = '/api';
import { attemptTokenRefresh, logout } from './actions';

export const ourFetch = (route, methodA, bodyA) => {
	return fetch(`${config.url}${route}`, {
		method: methodA,
		body: JSON.stringify({ bodyA }),
		headers: { 'Content-Type': 'application/json' }
	})
		.then(response => response.text())
		.then(handleTokenErrors)
		.catch(error => {
			throw error;
		});
};

export const ourFetchWithToken = (action, next) => {
	const callAPI = action[CALL_API];
	if (typeof callAPI === 'undefined') {
		return next(action);
	}

	if (body) {
		body = JSON.stringify(body);
	}

	let querystring = '';
	if (query) {
		//querystring += "?" + qs.stringify(query);
	}

	headers['Content-Type'] = 'application/json';

	/*
	const token = store.getState().token.access_token;
	if (typeof token === "string") {
		headers.Authorization = `Bearer ${token}`;
	}
	*/

	console.log(endpoint);
	console.log(method);
	console.log(body);
	console.log(query);
	console.log(headers);

	let { endpoint, method, body, query, headers = {} } = callAPI;

	return fetch(`${config.url}${endpoint}${querystring}`, {
		method,
		body,
		headers,
		credentials: 'same-origin'
	})
		.then(response => response.text())
		.then(handleTokenErrors)
		.catch(error => {
			throw error;
		});
};
