import React from 'react';
import moment from 'moment';
import { DateRangePicker } from 'react-dates';
import { shallow } from 'enzyme';
import { ExpenseListFilters } from '../index';
// import { defaultFilters, sampleFilters } from '../../../utils/fixtures';

describe('ExpenseListFilters', () => {
  const defaultFilters = {
    filterText: '',
    filterCurrency: '',
    filterStartDate: null,
    filterEndDate: null
  };

  const sampleFilters = {
    filterText: 'Mich',
    filterCurrency: 'EUR',
    filterStartDate: moment('2014-04-10T23:16:08.764Z'),
    filterEndDate: moment('2017-04-10T23:16:08.764Z')
  };
  let setFilterText;
  let setFilterCurrency;
  let setFilterStartDate;
  let setFilterEndDate;
  let wrapper;

  beforeEach(() => {
    setFilterText = jest.fn();
    setFilterCurrency = jest.fn();
    setFilterStartDate = jest.fn();
    setFilterEndDate = jest.fn();

    wrapper = shallow(
      <ExpenseListFilters
        filters={defaultFilters}
        setText={setFilterText}
        setCurrency={setFilterCurrency}
        setStartDate={setFilterStartDate}
        setEndDate={setFilterEndDate}
      />
    );
  });

  it('should render ExpenseListFilters with `defaultFilters` correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('should render ExpenseListFilters with `sampleFilters` correctly', () => {
    wrapper.setProps({
      filters: { sampleFilters }
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('should filter on text change', () => {
    const filterText = 'Michael';
    wrapper.find('input').simulate('change', {
      target: { value: filterText }
    });
    expect(setFilterText).toHaveBeenLastCalledWith(filterText);
  });

  it('should handle date changes', () => {
    const startDate = moment('2015-04-10T23:16:08.764Z');
    const endDate = moment('2018-04-10T23:16:08.764Z');

    wrapper.find(DateRangePicker).prop('onDatesChange')({
      startDate,
      endDate
    });

    expect(setFilterStartDate).toHaveBeenLastCalledWith(startDate);
    expect(setFilterEndDate).toHaveBeenLastCalledWith(endDate);
  });

  it('should handle date on date focus change', () => {
    const calenderFocusedInput = 'startDate';
    wrapper.find(DateRangePicker).prop('onFocusChange')(calenderFocusedInput);
    expect(wrapper.state('calenderFocusedInput')).toBe(calenderFocusedInput);
  });
});
