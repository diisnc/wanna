/* eslint-disable import/no-extraneous-dependencies */
import React, { Component } from 'react';
import thunk from 'redux-thunk';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';
import Main from './screens/Main';
import Login from './screens/Login';
import Wanna from './screens/Wanna';
import Register from './screens/Register';
import Loading from './screens/Loading';
import { checkAuthStatus } from './modules/auth/auth.service';
import { jwt, saveAuthToken, nav, votesHandler } from './modules/middleware';
import logger from 'redux-logger';
import { reducer as formReducer } from 'redux-form';
import auth from './modules/auth/auth.reducer';
import profile from './modules/profile/profile.reducer';
import permissions, {
	setCameraPermission,
	setCameraFolderPermission
} from './modules/permissions/permissions.reducer';
import error from './modules/errors/error.reducer';
import chat from './modules/chat/chat.reducer';
import * as Permissions from 'expo-permissions';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import NavigatorService from './modules/navigator';

const rootReducer = combineReducers({
	chat,
	auth,
	profile,
	permissions,
	error,
	form: formReducer
});

// export const store = createStore(rootReducer, applyMiddleware(saveAuthToken, jwt, thunk, logger));
export const store = createStore(
	rootReducer,
	applyMiddleware(saveAuthToken, jwt, nav, votesHandler, thunk)
);

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Entry />
			</Provider>
		);
	}
}

const AppStackNav = createSwitchNavigator({
	Loading: {
		screen: Loading,
		navigationOptions: {
			header: null
		}
	},
	Wanna: {
		screen: Wanna,
		navigationOptions: {
			header: null
		}
	},
	Login: {
		screen: Login,
		navigationOptions: {
			header: null
		}
	},
	Main: {
		screen: Main,
		navigationOptions: {
			header: null
		}
	},
	Register: {
		screen: Register,
		navigationOptions: {
			header: null
		}
	}
});

const Navigator = createAppContainer(AppStackNav);

class ConnectedComponent extends React.Component {
	constructor(props) {
		super(props);
		this.props.checkAuthStatus();
		// this.checkAuth = this.checkAuth.bind(this);
	}

	async componentDidMount() {
		// follow();
		this.cameraAccess();
		this.cameraRollAccess();
	}

	render() {
		const loggedIn = this.props.loggedIn;
		console.log('estado do login: ' + loggedIn);
		return (
			<Navigator
				ref={navigatorRef => {
					NavigatorService.setTopLevelNavigator(navigatorRef);
				}}
			/>
		);
	}

	// aux for gallery permissions
	cameraRollAccess = async () => {
		const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

		if (status === 'granted') {
			this.props.setCameraFolderPermission();
		}
	};

	// aux for camera permissions
	cameraAccess = async () => {
		const { status } = await Permissions.askAsync(Permissions.CAMERA);

		if (status === 'granted') {
			this.props.setCameraPermission();
		}
	};
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

Entry = connect(
	mapStateToProps,
	mapDispatchToProps
)(ConnectedComponent);

export default App;
