import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Statistics from "./pages/Statistics";
import WorkOut from "./pages/WorkOut";

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
      {/* {isAuthenticated && <Header onLogout={handleLogout} />}
      {!isAuthenticated ? (
        <Login onLogin={handleLogin} />
      ) : ( */}
        <Sidebar>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/stats" element={<Statistics />} />
            <Route path="/workout" element={<WorkOut />} />
          </Routes>
        </Sidebar>
      {/* )} */}
    </BrowserRouter>
  );
}

export default App;