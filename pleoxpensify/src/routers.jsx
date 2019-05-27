/** @format */

/**
 * External dependencies
 */
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

/**
 * Internal dependencies
 */
import ExpensesHome from './components/home';

const Approuter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={ExpensesHome} />
      </Switch>
    </BrowserRouter>
  );
};

export default Approuter;
