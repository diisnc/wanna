import { ourFetchWithToken } from '../api';
import { isAvailable } from 'expo/build/AR';

export const getContacts = () => {
	const config = {
		endpoint: '/v1/chat',
		method: 'GET'
	};
	return ourFetchWithToken(config);
};

export const getMessages = (idContact, idPost) => {
	console.log("Entrei no método para fazer o pedido à API"+idContact+idPost);
	const config = {
		endpoint: '/v1/chat/previous-messages/',
		method: 'GET',
		query: {
			idContact: idContact,
			idPost: idPost
		}
	};
	return ourFetchWithToken(config);
};
