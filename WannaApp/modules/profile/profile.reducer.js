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

export const unlike = idPost => {
	return {
		type: 'UNLIKE',
		idPost
	};
};

export const dislike = idPost => {
	return {
		type: 'DISLIKE',
		idPost
	};
};

export const undislike = idPost => {
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
			return {
				...state,
				votes: [...state.votes, action.votes]
			};
		case 'LIKED':
			// make a copy of the existing array
			let likeVotes = state.votes.slice();
			// modify the COPY, not the original
			likeVotes[action.idPost] = 1;

			return {
				...state,
				votes: likeVotes
			};
		case 'UNLIKE':
			// make a copy of the existing array
			let unlikeVotes = state.votes.slice();
			// modify the COPY, not the original
			unlikeVotes.splice(action.idPost, 1);

			return {
				...state,
				votes: unlikeVotes
			};
		case 'DISLIKE':
			// make a copy of the existing array
			let dislikeVotes = state.votes.slice();
			// modify the COPY, not the original
			dislikeVotes[action.idPost] = -1;

			return {
				...state,
				votes: dislikeVotes
			};
		case 'UNDISLIKE':
			// make a copy of the existing array
			let undislikeVotes = state.votes.slice();
			// modify the COPY, not the original
			undislikeVotes.splice(action.idPost, 1);

			return {
				...state,
				votes: undislikeVotes
			};
		case 'FOLLOW':
			state = { ...state }; // copy the state to a new object
			state.nrFollowings++; // increment the new object
			return state;
		case 'UNFOLLOW':
			state = { ...state }; // copy the state to a new object
			state.nrFollowings--; // increment the new object
			return state;
		case 'ADD_POST':
			state = { ...state }; // copy the state to a new object
			state.numPosts++; // increment the new object
			return state;
		case 'REMOVE_POST':
			state = { ...state }; // copy the state to a new object
			state.numPosts--; // increment the new object
			return state;
		default:
			return state;
	}
}
