import { AsyncStorage } from 'react-native';
import { login } from './auth.api';
import { asyncError, generalError } from '../errors/error.service';
import * as AuthReducer from './auth.reducer';
import App from '../../app';

const _saveItem = async (item, selectedValue) => {
	try {
		await AsyncStorage.setItem(item, selectedValue);
	} catch (error) {
		throw error;
	}
};

export const refreshToken = refreshToken => dispatch => {
	return AuthApi.refreshToken(refreshToken)
		.then(response => {
			if (response.success) {
				dispatch(AuthReducer.saveAppToken(response.authToken));
				_saveItem('authToken', response.authToken)
					.then(resp => {
						console.log('Refresh finished');
					})
					.catch(error => {
						dispatch(asyncError(error));
					});
			}
		})
		.catch(error => {
			dispatch(generalError(error));
		});
};

// used on app startup
export const checkAuthStatus = () => async dispatch => {
	try {
		const authToken = await AsyncStorage.getItem('authToken');
		const refreshToken = await AsyncStorage.getItem('refreshToken');

		if (authToken != null && refreshToken != null) {
			dispatch(AuthReducer.setLoginSuccess(authToken, refreshToken));
		} else dispatch(AuthReducer.setNoLogin());

		// return authToken;
	} catch (error) {
		console.log('erro crlhhh ' + error);
		dispatch(asyncError(error));
	}
};

export const logout = () => async dispatch => {
	dispatch(AuthReducer.setLogout());
	try {
		await AsyncStorage.removeItem('authToken');
		App.startApp();
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
		console.log(data);
		dispatch(AuthReducer.setLoginSuccess(data.tokens.accessToken, data.tokens.refreshToken));
		console.log('Token: ' + data.tokens.accessToken);
		_saveItem('authToken', data.tokens.accessToken)
			.then(resp => {
				_saveItem('refreshToken', data.tokens.refreshToken)
					.then(resp => {
						App.startAppLoggedIn();
					})
					.catch(error => {
						dispatch(asyncError(error));
					});
			})
			.catch(error => {
				dispatch(asyncError(error));
			});
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
