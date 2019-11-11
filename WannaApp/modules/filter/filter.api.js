import { ourFetchWithToken } from '../api';

export const getFilters = () => {
	const config = {
		endpoint: '/v1/filter/',
		method: 'GET'
	};
	return ourFetchWithToken(config);
};

export const createFilter = (
	selectedGenre,
	selectedClothe,
	selectedColor,
	selectedSize,
	selectedMinPrice,
	selectedMaxPrice
) => {
	const config = {
		endpoint: '/v1/filter/createFilter',
		method: 'POST',
		body: {
			category: selectedClothe,
			priceMin: selectedMinPrice,
			priceMax: selectedMaxPrice,
			size: selectedSize,
			color: selectedColor
		}
	};
	return ourFetchWithToken(config);
};

export const searchByFilter = idFilter => {
	const config = {
		endpoint: '/v1/filter/searchByFilter',
		method: 'POST',
		body: {
			idFilter: idFilter
		}
	};
	return ourFetchWithToken(config);
};

export const deleteFilter = idFilter => {
	const config = {
		endpoint: '/v1/filter/deleteFilter',
		method: 'POST',
		body: {
			idFilter: idFilter
		}
	};
	return ourFetchWithToken(config);
};
