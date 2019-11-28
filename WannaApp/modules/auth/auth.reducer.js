// Actions
export const setAuthPending = () => {
	return {
		type: 'SET_AUTH_PENDING'
	};
};
export const setNoLogin = () => {
	return {
		type: 'SET_NO_LOGIN'
	};
};
export const setLoginSuccess = (authToken, refreshToken, username) => {
	return {
		type: 'SET_LOGIN_SUCCESS',
		authToken,
		refreshToken,
		username
	};
};
export const setLoginError = loginError => {
	return {
		type: 'SET_LOGIN_ERROR',
		loginError
	};
};
export const setRegisterSuccess = () => {
	return {
		type: 'SET_REGISTER_SUCCESS'
	};
};
export const setRegisterError = regError => {
	return {
		type: 'SET_REGISTER_ERROR',
		regError
	};
};
export const setLogout = () => {
	return {
		type: 'SET_LOGOUT'
	};
};
export const saveAppToken = (authToken, refreshToken) => {
	return {
		type: 'SAVE_APP_TOKEN',
		authToken,
		refreshToken
	};
};
//Reducer
let initialState = {
	authPending: false,
	loggedIn: false,
	registered: false,
	loginError: false,
	regError: false,
	authToken: null,
	refreshToken: null,
	tokenIsValid: false,
	pendingRefreshingToken: null,
	loggedUsername: null
};

export default function (state = initialState, action) {
	switch (action.type) {
		case 'SET_AUTH_PENDING':
			return {
				...state,
				authPending: true
			};
		case 'SET_NO_LOGIN':
			return {
				...state,
				loggedIn: false
			};
		case 'SET_LOGIN_SUCCESS':
			return {
				...state,
				authPending: false,
				tokenIsValid: true,
				loggedIn: true,
				loginError: false,
				authToken: action.authToken,
				refreshToken: action.refreshToken,
				loggedUsername: action.username
			};
		case 'SET_LOGIN_ERROR':
			return {
				...state,
				authPending: false,
				loggedIn: false,
				loginError: action.loginError
			};
		case 'SET_REGISTER_SUCCESS':
			return {
				...state,
				authPending: false,
				regError: false,
				registered: true
			};
		case 'SET_REGISTER_ERROR':
			return {
				...state,
				authPending: false,
				regError: action.regError
			};
		case 'SET_LOGOUT':
			return {
				...state,
				authToken: null,
				refreshToken: null,
				loggedIn: false,
				loggedUsername: null
			};
		case 'INVALID_TOKEN':
			return {
				...state,
				tokenIsValid: false
			};
		case 'EXPIRED_TOKEN':
			return {
				...state,
				tokenIsValid: false
			};
		case 'REFRESHING_TOKEN':
			return {
				...state,
				pendingRefreshingToken: true,
				tokenIsValid: false
			};
		case 'TOKEN_REFRESHED':
			return {
				...state,
				pendingRefreshingToken: null,
				tokenIsValid: true
			};
		case 'REFRESH_EXPIRED':
			return {
				...state,
				pendingRefreshingToken: null,
				tokenIsValid: false
			};
		case 'SAVE_APP_TOKEN':
			return {
				...state,
				authToken: action.authToken,
				refreshToken: action.refreshToken
			};

		default:
			return state;
	}
}
