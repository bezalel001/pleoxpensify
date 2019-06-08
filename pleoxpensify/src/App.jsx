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
import Header from './components/header';
import Approuter from './routers';
/**
 * Style dependencies
 */
import './App.scss';

/**
 *  Configure store and load expenses on app bootstrap
 */
const store = configureStore();

store.dispatch(fetchExpenses({}));

function App() {
  return (
    <Provider store={store}>
      <div className="container">
        <Header />
        <Approuter />
      </div>
    </Provider>
  );
}

export default App;
