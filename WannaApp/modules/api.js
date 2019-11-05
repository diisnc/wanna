import { handleTokenErrors } from './errors/error.service';

const config = { url: 'http://192.168.1.5:8000' };

let currentAuthToken = null;

export function setToken(token) {
	currentAuthToken = token;
}

export const ourFetchAuth = async action => {
	method = action.method;
	endpoint = action.endpoint;

	let body = JSON.stringify(action.body);

	const headers = {
		'Content-Type': 'application/json'
	};

	console.log(endpoint);
	console.log(method);
	console.log(body);
	console.log(headers);

	return await fetch(`${config.url}${endpoint}`, {
		method,
		body,
		headers,
		credentials: 'same-origin'
	});
};

function getQueryString(params) {
	var esc = encodeURIComponent;
	return Object.keys(params)
		.map(k => esc(k) + '=' + esc(params[k]))
		.join('&');
}

export const ourFetchWithToken = action => {
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
