import {expect} from '../test_helper';
import allbookings from '../../src/reducers/reducer_bookings';

describe('REDUCERS', () => {
	it('handles action with unknown type', () => {
		// expect(allbookings()).to.be.instanceof(Array);
		expect(allbookings({},{})).to.eql({});
	});
});