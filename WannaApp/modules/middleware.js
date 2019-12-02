import { logout } from './auth/auth.service';
import { refreshToken } from './auth/auth.api';
import { setToken } from './api';
import NavigationService from './navigator';
import { Alert } from 'react-native';

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

export const nav = store => next => action => {
	if (action.type === 'ENTERED_CHAT') {
		NavigationService.navigate('Chat');
		return next(action);
	} else {
		return next(action);
	}
};

// passar o array, ir pelo array...
export const votesHandler = store => next => action => {
	if (action.type === 'LOADED_POSTS') {
		console.log('Carregou os likes dos posts do FEED!');
		let posts = action.posts;
		let votes = [];

		for (let i = 0; i < posts.length; i++) {
			vote = {
				postID: posts[i].id,
				voteType: posts[i].votetype,
				nrLikes: parseInt(posts[i].nrlikes, 10),
				nrDislikes: parseInt(posts[i].nrdislikes, 10),
				saved: parseInt(posts[i].saved, 10)
			};

			votes.push(vote);
		}
		store.dispatch({ type: 'LOADED_VOTES', votes: votes });
	} else if (action.type === 'LOADED_POST') {
		console.log('Carregou os likes dos post!');
		let posts = action.posts;
		let votes = [];
		vote = {
			postID: posts.postInfo.id,
			voteType: posts.postInfo.votetype,
			nrLikes: parseInt(posts.postInfo.nrlikes, 10),
			nrDislikes: parseInt(posts.postInfo.nrdislikes, 10),
			saved: parseInt(posts.postInfo.saved, 10)
		};

		votes.push(vote);

		store.dispatch({ type: 'LOADED_VOTES', votes: votes });
	} else {
		return next(action);
	}
};

export const errorHandler = store => next => action => {
	if (action.type === 'CONNECTION_ERROR') {
		Alert.alert('Falha na ligação ao servidor');
	}
	// continue processing this action
	return next(action);
};
