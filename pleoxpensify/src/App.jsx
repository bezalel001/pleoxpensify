/** @format */

/**
 * External dependencies
 */
import React from 'react';
import { Provider } from 'react-redux';

/**
 * Internal dependencies
 */
import configureStore from './state/store';
import { fetchExpenses } from './state/expenses/actions';
import Approuter from './routers';

/**
 *  Configure store and load expenses on app bootstrap
 */
const store = configureStore();

store.dispatch(fetchExpenses({}));

function App() {
  return (
    <Provider store={store}>
      <Approuter />
    </Provider>
  );
}

export default App;
