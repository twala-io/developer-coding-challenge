import React from "react";
import { Link } from "react-router-dom";
import "../assets/Dashboard.css";
import * as IoIcons from "react-icons/io";
import * as FiIcons from "react-icons/fi";
function Dashboard() {
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
      <h1>Dashboard</h1>
    </>
  );
}

export default Dashboard;
