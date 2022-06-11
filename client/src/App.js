import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import Alerts from "./pages/Alerts";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/clients" element={<Clients />}></Route>
        <Route path="/alerts" element={<Alerts />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
