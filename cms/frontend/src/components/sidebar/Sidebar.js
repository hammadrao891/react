import React, { useContext, useEffect, useMemo, useState } from "react";
import "./Sidebar.scss";
import { HiMenuAlt3 } from "react-icons/hi";
import { RiProductHuntLine } from "react-icons/ri";
import { menuAD, menuEmployee, menuStoreIncharge } from "../../data/sidebar";
import SidebarItem from "./SidebarItem";
import { NavLink, useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const navigate = useNavigate();
  const goHome = () => {
    navigate("/");
  };
 
  return (
    <div className="layout" >
      <div className="sidebar" style={{ width: "270px" ,borderRadius:"10px",marginTop:"1.8em",marginLeft:"1em"}}>
        <div className="top_section">
          <div className="logo" style={{ display: isOpen ? "block" : "none" }}>
          
           <div className="hero-image" style={{cursor:"pointer"}} onClick={goHome}>
           {/* <NavLink to="/" > */}
         <h1 className="sideBarh1"> I M S </h1>

          {/* </NavLink>    */}
        </div>
            
          </div>
          <hr/>
          {/* <div
            className="bars"
            style={{ marginLeft: isOpen ? "100px" : "0px" }}
          >
            <HiMenuAlt3 color="black" onClick={toggle} />
          </div> */}
        </div>
        {
        
       menuAD.map((item, index) => {
          return <SidebarItem key={index} item={item} isOpen={isOpen} />;
        })
        
        
        }

      </div>

      <main
        style={{
          paddingLeft: isOpen ? "230px" : "60px",
          transition: "all .5s",
        }}
      >
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
