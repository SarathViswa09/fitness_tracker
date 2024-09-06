import React, { useState } from 'react';
import './App.css';
import Login from './components/Login';
import TestPage from './components/TestPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <>
      {!isAuthenticated ? (
        <Login onLogin={handleLogin} />
      ) : (
        <TestPage />
      )}
    </>
  );
}

export default App;
