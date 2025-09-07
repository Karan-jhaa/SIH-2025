import { useState } from 'react'
import './App.css'
import Home from './components/Home/Home'
import Contact from './components/Contact Us/Contact/Contact'
import StudentLogin from './components/Login/StudentLogin/Login'
import StudentRegistration from './components/Register/Register'
import Quiz from './components/Quiz/Quiz'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './components/Dashboard/Dashboard';
import ProtectedRoute from './protectedRoute';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path='/login' element={<StudentLogin />} />
        <Route path='/register' element={<StudentRegistration />} />
        <Route path='/quiz' element={
          //<ProtectedRoute >
            <Quiz />
          //</ProtectedRoute>
          }
        />
        <Route path='/dashboard' element={
          //<ProtectedRoute>
            <Dashboard />
          //</ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
