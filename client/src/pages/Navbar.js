import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import { IconContext } from "react-icons";
import * as IoIcons from "react-icons/io";
import * as FiIcons from "react-icons/fi";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const SidebarData = [
    {
      title: "Home",
      path: "/dashboard",
      icon: <AiIcons.AiFillHome />,
      cName: "nav-text",
    },
    {
      title: "Clients",
      path: "/clients",
      icon: <IoIcons.IoIosPeople />,
      cName: "nav-text",
    },
    {
      title: "Alerts",
      path: "/aletrts",
      icon: <FiIcons.FiAlertCircle />,
      cName: "nav-text",
    },
  ];

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <span className="dashboard-title">Dashboard</span>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
