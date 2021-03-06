import React, {Fragment} from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { actions } from './auth.reducer'
import Spinner from './Spinner'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20vh;
  padding: 0 8px;
  width: 100vw;
  text-align: center;
  opacity: ${props => props.loading ? 0.5 : 1};
  pointer-events: ${props => props.loading ? 'none' : 'all'}
  p {
    max-width: 600px;
  }
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
  .loading {
    opacity: 1;
  }
`;

class Login extends React.Component {
  state = {
    loading: false
  }
  componentDidMount() {
    if (window.location.search) {
      const token = window.location.search.replace('?token=', '')
      this.props.dispatch(actions.login(token));
      this.props.history.push('/latest');
    }
  }
  render() {
    return (
      <Form 
        loading={this.state.loading}
        onSubmit={() => this.setState({loading: true})} 
        method="GET" 
        action="https://uc.palomitas.fun/auth">
        <p>
          Para iniciar sesión o registrarte simplemente rellena este campo con tu email
          y recibirás un correo con un enlace de confirmación.
        </p>
        <input type="hidden" name="callbackurl" value={`${window.location.protocol}//${window.location.host}/login`} />
        <input type="email" name="email" placeholder="you@domain.com" />
        {this.state.loading && (
          <Fragment>
            <Spinner />
            <p className="loading">Cargando...</p>
          </Fragment>
        )}
      </Form>
    )
  }
}

export default connect()(Login);
