import React, { Component } from 'react';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import AuthWrapper from './AuthWrapper';
import Gravatar from './Gravatar';
import { connect } from 'react-redux';
import { actions } from './auth.reducer'

const Header = styled.header`
  padding: 10px 20px;
  color: white;
  display: flex;
  align-items: center;
  background: var(--colorPrimaryDark);
  box-shadow: 0px 3px 8px 0 rgba(0,0,0, 0.3);
  height: 60px;
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
  .profile {
    position: relative;
    img {
      cursor: pointer;      
    }
    ul {
      display: none;
      list-style: none;
      position: absolute;
      margin: 0;
      padding: 0;
      right: -10px;
      top: 30px;
      margin-top: 10px;
      background: white;
      color: #444;
      text-align: right;
      border: 1px solid #ccc;
      border-radius: 6px;
      z-index: 2;
      li {
        padding: 8px 16px;
        & + li {
          border-top: 1px solid #ccc;
        }
        &:first-child {
          color: var(--colorPrimary);
        }
        &:last-child {
          cursor: pointer;
        }
      }
    }
    &:focus, &:hover {
      ul {
        display: block;
      }
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
    this.setState({search: ''})
  }
  logout() {
    this.props.dispatch(actions.logout())
  }
  render() {
    return (
      <Header>
        {/* 
          <audio>
            <source src="http://perseus.shoutca.st:9253/stream" type="audio/mpeg" codecs="vorbis" />
            <source src="http://perseus.shoutca.st:9253/64" type="audio/m4a" codecs="vorbis" />
            Your Browser doesn't support this audio format. 
            Please, <a href="https://browsehappy.com">update your browser</a>
          </audio>
        */}
        <Link to="/"><h1>Dibujitos</h1></Link>
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
            <div className="profile">
              <Gravatar tabIndex={0} hash={profile.mailhash} />
              <ul>
                <li>{profile.email}</li>
                <li onClick={() => this.logout()} tabIndex={0}>Cerrar sesión</li>
              </ul>
            </div>
          )}
          renderLoggedOut={() => (
            <Link title="Iniciar sesión" 
              style={{fontSize: 12, textAlign: 'center', lineHeight: 1, color: 'white', marginLeft: 20, opacity: 0.8}}
              to="/login">
              <i className="material-icons">person_outline</i>
              <br />
              Login
            </Link>
          )} />
      </Header>
    );
  }
}

export default withRouter(connect()(HeaderBar));