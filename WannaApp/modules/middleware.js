import { logout, refreshTokenService } from './auth/auth.service';
import { api, setToken, setStore } from './api';

export const saveAuthToken = store => next => action => {
	if (action.type === 'SET_LOGIN_SUCCESS' || action.type === 'SAVE_APP_TOKEN') {
		// after a successful login, update the token in the API
		console.log('fez set ao token da api pelo handle da action: ' + action.type);
		setToken(action.authToken);
		// api.currentAuthToken = action.authToken;
	}
	// continue processing this action
	return next(action);
};

let buffer = [];

export const jwt = store => next => action => {
	buffer.push(action);

	if (action.type === 'INVALID_TOKEN') {
		console.log('Passou pelo middleware token inválido');
		let theStore = store.getState();
		if (theStore.auth && theStore.auth.authToken && theStore.auth.refreshToken) {
			if (!theStore.auth.pendingRefreshingToken) {
				store.dispatch({ type: 'REFRESHING_TOKEN' });
				store.dispatch(refreshTokenService(theStore.auth.refreshToken)).then(() => {
					store.dispatch({ type: 'TOKEN_REFRESHED' });
				});
			}
		}
	} else if (action.type === 'REFRESH_EXPIRED') {
		buffer = [];
		store.dispatch(logout());
	} else {
		if (buffer.length > 20) {
			//remove all items but keep the last 20 which forms the buffer
			buffer.splice(0, buffer.length - 20);
		}
		return next(action);
	}
};
