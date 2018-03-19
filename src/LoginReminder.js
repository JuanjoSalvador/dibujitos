import React from 'react';
import { Link } from 'react-router-dom';

const LoginReminder = (props) => (
  <p {...props}>
    Para acceder a esta sección es necesario <Link to="/login">Iniciar sesión</Link>
  </p>
)

export default LoginReminder
