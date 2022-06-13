import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal.js";

function Login() {
  const [emailField, setEmailField] = useState("");
  const [passwordField, setPasswordField] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();

  const onLogin = () => {
    Axios.post("http://localhost:5000/login", {
      email: emailField,
      password: passwordField,
    }).then((res) => {
      if (res.data) {
        if (res.data.statusCode === 200) {
          navigate("/clients", { replace: true });
        } else {
          setModalMessage(res.data.message);
          setModalOpen(true);
        }
      }
    });
  };

  const actionButton = () => {
    setModalOpen(false);
  };

  const onSignUp = () => {
    navigate("/signup");
  };

  return (
    <>
      <div className="wrapper fadeInDown">
        <div id="formContent">
          <h2 className="active"> Sign In</h2>
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
              type="password"
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
              value="Log In"
              onClick={onLogin}
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

export default Login;
