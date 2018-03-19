import React from 'react'
import LoginReminder from './LoginReminder'
import { connect } from 'react-redux'

const defaultLoggedOut = () => (<LoginReminder />);
const AuthWrapper = (props) => {
  const renderLoggedOut = props.renderLoggedOut || defaultLoggedOut;
  if (typeof props.renderLoggedIn !== 'function') {
    throw new Error('AuthWrapper: renderLoggedIn prop must be a function');
  }

  const isExpired = new Date(props.exp * 1000) < new Date()  
  if(!props.token || isExpired) {
    return renderLoggedOut()
  }
  
  return props.renderLoggedIn({email: props.email, mailhash: props.mailhash})
}

export default connect(state => state)(AuthWrapper)