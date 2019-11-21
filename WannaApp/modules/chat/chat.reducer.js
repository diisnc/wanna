//Reducer
let initialState = {
	avatarContact: null,
	contact: null,
	messages: [],
	idPost: null
};

export const enteringOnChat = (contact, avatarContact, idPost) => {
	return {
		type: 'ENTERED_CHAT',
		contact,
		avatarContact,
		idPost
	};
};

export const newMessages = messages => {
	return {
		type: 'NEW_MESSAGES',
		messages: messages
	};
};

export default function(state = initialState, action) {
	switch (action.type) {
		case 'ENTERED_CHAT':
			return {
				...state,
				avatarContact: action.avatarContact,
				contact: action.contact,
				idPost: action.idPost,
				messages: null
			};
		case 'NEW_MESSAGES':
			return {
				...state,
				messages: [...state.messages, ...action.messages]
			};
		default:
			return state;
	}
}
