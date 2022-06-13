import React, { useState, useEffect } from "react";
import moment from "moment";

const AlertTable = ({ posts, loading }) => {
  const [data, setData] = useState(posts);

  useEffect(() => {
    setData(posts);
  }, [posts]);
  const [order, setOrder] = useState("ASC");

  if (loading) {
    return <h2>Loading...</h2>;
  }

  const sorting = (col) => {
    if (order === "ASC") {
      const sorted = [...data].sort((a, b) =>
        a[col].toString().toLowerCase() > b[col].toString().toLowerCase()
          ? 1
          : -1
      );
      setData(sorted);
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...data].sort((a, b) =>
        a[col].toString().toLowerCase() < b[col].toString().toLowerCase()
          ? 1
          : -1
      );
      setData(sorted);
      setOrder("ASC");
    }
  };

  return (
    <section className="ftco-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center mb-5">
            <h2 className="heading-section">Alerts Tables</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="table-wrap">
              <table className="table">
                <thead className="thead-dark">
                  <tr>
                    <th>Alert Message</th>
                    <th onClick={() => sorting("errorCategory")}>
                      Alert Category
                    </th>
                    <th>Alert Time</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => {
                    return (
                      <tr key={index} className="alert" role="alert">
                        <th>{item.errorMessage}</th>
                        <th>{item.errorCategory}</th>
                        <th>
                          {moment(parseInt(item.errorTime)).format(
                            "MMM-DD-YYYY hh:mm"
                          )}
                        </th>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AlertTable;
