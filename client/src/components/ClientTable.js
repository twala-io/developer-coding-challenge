import React, { useState, useEffect } from "react";
import moment from "moment";
import Modal from "../components/Modal.js";
import Axios from "axios";

const ClientTable = ({ posts, loading }) => {
  const [data, setData] = useState(posts);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [tableDataId, setTableDataId] = useState("");
  const [hasYesNoButton, setHasYesNoButton] = useState(true);
  const [isSecondModal, setIsSecondModal] = useState(false);
  const [contactName, setContactName] = useState("");
  const [contactStatus, setContactStatus] = useState("");
  const [buttonValue, setButtonValue] = useState("OK");
  const [isUpdate, setIsUpdate] = useState(false);

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

  const updateData = (data) => {
    setContactName(data.contactName);
    setContactStatus(data.contactStatus);
    setTableDataId(data.id);
    setIsUpdate(true);
    console.log(data);
    setModalOpen(true);
    setHasYesNoButton(false);
    setButtonValue("Update");
    setModalMessage(
      <table className="updateTable">
        <tbody>
          <tr>
            <th>
              <div>Contact Name</div>
              <input
                type="text"
                placeholder="Contact Name"
                required
                defaultValue={data.contactName}
                onChange={(e) => {
                  setContactName(e.target.value);
                }}
              />
            </th>
            <th>
              <div>Contact Status</div>
              <input
                type="text"
                placeholder="Contact Status"
                required
                defaultValue={data.contactStatus}
                onChange={(e) => {
                  setContactStatus(e.target.value);
                }}
              />
            </th>
          </tr>
        </tbody>
      </table>
    );
  };
  const deleteData = (data) => {
    setIsUpdate(false);
    setModalOpen(true);
    setTableDataId(data.id);
    setModalMessage("Are you sure you want to delete this contact?");
    setHasYesNoButton(true);
    setIsSecondModal(true);
    setButtonValue("OK");
  };

  const actionButton = () => {
    if (isUpdate) {
      if (isSecondModal) {
        setModalOpen(true);
        window.location.reload(false);
      } else {
        Axios.post("http://localhost:5000/updateClient", {
          contactName: contactName,
          contactStatus: contactStatus,
          id: tableDataId,
        }).then((res) => {
          if (res.data) {
            setModalMessage(res.data.message);
            setHasYesNoButton(false);
            setIsSecondModal(true);
            setButtonValue("OK");
            //setModalOpen(true);
            //window.location.reload(false);
          }
        });
      }
    } else {
      if (isSecondModal) {
        Axios.post("http://localhost:5000/deleteClient", {
          id: tableDataId,
        }).then((res) => {
          if (res.data) {
            setModalMessage(res.data.message);
            setHasYesNoButton(false);
            setIsSecondModal(false);
            //setModalOpen(true);
            //window.location.reload(false);
          }
        });
      } else {
        setModalOpen(true);
        window.location.reload(false);
      }
    }
  };

  return (
    <section className="ftco-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center mb-5">
            <h2 className="heading-section">Clients Tables</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="table-wrap">
              <table className="table">
                <thead className="thead-dark">
                  <tr>
                    <th>#</th>
                    <th onClick={() => sorting("contactName")}>Contact Name</th>
                    <th>Contact Status</th>
                    <th>Contact Begin Time</th>
                    <th>Contact End Time</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => {
                    return (
                      <tr key={index} className="alert" role="alert">
                        <th scope="row">{index + 1}</th>
                        <th>{item.contactName}</th>
                        <th>{item.contactStatus}</th>
                        <th>
                          {moment(item.contactBeginTimestamp).format(
                            "MMM-DD-YYYY hh:mm"
                          )}
                        </th>
                        <th>
                          {moment(item.contactEndTimestamp).format(
                            "MMM-DD-YYYY hh:mm"
                          )}
                        </th>
                        <th>
                          <button
                            type="button"
                            className="tableButton"
                            onClick={() => updateData(item)}
                          >
                            Update
                          </button>
                          <button
                            type="button"
                            className="tableButton"
                            onClick={() => deleteData(item)}
                          >
                            Delete
                          </button>
                        </th>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {modalOpen && (
          <Modal
            setOpenModal={setModalOpen}
            modalMessage={modalMessage}
            actionButton={() => actionButton()}
            hasYesNoButton={hasYesNoButton}
            buttonValue={buttonValue}
          />
        )}
      </div>
    </section>
  );
};

export default ClientTable;
