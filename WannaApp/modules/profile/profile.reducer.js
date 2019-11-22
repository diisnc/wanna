//Reducer
let initialState = {
	nrFollowings: 0,
	numPosts: null,
	votes: []
};

export const loadProfilePostsAC = (nrPosts, nrFollowings) => {
	return {
		type: 'LOADED_NR_POSTS',
		nrPosts,
		nrFollowings
	};
};

export const addPost = () => {
	return {
		type: 'ADD_POST'
	};
};

export const removePost = () => {
	return {
		type: 'REMOVE_POST'
	};
};

export const followAC = () => {
	return {
		type: 'FOLLOW'
	};
};

export const unfollowAC = () => {
	return {
		type: 'UNFOLLOW'
	};
};

export const like = idPost => {
	return {
		type: 'LIKE',
		idPost
	};
};

export const unLike = idPost => {
	return {
		type: 'UNLIKE',
		idPost
	};
};

export const disLike = idPost => {
	return {
		type: 'DISLIKE',
		idPost
	};
};

export const unDisLike = idPost => {
	return {
		type: 'UNDISLIKE',
		idPost
	};
};

export default function (state = initialState, action) {
	switch (action.type) {
		case 'LOADED_NR_POSTS':
			return {
				...state,
				numPosts: action.nrPosts,
				nrFollowings: action.nrFollowings
			};
		case 'LOADED_VOTES':
			var ids = new Set(action.votes.map(d => d.postID));
			var merged = [...action.votes, ...state.votes.filter(d => !ids.has(d.postID))];
			return {
				...state,
				votes: merged
			};
		case 'LIKE':
			state = { ...state };
			post = state.votes.find(x => x.postID === action.idPost);

			console.log('entra aqui');
			return {
				...state,
				votes: post.nrLikes++
			};
		case 'UNLIKE':
			state = { ...state };
			post = state.votes.find(x => x.postID === action.idPost);

			return {
				...state,
				votes: post.nrLikes--
			};
		case 'DISLIKE':
			state = { ...state };
			post = state.votes.find(x => x.postID === action.idPost);

			return {
				...state,
				votes: post.nrDislikes++
			};
		case 'UNDISLIKE':
			state = { ...state };
			post = state.votes.find(x => x.postID === action.idPost);

			return {
				...state,
				votes: post.nrDislikes--
			};
		case 'FOLLOW':
			state = { ...state };
			state.nrFollowings++;
			return state;
		case 'UNFOLLOW':
			state = { ...state };
			state.nrFollowings--;
			return state;
		case 'ADD_POST':
			state = { ...state };
			state.numPosts++;
			return state;
		case 'REMOVE_POST':
			state = { ...state };
			state.numPosts--;
			return state;
		default:
			return state;
	}
}
