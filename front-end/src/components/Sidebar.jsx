import React, { useState } from "react";
import { CgGym } from "react-icons/cg";
import { FaBars } from "react-icons/fa";
import { ImStatsDots } from "react-icons/im";
import { IoIosHome } from "react-icons/io";
import { IoPersonCircle } from "react-icons/io5";
import { TbListDetails } from "react-icons/tb";
import { NavLink } from "react-router-dom";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: "/",
      name: "Home",
      icon: <IoIosHome />,
    },
    {
      path: "/profile",
      name: "Profile",
      icon: <IoPersonCircle />,
    },
    {
      path: "/stats",
      name: "Statistics",
      icon: <ImStatsDots />,
    },
    {
      path: "/details",
      name: "Workout Plans",
      icon: <TbListDetails />,
    },
    {
      path: "/workout",
      name: "WorkOut",
      icon: <CgGym />,
    },
    {
      path: "/tips",
      name: "Health Tips",
      icon: <TbListDetails />,
    },
  ];
  return (
    <div className="contain">
      <div style={{ width: isOpen ? "300px" : "50px" }} className="sidebar">
        <div className="top_section">
          <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
            Main Menu
          </h1>
          <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link"
            activeclassName="active"
          >
            <div className={item.name}>{item.icon}</div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="link_text"
            >
              {item.name}
            </div>
          </NavLink>
        ))}
      </div>
      <main>{children}</main>
    </div>
  );
};
export default Sidebar;