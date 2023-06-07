import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App.jsx'
import './index.css'

import Login from './pages/Login';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />} >
        <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          {/* <Route path='/' element={<Home />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
