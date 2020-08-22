import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ShopHeader from '../shop-header';
import { HomePage, CartPage } from '../pages';

import './app.css';

const App = () => {
  return (
    <main role="main" className="container">
      <ShopHeader />
      <Switch>
        <Route 
          path="/"
          component={HomePage}
          exact />
        <Route 
          path="/cart"
          component={CartPage} />
        <Route render={() => <h2>404</h2> } />
      </Switch>
    </main>
  );
};

export default App;
