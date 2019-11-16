import { logout } from './auth/auth.service';
import { refreshToken } from './auth/auth.api';
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

export const jwt = store => next => action => {
	if (action.type === 'EXPIRED_TOKEN' || action.type === 'INVALID_TOKEN') {
		let theStore = store.getState();
		if (theStore.auth && theStore.auth.authToken && theStore.auth.refreshToken) {
			if (!theStore.auth.pendingRefreshingToken) {
				store.dispatch({ type: 'REFRESHING_TOKEN' });
				store.dispatch(refreshToken(theStore.auth.refreshToken)).then(() => {
					store.dispatch({ type: 'TOKEN_REFRESHED' });
				});
			}
		}
	} else if (action.type === 'REFRESH_EXPIRED') {
		store.dispatch(logout());
	} else {
		return next(action);
	}
};
