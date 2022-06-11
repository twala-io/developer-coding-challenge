import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import { IconContext } from "react-icons";
import * as IoIcons from "react-icons/io";
import * as FiIcons from "react-icons/fi";
function Alerts() {
  const SidebarData = [
    {
      title: "Clients",
      path: "/clients",
      icon: <IoIcons.IoIosPeople />,
      cName: "nav-text",
    },
    {
      title: "Alerts",
      path: "/alerts",
      icon: <FiIcons.FiAlertCircle />,
      cName: "nav-text",
    },
  ];

  return (
    <>
      <div className="topnav">
        {SidebarData.map((item, index) => {
          return (
            <span key={index} className={item.cName}>
              <Link to={item.path}>
                {item.icon}
                <span className="title-position">{item.title}</span>
              </Link>
            </span>
          );
        })}
      </div>
      <h1>Alerts</h1>
    </>
  );
}

export default Alerts;
