import React, { Component } from 'react';
import styled from 'styled-components';

import Header from './Header';
import Latest from './Latest';
import Calendar from './Calendar';

const Row = styled.main`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  .center-column {
    flex: 1;
    overflow-y: auto;
    max-height: calc(100vh - 70px);
  }
`;

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
        <Row>
          <Latest />
          <Calendar />
        </Row>
      </div>
    );
  }
}

export default App;
