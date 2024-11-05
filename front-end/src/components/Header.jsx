import React from "react";
import { Button } from "react-bootstrap";

function Header({ onLogout }) {
  return (
    <div className="header">
      <b style={{ color: "#0069aa" }}>Fitness Tracker</b>
      <div className="logout-container">
        <Button onClick={onLogout}>Logout</Button>
      </div>
    </div>
  );
}

export default Header;
