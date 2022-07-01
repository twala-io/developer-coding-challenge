import React, { useState } from "react";
import Axios from "axios";
import Modal from "../components/Modal.js";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [emailField, setEmailField] = useState("");
  const [passwordField, setPasswordField] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [action, setAction] = useState(true);
  const navigate = useNavigate();

  const onSignUp = () => {
    if (emailField === "" || passwordField === "") {
      setModalMessage("Fields are required");
      setModalOpen(true);
      setAction(false);
    } else {
      Axios.post("http://localhost:5000/signup", {
        email: emailField,
        password: passwordField,
      }).then((response) => {
        setAction(true);
        setModalMessage(response.data.message);
        setModalOpen(true);
      });
    }
  };

  const actionButton = () => {
    setModalOpen(false);
    if (action === true) {
      navigate("/login", { replace: true });
    }
  };

  return (
    <>
      <div className="wrapper fadeInDown">
        <div id="formContent">
          <h2 className="active"> Sign Up</h2>
          <form>
            <input
              type="text"
              id="login"
              className="fadeIn second"
              name="login"
              placeholder="email"
              onChange={(e) => {
                setEmailField(e.target.value);
              }}
            />
            <input
              type="text"
              id="password"
              className="fadeIn third"
              name="login"
              placeholder="password"
              onChange={(e) => {
                setPasswordField(e.target.value);
              }}
            />
            <input
              type="button"
              className="fadeIn fourth"
              value="Sign Up"
              onClick={onSignUp}
            />
            <input
              type="button"
              className="fadeIn fourth"
              value="Sign Up"
              onClick={onSignUp}
            />
          </form>
        </div>
        {modalOpen && (
          <Modal
            setOpenModal={setModalOpen}
            modalMessage={modalMessage}
            actionButton={() => actionButton()}
          />
        )}
      </div>
    </>
  );
}

export default Signup;
