import axios from 'axios';
export const GET_BOOKINGS = 'GET_BOOKINGS';

const API_ENDPOINT = 'http://www.mocky.io/v2/591596dc100000b9027595b1';

export function getBookings() {
	const request = axios.get(API_ENDPOINT);
	return {
		type: GET_BOOKINGS,
		payload: request
	};
}