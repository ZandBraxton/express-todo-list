import React from "react";
import "../assets/styles/App.scss";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "../components/Header";
import Home from "../components/Home";
import Users from "../components/Users";
import Login from "../components/Login";
import Register from "../components/Register";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
