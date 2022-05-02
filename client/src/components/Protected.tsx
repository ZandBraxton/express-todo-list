import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AUTH_TOKEN } from "../constants/constants";

const Protected = () => {
  return <div>this is only visible if logged in</div>;
};

export default Protected;
