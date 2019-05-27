/** @format */

/**
 * External dependencies
 */
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

/**
 * Internal dependencies
 */
import expensesReducer from '../expenses/reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () =>
  createStore(expensesReducer, composeEnhancers(applyMiddleware(thunk)));
