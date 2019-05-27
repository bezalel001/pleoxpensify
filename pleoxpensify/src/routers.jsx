/** @format */

/**
 * External dependencies
 */
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

/**
 * Internal dependencies
 */
import Home from './components/home';

const Approuter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  );
};

export default Approuter;
