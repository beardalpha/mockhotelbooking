import { renderComponent , expect } from '../test_helper';
import App from '../../src/components/app';

describe('APP' , () => {
  let component;

  beforeEach(() => {
    component = renderComponent(App);
  });

  it('renders App', () => {
    expect(component).to.exist;
  });

  it('renders Calendar', () => {
  	expect(component).to.exist;
  })
});
