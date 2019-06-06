import moment from 'moment';
import filtersReducer from '../reducers';
import { getFiltersInitialState } from '../../initial-state';

import {
  setFilterText,
  setFilterCurrency,
  setFilterStartDate,
  setFilterEndDate
} from '../actions';

describe('filters reducer', () => {
  it('should setup filter default values', () => {
    const state = filtersReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(getFiltersInitialState());
  });

  it('should filter by text', () => {
    const filterText = 'some';
    const state = filtersReducer(undefined, setFilterText(filterText));
    expect(state.filterText).toBe(filterText);
  });

  it('should filter by currency', () => {
    const currency = 'DKK';
    const state = filtersReducer(undefined, setFilterCurrency(currency));
    expect(state.filterCurrency).toBe(currency);
  });

  it('should filter by start date', () => {
    const date = moment('2017-06-19T23:01:32.198Z');
    const state = filtersReducer(undefined, setFilterStartDate(date));
    expect(state.filterStartDate).toEqual(date);
  });

  it('should filter by end date', () => {
    const date = moment('2018-01-19T23:01:32.198Z');
    const state = filtersReducer(undefined, setFilterEndDate(date));
    expect(state.filterEndDate).toEqual(date);
  });
});
