import React from "react";

const Header = (onLogout) => {
  return (
    <>
      <div className="header">
        <b style={{ color: "#0069aa" }}>Fitness</b>
        <b style={{ color: "#00a5d9" }}> Tracker</b>
        <span className="emoji" role="img" aria-label="muscle">
          💪
        </span>
      </div>
    </>
  );
};

export default Header;
