import { AsyncStorage } from 'react-native';
import { login, refreshToken } from './auth.api';
import { asyncError, generalError } from '../errors/error.service';
import * as AuthReducer from './auth.reducer';
import NavigationService from '../navigator';
import { ourFetchWithToken, setToken, setStore } from '../api';

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
	console.log('Resposta do refresh token: ' + response);
	let data = await response.json();
	console.log('data do tokenservice: ' + data);
	if (response.status == 200) {
		dispatch(AuthReducer.saveAppToken(data.tokens.accessToken));
		await _saveItem('refreshToken', data.tokens.refreshToken);
		_saveItem('authToken', data.tokens.accessToken)
			.then(resp => {
				console.log('Refresh finished');
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
		// const authToken ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InNlcmdpb3RqIiwiZW1haWwiOiJzdG9qOTdAZ21haWwuY29tIiwiaWF0IjoxNTczMzM1MTA0LCJleHAiOjE1NzMzMzg3MDR9.J68gM1wCqxAhgFJTuP1sIkgr7__8eWN_RFtjlgBIcrg';

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

export const register = (first, last, email, password) => dispatch => {
	dispatch(AuthReducer.setAuthPending());
	return AuthApi.register(first, last, email, password)
		.then(response => {
			console.log(response);
			if (response.success) {
				dispatch(AuthReducer.setRegisterSuccess());
			} else {
				dispatch(AuthReducer.setRegisterError(response.message));
			}
		})
		.catch(error => {
			dispatch(generalError(error));
		});
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

//test function on the login and logged in areas to show the JWT is working
export const checkAuthTest = () => async dispatch => {
	try {
		const token = await AsyncStorage.getItem('authToken');
		return AuthApi.checkAuthTest(token)
			.then(response => {
				if (response.success) {
					console.log('Success: ', response.message);
				} else {
					console.log('Error: ', response);
				}
			})
			.catch(error => {
				dispatch(generalError(error));
			});
	} catch (error) {
		dispatch(asyncError(error));
	}
};