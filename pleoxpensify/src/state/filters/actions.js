/** @format */

/**
 * Internal dependencies
 */
import {
  SET_FILTER_CURRENCY,
  SET_FILTER_TEXT,
  SET_FILTER_START_DATE,
  SET_FILTER_END_DATE
} from '../action-types';

/**
 * Returns an action object signalling that filter text has been set
 *
 * @param  {String} filterText Filter text or Search Term
 * @return {Object}            Action object
 */
export const setFilterText = filterText => {
  return {
    type: SET_FILTER_TEXT,
    filterText
  };
};

/**
 * Returns an action object signalling that filter currency has been set
 *
 * @param  {String} filterCurrency Filter currency
 * @return {Object}                Action object
 */
export const setFilterCurrency = filterCurrency => {
  return {
    type: SET_FILTER_CURRENCY,
    filterCurrency
  };
};

/**
 * Returns an action object signalling that filter start date has been set
 *
 * @param  {String} startDate Filter start date
 * @return {Object}            Action object
 */
export const setFilterStateDate = filterStartDate => {
  return {
    type: SET_FILTER_START_DATE,
    filterStartDate
  };
};

/**
 * Returns an action object signalling that filter end date has been set
 *
 * @param  {String} endDate Filter end date
 * @return {Object}         Action object
 */
export const setFilterEndDate = filterEndDate => {
  return {
    type: SET_FILTER_END_DATE,
    filterEndDate
  };
};
