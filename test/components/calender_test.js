import { renderComponent , expect } from '../test_helper';
import Calendar from '../../src/components/calendar';

describe('CALENDAR', () => {
	let component;

	beforeEach(()=>{
		component = renderComponent(Calendar);
	});

	it('has a calender component', () => {
		expect(component).to.exist;		
	});

	describe('check for the component class', () => {
		it('has parent class as calendar', () => {
			expect(component.find('.calendar')).to.have.class('calendar');
		});
		it('has header class as calendar-header', () => {
			expect(component.find('.calendar-header')).to.have.class('calendar-header');
		});
		it('has cell class as data-cell', () => {
			expect(component.find('.data-cell')).to.have.class('data-cell');
		});		
	});
});