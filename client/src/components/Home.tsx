import { useQuery } from "@apollo/client";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AUTH_TOKEN } from "../constants/constants";
import GET_USER from "../graphql/queries/getUser";
const Home = () => {
  const { loading, error, data } = useQuery(GET_USER);
  console.log(data);

  return (
    <div>
      hello there
      <button>check payload</button>
    </div>
  );
};

export default Home;
