import React, { Component } from 'react';
import styled from 'styled-components';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Header from './Header';
import Latest from './Latest';
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
            <Route exact path="/" component={Latest} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
