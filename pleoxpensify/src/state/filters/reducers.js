/** @format */

/**
 * Internal dependencies
 */
import {
  SET_FILTER_CURRENCY,
  SET_FILTER_END_DATE,
  SET_FILTER_START_DATE,
  SET_FILTER_TEXT
} from '../action-types';
import { getFiltersInitialState } from '../initial-state';

/**
 * `Reducer` function which handles filter-related actions
 *
 * @param {Object} state  Current State
 * @param {Object} action Filter-related Action
 * @return {Object}       Updated State
 */
const filtersReducer = (state = getFiltersInitialState(), action) => {
  switch (action.type) {
    case SET_FILTER_TEXT:
      return {
        ...state,
        filterText: action.filterText
      };
    case SET_FILTER_CURRENCY:
      return {
        ...state,
        filterCurrency: action.filterCurrency
      };
    case SET_FILTER_END_DATE:
      return {
        ...state,
        filterEndDate: action.filterEndDate
      };
    case SET_FILTER_START_DATE:
      return {
        ...state,
        filterStartDate: action.filterStartDate
      };
    default:
      return state;
  }
};

export default filtersReducer;
