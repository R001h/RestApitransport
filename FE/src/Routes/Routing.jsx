import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Principal from '../Pages/Principal'
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import Servicios from '../Pages/Servicios';
import Contactos from '../Pages/Contactos';
import Administracion from '../Pages/Administracion';
import ProtectedRoute from './ProtectedRoute';

function Routing() {
  return (
    <Router>
    <Routes>
  
      <Route path="/" element={<Principal />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/Servicios" element={<Servicios />} />
      <Route path="/Contactos" element={<Contactos />} />
      <Route path="/Administracion" element={<ProtectedRoute><Administracion /></ProtectedRoute>}/>
    
    </Routes>
   </Router>
  )
}

export default Routing;