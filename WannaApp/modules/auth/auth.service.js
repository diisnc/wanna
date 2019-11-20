import { AsyncStorage } from 'react-native';
import { asyncError, generalError } from '../errors/error.service';
import * as AuthReducer from './auth.reducer';
import NavigationService from '../navigator';

// used on app startup
export const checkAuthStatus = () => async dispatch => {
	try {
		const authToken = await AsyncStorage.getItem('authToken');
		const refreshToken = await AsyncStorage.getItem('refreshToken');
		const username = await AsyncStorage.getItem('username');
		// token expirado para testes
		// const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InNlcmdpb3RqIiwiZW1haWwiOiJzdG9qOTdAZ21haWwuY29tIiwiaWF0IjoxNTczMzM1MTA0LCJleHAiOjE1NzMzMzg3MDR9.J68gM1wCqxAhgFJTuP1sIkgr7__8eWN_RFtjlgBIcrg';

		if (authToken != null && refreshToken != null && username != null) {
			dispatch(AuthReducer.setLoginSuccess(authToken, refreshToken, username));
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
		await AsyncStorage.removeItem('username');
		NavigationService.navigate('Wanna');
	} catch (error) {
		dispatch(asyncError(error));
	}
};
