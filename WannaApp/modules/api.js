import { handleTokenErrors } from './errors/error.service';
import { store } from "../App";

const config = { url: 'http://192.168.1.5:8000' };

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
	console.log(method);
	console.log(headers);
	// console.log(body);
	// console.log(querystring);
	// console.log(headers);

	console.log('Oi');

	let response = await fetch(`${config.url}${endpoint}${querystring}`, {
		method,
		body,
		headers,
		credentials: 'same-origin'
	});

	// console.log(response);
	let data = await response.json();
	if (data.status == 200) {
		return data;
	} else {
		data = JSON.stringify(data);
		let error = data.replace(/[\[\]"\{\}]+/g, '');
		// console.log('Está a despachar o erro: ' + error.errors);
		store.dispatch({ type: 'INVALID_TOKEN' });
		return data;
		console.log('Error1 ' + error);
		// dispatch(AuthReducer.setLoginError(error));
	}
};
