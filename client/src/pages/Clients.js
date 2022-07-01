import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../assets/Dashboard.css";
import * as IoIcons from "react-icons/io";
import * as FiIcons from "react-icons/fi";
import ClientTable from "../components/ClientTable";
import Pagination from "../components/Pagination";
import Axios from "axios";
import "../assets/Table.css";

function Clients() {
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

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [totalContact, setTotalContact] = useState(0);
  const [totalContactState, setTotalContactState] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      Axios.post("http://localhost:5000/contact").then((response) => {
        if (response != null) {
          setPosts(response.data);
          setLoading(false);
        } else {
          console.log("Error");
          setLoading(false);
        }
      });
      Axios.get("http://localhost:5000/contactCount").then((response) => {
        if (response != null) {
          setTotalContact(response.data.data);
        }
      });
      Axios.get("http://localhost:5000/contactCountState").then((response) => {
        if (response != null) {
          setTotalContactState(response.data.data);
        }
      });
    };

    fetchPosts();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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

      <div className="container mt-5">
        <ClientTable posts={currentPosts} loading={loading} />
        <div>Total Contact: {totalContact}</div>
        <div>Total Contact State: {totalContactState}</div>
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={posts.length}
          paginate={paginate}
        />
      </div>
    </>
  );
}

export default Clients;
