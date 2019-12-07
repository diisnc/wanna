//Reducer
let initialState = {
	nrFollowings: 0,
	numPosts: null,
	votes: [],
	numFilters: null,
	pendingEditProfile: false
};

export const loadProfilePostsAC = (nrPosts, nrFollowings) => {
	return {
		type: 'LOADED_NR_POSTS',
		nrPosts,
		nrFollowings
	};
};

export const loadFilters = number => {
	return {
		type: 'LOAD_NR_FILTERS',
		number
	};
};

export const editProfile = () => {
	return {
		type: 'EDIT_PROFILE'
	};
};

export const notEditProfile = () => {
	return {
		type: 'NOT_EDIT_PROFILE'
	};
};

export const addPost = () => {
	return {
		type: 'ADD_POST'
	};
};

export const addFilter = () => {
	return {
		type: 'ADD_FILTER'
	};
};

export const removePost = () => {
	return {
		type: 'REMOVE_POST'
	};
};

export const removeFilter = () => {
	return {
		type: 'REMOVE_FILTER'
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

export const save = idPost => {
	return {
		type: 'SAVE',
		idPost
	};
};

export const unsave = idPost => {
	return {
		type: 'UNSAVE',
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
		case 'LOAD_NR_FILTERS':
			return {
				...state,
				numFilters: action.number
			};
		case 'EDIT_PROFILE':
			state = { ...state };
			state.pendingEditProfile = true;
			return state;
		case 'NOT_EDIT_PROFILE':
			state = { ...state };
			state.pendingEditProfile = false;
			return state;
		case 'ADD_FILTER':
			state = { ...state };
			state.numFilters++;
			return state;
		case 'REMOVE_FILTER':
			state = { ...state };
			state.numFilters--;
			return state;
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
		case 'SAVE':
			return {
				...state,
				votes: state.votes.map(x => (x.postID === action.idPost ? { ...x, saved: 1 } : x))
			};
		case 'UNSAVE':
			return {
				...state,
				votes: state.votes.map(x => (x.postID === action.idPost ? { ...x, saved: 0 } : x))
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
