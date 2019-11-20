//Reducer
let initialState = {
	avatarContact: null,
	contact: null,
	messages: [],
	idPost: null
};

export const enteringOnChat = (contact, avatarContact, idPost) => {
	console.log('entrou no chat');
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
	console.log('Entrou na put');
	console.log('Ação ' + action.type);
	switch (action.type) {
		case 'ENTERED_CHAT':
			console.log('oi');
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
