import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from './services/firebase/auth'
import { PropTypes } from 'prop-types'

// Si el usuario no tiene sesion iniciada debe volver al inicio de sesion
const IsLogged = (props) => {
  const auth = useAuth()
  if (!auth.loggedUser) {
    return <Navigate to='/' />
  }
  return props.children
}

// Si el usuario no tiene sesion iniciada puede acceder
const IsNotLogged = (props) => {
  const auth = useAuth()
  if (auth.loggedUser) {
    return <Navigate to='/home' />
  }
  return props.children
}

IsNotLogged.propTypes = {
  children: PropTypes.object,
}
IsLogged.propTypes = {
  children: PropTypes.object,
}

export { IsNotLogged, IsLogged }
