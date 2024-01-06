import React, { useContext, useEffect, useMemo, useState } from "react";
import "./Sidebar.scss";
import { HiMenuAlt3 } from "react-icons/hi";
import { RiProductHuntLine } from "react-icons/ri";
import { menuAD, menuEmployee, menuStoreIncharge } from "../../data/sidebar";
import SidebarItem from "./SidebarItem";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
import { selectUserType } from "../../redux/features/auth/authSlice";
import { useSelector } from "react-redux";
const Sidebar = ({ children }) => {
  const userType = useSelector(selectUserType);
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const navigate = useNavigate();
const {user}=useContext(AuthContext)
  const goHome = () => {
    navigate("/");
  };
 
  useEffect(() => {
    // if (user && user.userType === "Employee") {
      
    //   setMenuu(prevMenu => prevMenu.slice(0, -2));
    // }
    // if(user && user.userType === "Store Incharge")
    // {
    //   setMenuu(prevMenu => prevMenu.slice(0, -1))
    // }
  }, [user]);
  return (
    <div className="layout">
      <div className="sidebar" style={{ width: isOpen ? "230px" : "60px" }}>
        <div className="top_section">
          <div className="logo" style={{ display: isOpen ? "block" : "none" }}>
           <div className="hero-image">
          IMS
        </div>   
            
          </div>

          <div
            className="bars"
            style={{ marginLeft: isOpen ? "100px" : "0px" }}
          >
            <HiMenuAlt3 onClick={toggle} />
          </div>
        </div>
        {
       user.userType === "AD" ? menuAD.map((item, index) => {
          return <SidebarItem key={index} item={item} isOpen={isOpen} />;
        })
        :
        user.userType === "Employee" ? menuEmployee.map((item, index) => {
          return <SidebarItem key={index} item={item} isOpen={isOpen} />;
        })
        :
        user.userType === "Store Incharge" && menuStoreIncharge.map((item, index) => {
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
