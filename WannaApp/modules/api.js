import { handleTokenErrors } from './errors/error.service';
import { showError } from './errors/error.reducer';
import { store } from '../App';

const config = { url: 'http://192.168.1.8:8000' };

var currentAuthToken;

export function setToken(token) {
	this.currentAuthToken = token;
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

export const ourFetchWithToken = async action => {
	console.log('fetching');
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
		Authorization: `Bearer ${this.currentAuthToken}`
	};

	console.log(endpoint + ' ' + method);
	console.log(headers.Authorization);

	let response = await fetch(`${config.url}${endpoint}${querystring}`, {
		method,
		body,
		headers,
		credentials: 'same-origin'
	});

	// console.log(response);
	let data = await response.json();
	// console.log(data);
	// console.log('data que retorna do feed: ' + data);
	if (response.status == 200 || response.status == 304) {
		console.log('Tamanho do que retornou do backend: ' + data.length);
		return data;
	} else {
		console.log('erro');
		data = JSON.stringify(data);
		let error = data.replace(/[\[\]"\{\}]+/g, '');

		if (error.message === 'Token is expired') {
			return store.dispatch({ type: 'EXPIRED_TOKEN' });
		}

		if (error.message === 'Invalid token') {
			return store.dispatch({ type: 'INVALID_TOKEN' });
		}

		if (response == 'TypeError: Network request failed') {
			return store.dispatch(connectionError('Network request failed'));
		}

		store.dispatch(showError(error));
		return error;
	}
};
