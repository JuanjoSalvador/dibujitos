import React from 'react'
import styled from 'styled-components'
import md5 from 'md5';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 100px);
  width: 100vw;
  text-align: center;
  input {
    font-size: 14px;
    border: none;
    border-bottom: 1px solid var(--colorPrimaryLight);
    background: none;
    padding: 5px;
    text-align: center;
    transition: border-color 1s;
    margin-bottom: 4px;
    line-height: 25px;
    min-width: 300px;    
    &:focus {
      outline: none;
      border-bottom: 1px solid var(--colorPrimary);
    }
    &::placeholder {
      color: #AAA;
    }
  }
`;

class Login extends React.Component {
  componentDidMount() {
    if (window.location.hash) {
      const token = window.location.hash.replace('#t=', '')
      const tokendata = atob(token.split('.')[1]);
      localStorage.setItem('palomitas_mailhash', md5(JSON.parse(tokendata).email))
      localStorage.setItem('palomitas_token', token)
      localStorage.setItem('palomitas_tokendata', tokendata)
      this.props.history.replace(`/latest`);      
    }
  }
  render() {
    return (
      <Form method="GET" action="https://uc.palomitas.fun/auth">
        <p>Para iniciar sesión o registrarte simplemente rellena este campo con tu email</p>
        <input type="hidden" name="callbackurl" value={`${window.location.protocol}//${window.location.host}/login`} />
        <input type="email" name="email" placeholder="you@domain.com" />
      </Form>
    )
  }
}

export default Login;
