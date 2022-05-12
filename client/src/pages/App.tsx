import "../assets/styles/App.scss";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "../components/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import CreateTask from "../components/createTask";
import EditTask from "../components/editTask";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-task" element={<CreateTask />} />
        <Route path="/edit-task" element={<EditTask />} />
      </Routes>
    </Router>
  );
}

export default App;
