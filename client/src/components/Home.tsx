import { useQuery } from "@apollo/client";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AUTH_TOKEN } from "../constants/constants";
import GET_USER from "../graphql/queries/getUser";
import { useIsAuth } from "../utils/useIsAuth";
import Header from "./Headers";
const Home = () => {
  const { loading, error, data } = useQuery(GET_USER);
  const token = localStorage.getItem("auth-token");
  console.log(token);
  console.log(loading);
  console.log(data);
  useIsAuth();
  if (loading) {
    return <div>...loading</div>;
  }

  if (!data?.me) {
    return <div>Error</div>;
  }

  return (
    <div>
      <Header></Header>
      {data?.me.username}
      <button>check payload</button>
    </div>
  );
};

export default Home;
