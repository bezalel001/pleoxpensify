import React from 'react';
import { shallow } from 'enzyme';
import ExpenseListItem from '../index';
import { expenses } from '../../../utils/fixtures';

describe('ExpenseListItem', () => {
  it('should render ExpenseListItem correctly', () => {
    const wrapper = shallow(<ExpenseListItem expense={expenses[0]} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should have an expense-list-item class', () => {
    const wrapper = shallow(<ExpenseListItem expense={expenses[0]} />);
    expect(wrapper.find('.expense-list-item').length > 0).toBe(true);
  });
});
