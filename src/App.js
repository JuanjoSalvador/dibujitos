import React, { Component } from 'react';
import Header from './Header';
import Latest from './Latest';

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
        <Latest />
      </div>
    );
  }
}

export default App;
