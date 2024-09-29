/* eslint-disable react/prop-types */

import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import TodoPage from "./pages/TodoPage";
import AuthPage from "./pages/AuthPage";
import ProtectedRoute from './components/ProtectedRoute';



function App() {

  const apiUrl = 'https://vi-todo-backend.vercel.app';
 // const apiUrl = 'http://localhost:3000';
  

  return (
    <>
      {/* {
        !isAuthenticated ?
          <AuthPage handleAuthentication={authenticate} apiUrl={apiUrl}/> :
          <TodoPage apiUrl={apiUrl}/>
      }
      <button className="bg-slate-600 rounded-md p-4 text-white block text-center" onClick={doLogout}>Logout</button> */}
      <Router>
            <Routes>
                <Route path='/' element={<AuthPage apiUrl={apiUrl}/>} />
                <Route path="/dashboard" element={<ProtectedRoute apiUrl={apiUrl}><TodoPage apiUrl={apiUrl}/></ProtectedRoute>} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    </>
  )

}

export default App
