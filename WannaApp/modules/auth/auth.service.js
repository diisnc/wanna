import { AsyncStorage } from 'react-native';
import { login, refreshToken, register } from './auth.api';
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

export const refreshTokenService = refreshTokenArg => async dispatch => {
	//ver os try depois e catch dispatch general error
	let response = await refreshToken(refreshTokenArg);
	// console.log('Resposta do refresh token: ' + response);
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
	/*
	.catch(error => {
		dispatch(generalError(error));
	});
	*/
};

// used on app startup
export const checkAuthStatus = () => async dispatch => {
	try {
		const authToken = await AsyncStorage.getItem('authToken');
		const refreshToken = await AsyncStorage.getItem('refreshToken');
		// token expirado para testes
		// const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InNlcmdpb3RqIiwiZW1haWwiOiJzdG9qOTdAZ21haWwuY29tIiwiaWF0IjoxNTczMzM1MTA0LCJleHAiOjE1NzMzMzg3MDR9.J68gM1wCqxAhgFJTuP1sIkgr7__8eWN_RFtjlgBIcrg';

		if (authToken != null && refreshToken != null) {
			dispatch(AuthReducer.setLoginSuccess(authToken, refreshToken));
			NavigationService.navigate('Main');
		} else dispatch(AuthReducer.setNoLogin());

		// return authToken;
	} catch (error) {
		console.log('erro crlhhh ' + error);
		dispatch(asyncError(error));
	}
};

export const logout = () => async dispatch => {
	console.log('Fez o logout');
	dispatch(AuthReducer.setLogout());
	try {
		await AsyncStorage.removeItem('authToken');
		NavigationService.navigate('Login');
	} catch (error) {
		dispatch(asyncError(error));
	}
};

export const registerService = (username, first, last, email, password) => async dispatch => {
	dispatch(AuthReducer.setAuthPending());
	let response = await register(username, first, last, email, password);
	let data = await response.json();
	if (response.status == 200) {
		dispatch(AuthReducer.setRegisterSuccess());
		NavigationService.navigate('Login');
	} else {
		data = JSON.stringify(data);
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

export const loginService = (email = 'stoj97@gmail.com', password = '123456') => async dispatch => {
	dispatch(AuthReducer.setAuthPending());
	let response = await login(email, password);
	let data = await response.json();
	if (response.status == 200) {
		dispatch(AuthReducer.setLoginSuccess(data.tokens.accessToken, data.tokens.refreshToken));
		await _saveItem('authToken', data.tokens.accessToken);
		await _saveItem('refreshToken', data.tokens.refreshToken);
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
