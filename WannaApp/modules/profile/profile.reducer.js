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

export default function(state = initialState, action) {
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
			return {
				...state,
				votes: state.votes.map(x =>
					x.postID === action.idPost ? { ...x, voteType: 1, nrLikes: x.nrLikes + 1 } : x
				)
			};
		case 'UNLIKE':
			return {
				...state,
				votes: state.votes.map(x =>
					x.postID === action.idPost ? { ...x, voteType: 0, nrLikes: x.nrLikes - 1 } : x
				)
			};
		case 'DISLIKE':
			return {
				...state,
				votes: state.votes.map(x =>
					x.postID === action.idPost
						? { ...x, voteType: -1, nrDislikes: x.nrDislikes + 1 }
						: x
				)
			};
		case 'UNDISLIKE':
			return {
				...state,
				votes: state.votes.map(x =>
					x.postID === action.idPost
						? { ...x, voteType: 0, nrDislikes: x.nrDislikes - 1 }
						: x
				)
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
