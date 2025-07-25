import React from 'react'
import './index.css'
import Login from './login/index.jsx'
import Player_User from './pages/Player_User.jsx'
import Master_User from './pages/Master_User.jsx'
import Super_User from './pages/Super_User.jsx'
import Admin_User from './pages/Admin_User.jsx'
import WholeSale_User from './pages/WholeSale_User.jsx'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from './pages/Dashboard.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Navigate to="/login" replace />} />
        <Route path='/login' element={<Login />} />
        <Route path='/Dashboard' element={<Dashboard />} />
      </Routes>
    </Router>
  )
}

export default App
