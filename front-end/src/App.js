import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import Statistics from "./pages/Statistics";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <BrowserRouter>
      {isAuthenticated && <Header />}
      {!isAuthenticated ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Sidebar>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/stats" element={<Statistics/>}/>
          </Routes>
        </Sidebar>
      )}
    </BrowserRouter>
  );
}

export default App;
