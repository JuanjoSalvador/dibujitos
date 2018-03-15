import React, { Component } from 'react';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import AuthWrapper from './AuthWrapper';
import Gravatar from './Gravatar';

const Header = styled.header`
  padding: 10px 20px;
  color: white;
  display: flex;
  align-items: center;
  background: var(--colorPrimaryDark);
  box-shadow: 0px 3px 8px 0 rgba(0,0,0, 0.3);
  @media (max-width: 600px) {
    padding: 10px;
  }
  h1 {
    color: white;
    margin: 0;
    font-weight: 300;
    font-size: 30px;
    line-height: 36px;
  }
  input[name=search] {
    border: none;
    background: rgba(255,255,255, 0.2);
    padding: 8px;
    line-height: 20px;
    padding-left: 36px;
    border-radius: 6px;
    font-size: 16px;
    color: white;
    width: 100%;
    outline: none;
    &::placeholder {
      color: white;
      opacity: 0.5;
    }
  }
  form {
    min-width: 36px;
    position: relative;
    margin-left: 10px;
    flex-basis: 260px;
    .material-icons {
      position: absolute;
      left: 6px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
`;

class HeaderBar extends Component {
  state = {
    search: ''
  }
  submitSearch(ev) {
    ev.preventDefault();
    this.props.history.push(`/latest?search=${this.state.search}`);
  }
  render() {
    return (
      <Header>
        {/* <audio controls style={{width: '100%'}}>
          <source src="http://perseus.shoutca.st:9253/stream" type="audio/mpeg" codecs="vorbis" />
          <source src="http://perseus.shoutca.st:9253/64" type="audio/m4a" codecs="vorbis" />
          Your Browser doesn't support this audio format. Please update your browser or use another one
        </audio> */}
        <Link to="/">
          <h1>Dibujitos</h1>
        </Link>
        <div style={{flex: 1}}></div>
        <form className="search" onSubmit={ev => this.submitSearch(ev)}>
          <i className="material-icons">search</i>
          <input type="search" 
                 name="search"
                 placeholder="Buscar últimos capitulos"
                 value={this.state.search}
                 onChange={ev => this.setState({search: ev.target.value})} /> 
        </form>
        <AuthWrapper 
          renderLoggedIn={profile => (
            <Gravatar 
              title={`Sesión iniciada como ${profile.email}`} 
              hash={profile.mailhash} />
          )}
          renderLoggedOut={() => (
            <Link style={{marginLeft: 10, color: 'white', opacity: 0.8}} to="/login">
              Iniciar
              <br />
              Sesión
            </Link>
          )} />
      </Header>
    );
  }
}

export default withRouter(HeaderBar);