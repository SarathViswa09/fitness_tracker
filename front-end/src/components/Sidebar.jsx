import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { FcCustomerSupport } from 'react-icons/fc';
import { GiFamilyTree } from 'react-icons/gi';
import { ImAddressBook, ImStatsDots } from 'react-icons/im';
import { IoPersonCircle } from "react-icons/io5";
import { MdProductionQuantityLimits } from 'react-icons/md';
import { TbRoadSign } from 'react-icons/tb';
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
      name:"Customer",
      icon:<FcCustomerSupport/>
    },
    {
      path:"/distributor",
      name:"Distributor",
      icon:<TbRoadSign/>
    },
    {
      path:"/product",
      name:"Product",
      icon:<MdProductionQuantityLimits/>
    },
    {
      path:"/productfamily",
      name:"Product Family",
      icon:<GiFamilyTree/>
    },
    {
      path:"/address",
      name:"Address",
      icon:<ImAddressBook/>
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