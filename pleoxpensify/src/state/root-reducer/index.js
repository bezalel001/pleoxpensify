/** @format */

/**
 * External dependencies
 */
import { combineReducers } from 'redux';

/**
 * Internal dependencies
 */
import expensesReducer from '../expenses/reducers';
import filtersReducer from '../filters/reducers';

/**
 * `Reducer` function which wraps up individual reducers
 */
const rootReducer = combineReducers({
  expenses: expensesReducer,
  filters: filtersReducer
});
export default rootReducer;
