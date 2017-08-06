import { combineReducers } from 'redux';
import allBookings from './reducer_bookings';

const rootReducer = combineReducers({
  bookings: allBookings
});

export default rootReducer;
