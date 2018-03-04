import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Header from './Header';
import Latest from './Latest';
import Details from './Details';
import NotFound from './NotFound';

class App extends Component {
  state = {
    showSearch: false
  }
  toggleSearch() {
    this.setState(state => ({showSearch: !state.showSearch}))
  }
  render() {
    return (
      <BrowserRouter>
        <div className="router-root">
          <Header />
          <Switch>
            <Route exact path="/" render={() => (<Redirect to="/latest" />)} />
            <Route path="/latest" component={Latest} />
            <Route path="/shows/:slug" component={Details} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
