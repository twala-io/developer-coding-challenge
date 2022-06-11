import React, {useState} from 'react'
import Axios from "axios"


function Signup() {

  const [emailField, setEmailField] = useState("")
  const [passwordField, setPasswordField] = useState("")

  const onSignUp = () => {
    Axios.post("http://localhost:5000/signup",{
      email: emailField,
      password: passwordField
    }).then((response)=> {
     console.log(response)
    })
  }

  return (
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
      </form>
    </div>
  </div>
  )
}


Signup.defaultProps = {
  isOpen: true,
  message: ""
}

export default Signup