import { ourFetchWithToken } from '../api';
import { isAvailable } from 'expo/build/AR';


export const getContacts = () => {
	const config = {
		endpoint: '/v1/chat',
		method: 'GET'
	};
	return ourFetchWithToken(config);
};


