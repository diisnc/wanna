import { ourFetchAuth } from '../api';
import { AsyncStorage } from 'react-native';
import { asyncError, generalError } from '../errors/error.service';
import * as AuthReducer from './auth.reducer';
import NavigationService from '../navigator';

const _saveItem = async (item, selectedValue) => {
	try {
		await AsyncStorage.setItem(item, selectedValue);
	} catch (error) {
		throw error;
	}
};

export const login = (email, password) => async dispatch => {
	const config = {
		endpoint: '/v1/auth/login',
		method: 'POST',
		body: {
			email: email,
			password: password
		}
	};
	dispatch(AuthReducer.setAuthPending());
	let response = await ourFetchAuth(config);
	let data = await response.json();
	if (response.status == 200) {
		dispatch(
			AuthReducer.setLoginSuccess(
				data.tokens.accessToken,
				data.tokens.refreshToken,
				data.user.username
			)
		);
		await _saveItem('authToken', data.tokens.accessToken);
		await _saveItem('refreshToken', data.tokens.refreshToken);
		await _saveItem('username', data.user.username);
		NavigationService.navigate('Main');
	} else {
		data = JSON.stringify(data);
		let error = data.replace(/[\[\]"\{\}]+/g, '');
		// console.log('Está a despachar o erro: ' + error.errors);
		console.log('Error1 ' + error);
		dispatch(AuthReducer.setLoginError(error));
	}
	//dispatch(generalError(error));
};

export const register = (username, first, last, location, email, password) => async dispatch => {
	const config = {
		endpoint: '/v1/auth/register',
		method: 'POST',
		body: {
			username: username,
			firstName: first,
			lastName: last,
			email: email,
			password: password,
			location: location
		}
	};

	dispatch(AuthReducer.setAuthPending());
	let response = await ourFetchAuth(config);
	if (response.status == 200) {
		dispatch(AuthReducer.setRegisterSuccess());
		NavigationService.navigate('Login');
	} else {
		let data = await response.json();
		data = JSON.stringify(data.errors);
		let error = data.replace(/[\[\]"\{\}]+/g, '');
		// console.log('Está a despachar o erro: ' + error.errors);
		console.log('Error1 ' + error);
		dispatch(AuthReducer.setRegisterError(error));
	}
	/*
		.catch(error => {
			dispatch(generalError(error));
		});
	*/
};

export const logout = refreshToken => {
	const config = {
		endpoint: '/v1/auth/logout',
		method: 'POST',
		body: {
			refreshToken: refreshToken
		}
	};
	return ourFetchAuth(config);
};

export const refreshToken = refreshToken => async dispatch => {
	const config = {
		endpoint: '/v1/auth/refresh-token',
		method: 'POST',
		body: {
			refreshToken: refreshToken
		}
	};
	let response = await ourFetchAuth(config);
	let data = await response.json();
	// console.log('data do tokenservice: ' + data);
	if (response.status == 200) {
		dispatch(AuthReducer.saveAppToken(data.tokens.accessToken));
		_saveItem('refreshToken', data.tokens.refreshToken)
			.then(resp => {
				console.log('Refresh token refreshed');
			})
			.catch(error => {
				dispatch(asyncError(error));
			});
		_saveItem('authToken', data.tokens.accessToken)
			.then(resp => {
				console.log('Access token refreshed');
			})
			.catch(error => {
				dispatch(asyncError(error));
			});
	} else dispatch({ type: 'REFRESH_EXPIRED' });
};
