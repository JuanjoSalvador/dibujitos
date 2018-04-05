import React from 'react';
import { Link } from 'react-router-dom';

const LoginReminder = (props) => (
  <p {...props} style={{marginLeft: 14, marginTop: 5, ...props.style}}>
    Para acceder a esta sección es necesario <Link to="/login">Iniciar sesión</Link>
  </p>
)

export default LoginReminder
