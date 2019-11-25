import { handleTokenErrors } from './errors/error.service';
import { showError, connectionError } from './errors/error.reducer';
import { store } from '../App';
import { logout } from './auth/auth.service';

const config = { url: 'http://192.168.1.5:8000' };

var currentAuthToken;

export function setToken(token) {
	this.currentAuthToken = token;
	console.log('Bearer ' + token);
}

async function auxFetch(method, endpoint, querystring, paramsA, bodyA, headers) {
	let body;
	if (bodyA != null) {
		body = JSON.stringify(bodyA);
	}

	if (headers.Authorization) {
		// console.log(headers.Authorization);
	}

	let params = '';
	for (var key in paramsA) {
		params += paramsA[key];
	}

	let string;
	if (querystring != '' && querystring != null) {
		string = `${config.url}${endpoint}${querystring}`;
	} else if (params != '' && params != null) {
		string = `${config.url}${endpoint}${params}`;
	} else string = `${config.url}${endpoint}`;

	console.log('QS ' + string);
	let response;
	try {
		response = await fetch(string, {
			method,
			body,
			headers,
			credentials: 'same-origin'
		}).catch(err => {
			if (err == 'TypeError: Network request failed') {
				throw new Error();
			}
		});
	} catch (e) {
		console.log('ERRO NA LIGAÇÃO.');
		return null;
	}

	return response;
}

export const ourFetchAuth = async action => {
	const headers = {
		'Content-Type': 'application/json'
	};

	response = await auxFetch(action.method, action.endpoint, null, null, action.body, headers);
	if (response == null) {
		store.dispatch(connectionError('Network request failed'));
		return;
	}
	return response;
};

function getQueryString(params) {
	var esc = encodeURIComponent;
	return Object.keys(params)
		.map(k => esc(k) + '=' + esc(params[k]))
		.join('&');
}

export const ourFetchWithToken = async action => {
	let querystring = '';
	if (action.query) {
		querystring = '?' + getQueryString(action.query);
	}
	//const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
	const headers = {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${this.currentAuthToken}`
	};

	response = await auxFetch(
		action.method,
		action.endpoint,
		querystring,
		action.params,
		action.body,
		headers
	);

	if (response == null) {
		store.dispatch(connectionError('Network request failed'));
		return;
	}

	if (response.status == 200 || response.status == 304) {
		if (action.method == 'GET') {
			let data = await response.json();
			return data;
		} else return 'OK';
	} else {
		let data = await response.json();

		if (data == 'Token is expired') {
			return store.dispatch({ type: 'EXPIRED_TOKEN' });
		}

		if (data == 'Invalid token') {
			return store.dispatch({ type: 'INVALID_TOKEN' });
		}

		if (response.status == 403 || response.status == 401) {
			store.dispatch(logout());
		}

		data = JSON.stringify(data);
		let error = data.replace(/[\[\]"\{\}]+/g, '');

		store.dispatch(showError(error));
		return null;
	}
};
