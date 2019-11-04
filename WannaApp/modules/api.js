import { handleTokenErrors } from './errors/error.service';

const config = { url: 'http://192.168.1.11:8000' };

let currentAuthToken = null;

export function setToken(token) {
	currentAuthToken = token;
}

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

function getQueryString(params) {
	var esc = encodeURIComponent;
	return Object.keys(params)
		.map(k => esc(k) + '=' + esc(params[k]))
		.join('&');
}

export const ourFetchWithToken = store => next => action => {
	method = action.method;
	endpoint = action.endpoint;

	let body = JSON.stringify(action.body);

	let querystring = '';
	if (action.query) {
		querystring = '?' + getQueryString(action.query);
	}
	//const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
	const headers = {
		'Content-Type': 'application/json',
		Authorization: 'Bearer ${this.currentAuthToken}'
	};

	console.log(endpoint);
	console.log(method);
	console.log(body);
	console.log(querystring);
	console.log(headers);

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
