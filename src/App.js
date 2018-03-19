import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux'
import store from './store'

import Header from './Header';
import Latest from './Latest';
import Details from './Details';
import NotFound from './NotFound';
import Login from './Login';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <div className="router-root">
        <Header />
        <Switch>
          <Route exact path="/" render={() => (<Redirect to="/latest" />)} />
          <Route path="/latest" component={Latest} />
          <Route path="/shows/:slug" component={Details} />
          <Route path="/login" component={Login} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
);

export default App;
