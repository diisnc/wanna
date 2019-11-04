import React, { Component } from 'react';
import thunk from 'redux-thunk'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { Provider } from 'react-redux'
import { connect } from "react-redux";
import { setAccessToken } from "redux-refresh-token";
import Main from './screens/Main'
import Login from './screens/Login'
import { checkAuthStatus } from './modules/auth/auth.service';
import { jwt } from './modules/middleware';
import logger from 'redux-logger';
import { reducer as formReducer } from 'redux-form';
import auth from './modules/auth/auth.reducer';
import permissions, { setCameraPermission, setCameraFolderPermission } from './modules/permissions/permissions.reducer';
import error from './modules/errors/error.reducer';
import * as Permissions from 'expo-permissions';
import { ourFetchWithToken } from './modules/api';
import { follow } from './modules/profile/profile.api';

const rootReducer = combineReducers({
	auth,
	permissions,
	error,
	form: formReducer
});

export const store = createStore(rootReducer, applyMiddleware(jwt, thunk, logger));

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Entry />
			</Provider>
		);
	}
}

class ConnectedComponent extends React.Component {

	constructor(props) {
		super(props);
		console.log('passou aqui');
		this.checkAuth = this.checkAuth.bind(this);
	}

	async componentDidMount() {
		this.checkAuth();
		// ourFetchWithToken('login');
		follow();
		this.cameraAccess();
		this.cameraRollAccess();
	}

	login() {
		console.log('tentou login');
		this.props.dispatch(login('sergio', 'jorge')).then(response => {
			this.props.dispatch(setAccessToken(response.payload));
			console.log('logged in')
		});
	}

	checkAuth() {
		console.log('tentou pre-login');
		this.props.checkAuthStatus();
	}

	render() {
		const loggedIn = this.props.loggedIn;
		console.log('estado do login: ' + loggedIn);
		// Vítor
		// if (loggedIn == null) {return <Login /> }
		// if (loggedIn) { return <Main /> }
		return <Main />
	}

	// aux for gallery permissions
	cameraRollAccess = async () => {
		const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)

		if (status === 'granted') {
			this.props.setCameraFolderPermission();
		}
	}

	// aux for camera permissions
	cameraAccess = async () => {
		const { status } = await Permissions.askAsync(Permissions.CAMERA)

		if (status === 'granted') {
			this.props.setCameraPermission();
		}
	}

}

function mapStateToProps(store) {
	return {
		loggedIn: store.auth.loggedIn,
		authToken: store.auth.authToken
	};
}

function mapDispatchToProps(dispatch) {
	return {
		checkAuthStatus: () => {
			dispatch(checkAuthStatus());
		},
		setCameraPermission: () => {
			dispatch(setCameraPermission());
		},
		setCameraFolderPermission: () => {
			dispatch(setCameraFolderPermission());
		}
	};
}

Entry = connect(mapStateToProps, mapDispatchToProps)(ConnectedComponent);

export default App;