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
		console.log('será que está a pssar por aqui?');
		const authToken = await AsyncStorage.getItem('authToken');
		const refreshToken = await AsyncStorage.getItem('refreshToken');

		if (authToken != null && refreshToken != null) {
			dispatch(AuthReducer.setLoginSuccess(authToken, refreshToken));
		} else dispatch(AuthReducer.setNoLogin());

		console.log('oi?');
		// return authToken;
	} catch (error) {
		console.log('erro crlhhh');
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

export const loginService = (email, password) => dispatch => {
	dispatch(AuthReducer.setAuthPending());
	return login(email, password)
		.then(response => {
			response.json().then(data => {
				console.log(data);
			});
			if (response.success) {
				dispatch(AuthReducer.setLoginSuccess(response.authToken, response.refreshToken));
				_saveItem('authToken', response.authToken)
					.then(resp => {
						_saveItem('refreshToken', response.refreshToken)
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
				dispatch(AuthReducer.setLoginError(response.message));
			}
		})
		.catch(error => {
			console.log(error);
			//dispatch(generalError(error));
		});
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
