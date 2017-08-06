import {expect} from '../test_helper';
import {GET_BOOKINGS, getBookings} from '../../src/actions';

describe('ACTIONS', () => {
	describe('GET_BOOKINGS', ()=> {
		it('has the correct type', ()=>{
			const action = getBookings();
			expect(action.type).to.equal(GET_BOOKINGS);
		});
	});
});