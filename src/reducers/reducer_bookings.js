const INITIAL_STATE = {all:[]};
import {GET_BOOKINGS} from '../actions';
// import {bookingData} from './stub';

export default function(state=INITIAL_STATE, action){
	switch(action.type) {
		case GET_BOOKINGS:
      return {...state, all: action.payload.data};
			// return {...state, all: bookingData};
		default:
			return state;
	}
}
