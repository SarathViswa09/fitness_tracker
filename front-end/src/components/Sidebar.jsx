import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { ImStatsDots } from 'react-icons/im';
import { IoPersonCircle } from "react-icons/io5";
import { TbDatabaseOff } from "react-icons/tb";
import { NavLink } from 'react-router-dom';
 
const Sidebar = ({children}) => {
  const[isOpen,setIsOpen]=useState(false);
  const toggle = () => setIsOpen (!isOpen);
  const menuiItem=[
    {
      path:"/profile",
      name:"Profile",
      icon:<IoPersonCircle />
    },
    {
      path:"/stats",
      name:"Statistics",
      icon:<ImStatsDots />
    },
    {
      path:"/customer",
      name:"NA",
      icon:<TbDatabaseOff />
    },
    {
      path:"/distributor",
      name:"NA",
      icon:<TbDatabaseOff />
    },
    {
      path:"/product",
      name:"NA",
      icon:<TbDatabaseOff />
    },
    {
      path:"/productfamily",
      name:"NA",
      icon:<TbDatabaseOff />
    },
    {
      path:"/address",
      name:"NA",
      icon:<TbDatabaseOff />
    }
 
  ]
  return (
    <div className='contain'>
      <div style={{width: isOpen ? "300px" : "50px"}} className='sidebar'>
        <div className='top_section'>
          <h1 style={{display: isOpen ? "block" : "none"}} className='logo'>Main Menu</h1>
          <div style={{marginLeft: isOpen ? "50px" : "0px"}} className='bars'>
            <FaBars onClick={toggle}/>
 
          </div>
 
        </div>
        {
          menuiItem.map((item, index)=>(
            <NavLink to={item.path} key={index} className='link' activeclassName="active">
              <div className='icon'>{item.icon}</div>
              <div style={{display: isOpen ? "block" : "none"}} className='link_text'>{item.name}</div>
 
            </NavLink>
          ))
        }
        </div>
        <main>{children}</main>
    </div>
  );
}
export default Sidebar;