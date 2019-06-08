import React from 'react';
import { shallow } from 'enzyme';
import ExpenseList from '../index';
import { expenses } from '../../../utils/fixtures';

describe('Expense List', () => {
  it('should render ExpenseList with expenses', () => {
    const wrapper = shallow(<ExpenseList expenses={expenses} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should render ExpenseList with empty message', () => {
    const wrapper = shallow(<ExpenseList expenses={[]} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should create an `li` per list item', () => {
    const wrapper = shallow(<ExpenseList expenses={expenses} />);
    expect(wrapper.find('li').length).toBe(expenses.length);
  });
});
