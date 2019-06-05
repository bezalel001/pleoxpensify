import moment from 'moment';
import {
  SET_FILTER_CURRENCY,
  SET_FILTER_TEXT,
  SET_FILTER_START_DATE,
  SET_FILTER_END_DATE
} from '../../action-types';
import {
  setFilterCurrency,
  setFilterStartDate,
  setFilterEndDate,
  setFilterText
} from '../actions';

describe('filters action creators', () => {
  let action;
  describe('set filter text action creator', () => {
    const filterText = 'Some';
    beforeEach(() => {
      action = setFilterText(filterText);
    });

    it('should return the correct action type', () => {
      expect(action.type).toEqual(SET_FILTER_TEXT);
    });
    it('should have the correct payload', () => {
      expect(action.filterText).toEqual(filterText);
    });
  });
  describe('set currency action creator', () => {
    const currency = 'EURO';
    beforeEach(() => {
      action = setFilterCurrency(currency);
    });
    it('should return the correct action type', () => {
      expect(action.type).toEqual(SET_FILTER_CURRENCY);
    });
    it('should have the correct payload', () => {
      expect(action.filterCurrency).toEqual(currency);
    });
  });

  describe('set start date action creator', () => {
    const date = moment(0);
    beforeEach(() => {
      action = setFilterStartDate(date);
    });
    it('should return the correct action type', () => {
      expect(action.type).toEqual(SET_FILTER_START_DATE);
    });
    it('should have the correct payload', () => {
      expect(action.filterStartDate).toEqual(date);
    });
  });

  describe('set end date action creator', () => {
    const date = moment(0);
    beforeEach(() => {
      action = setFilterEndDate(date);
    });
    it('should return the correct action type', () => {
      expect(action.type).toEqual(SET_FILTER_END_DATE);
    });
    it('should have the correct payload', () => {
      expect(action.filterEndDate).toEqual(date);
    });
  });
});
