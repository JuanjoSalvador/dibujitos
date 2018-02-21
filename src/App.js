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
      <div>
        <Header />
        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={() => (<Redirect to="/latest" />)} />
            <Route path="/latest" component={Latest} />
            <Route path="/shows/:slug" component={Details} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
