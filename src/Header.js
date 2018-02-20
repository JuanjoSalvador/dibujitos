import React, { Component } from 'react';
import styled from 'styled-components';

const Header = styled.header`
  padding: 16px 30px;
  color: white;
  display: flex;
  align-items: center;
  h1 {
    color: white;
    margin: 0;
    font-weight: 500;
  }
  input[name=search] {
    border: none;
    background: rgba(255,255,255, 0.2);
    padding: 8px;
    line-height: 22px;
    padding-left: 36px;
    border-radius: 6px;
    font-size: 16px;
    color: white;
    width: 100%;
  }
  form {
    min-width: 36px;
    position: relative;
    margin-left: 10px;
    .material-icons {
      position: absolute;
      left: 6px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
`;

class HeaderBar extends Component {
  state = {  }
  render() {
    return (
      <div style={{background: 'var(--colorPrimaryDark)'}}>
        {/* <audio controls style={{width: '100%'}}>
          <source src="http://perseus.shoutca.st:9253/stream" type="audio/mpeg" codecs="vorbis" />
          <source src="http://perseus.shoutca.st:9253/64" type="audio/m4a" codecs="vorbis" />
          Your Browser doesn't support this audio format. Please update your browser or use another one
        </audio> */}
        <Header>
          <h1>Dibujitos</h1>
          <div style={{flex: 1}}></div>
          <form className="search">
            <i onClick={() => this.toggleSearch()} className="material-icons">search</i>
            <input type="search" name="search" /> 
          </form>
        </Header>
      </div>
    );
  }
}

export default HeaderBar;