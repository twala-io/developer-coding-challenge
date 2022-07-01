import React from 'react'
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();
    const onLoginRedirect = () => {
        navigate('/login');
      }
    const onSignupRedirect = () => {
        navigate('/signup');
      }

  return (
    <div>
    <h1>Home Page</h1>
      <button onClick={onLoginRedirect}
        type="button">Login</button>
        <button onClick={onSignupRedirect}
        type="button">Sign Up</button>
  </div>
  )
}

export default Home