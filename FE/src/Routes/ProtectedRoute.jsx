import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtecteRoute = ({children})=> {

  const Autenticado = localStorage.getItem('Autenticado') === 'true';
  if (!Autenticado) {
    return <Navigate to="/" />;
  }

  return children

  
}

export default ProtecteRoute