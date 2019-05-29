/** @format */

/**
 * External dependencies
 */
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

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
  filters: filtersReducer,
  form: formReducer
});
export default rootReducer;
