import React from "react";
import "../assets/styles/App.scss";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { AUTH_TOKEN } from "../constants/constants";

import Home from "../components/Home";
import Users from "../components/Users";
import Login from "../components/Login";
import Register from "../components/Register";
import CreateTask from "../components/createTask";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/createTask" element={<CreateTask />} />
      </Routes>
    </Router>
  );
}

export default App;
