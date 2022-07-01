import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../assets/Dashboard.css";
import * as IoIcons from "react-icons/io";
import * as FiIcons from "react-icons/fi";
import Pagination from "../components/Pagination";
import Axios from "axios";
import "../assets/Table.css";
import AlertTable from "../components/AlertTable";

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

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      Axios.post("http://localhost:5000/alert").then((response) => {
        if (response != null) {
          setPosts(response.data);
          setLoading(false);
        } else {
          console.log("Error");
          setLoading(false);
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
        <AlertTable posts={currentPosts} loading={loading} />
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={posts.length}
          paginate={paginate}
        />
      </div>
    </>
  );
}

export default Alerts;
