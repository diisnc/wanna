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
import error from './modules/errors/error.reducer';

const rootReducer = combineReducers({
	auth,
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

	componentDidMount() {
		this.checkAuth();
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
		console.log(this.props.checkAuthStatus);
	}

	render() {
		const { loggedIn } = this.props;

		// Vítor
		// if (loggedIn == null) {return <Login /> }
		// if (loggedIn) { return <Main /> }
		return <Main />
	}
}

function mapStateToProps(store, ownProps) {
	return {};
}
function mapDispatchToProps(dispatch) {
	return {
		checkAuthStatus: () => {
			dispatch(checkAuthStatus());
		}
	};
}

Entry = connect(null, mapDispatchToProps)(ConnectedComponent);

export default App;