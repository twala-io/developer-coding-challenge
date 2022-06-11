import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [emailField, setEmailField] = useState("");
  const [passwordField, setPasswordField] = useState("");
  //const [loginStatus, setLoginStatus] = useState("");
  const navigate = useNavigate();

  const onLogin = () => {
    Axios.post("http://localhost:5000/login", {
      email: emailField,
      password: passwordField,
    }).then((response) => {
      if (response.data.message) {
        navigate("/dashboard", { replace: true });
      }
    });
  };

  const onSignUp = () => {
    navigate("/dashboard");
  };

  return (
    <div className="wrapper fadeInDown">
      <div id="formContent">
        <h2 className="active"> Sign In </h2>
        <form>
          <input
            type="text"
            id="login"
            className="fadeIn second"
            name="login"
            placeholder="email"
            value=""
            required
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
            value=""
            required
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
    </div>
  );
}

export default Login;
