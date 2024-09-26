import { useState,useEffect } from "react";
import './App.css';
import TodoPage from "./pages/TodoPage";
import AuthPage from "./pages/AuthPage";
import axios from "axios";

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const apiUrl = 'https://vi-todo-backend.vercel.app';
  //const apiUrl = 'http://localhost:3000'

  // Function to check authentication status
  const checkAuthentication = async () => {
    try {
      const response = await axios.get(`${apiUrl}/todo/`, {
        withCredentials: true // Include cookies
      });
      if (response.status == 403) {
        setIsAuthenticated(false); // User is authenticated
      } else {
        setIsAuthenticated(true); // User is not authenticated
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
      setIsAuthenticated(false); // Default to not authenticated on error
    }
  };

  useEffect(() => {
    checkAuthentication(); // Check authentication status on load
  }, []);
  function authenticate(authFlag){
    setIsAuthenticated(authFlag);
  }

  return (
    <>
      {
        !isAuthenticated ?
          <AuthPage handleAuthentication={authenticate} apiUrl={apiUrl}/> :
          <TodoPage apiUrl={apiUrl}/>
      }
    </>
  )

}

export default App
