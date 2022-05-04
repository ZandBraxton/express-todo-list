import { useQuery } from "@apollo/client";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AUTH_TOKEN } from "../constants/constants";
import GET_USER from "../graphql/queries/getUser";
import { useIsAuth } from "../utils/useIsAuth";
import { useApolloClient } from "@apollo/client";
import Header from "./Headers";
const Home = () => {
  const client = useApolloClient();
  const { loading, error, data } = useQuery(GET_USER);
  console.log(loading);
  console.log(data);
  useIsAuth();
  if (loading) {
    return <div>...loading</div>;
  }

  if (!data?.me) {
    return <div>Error</div>;
  }

  const taskList = () => {};

  return (
    <div>
      <Header></Header>
      <h2>Hello, {data?.me.username}</h2>
      <div className="inbox">
        <h1 className="today">Today</h1>
      </div>
      <Link to={"/createTask"}>
        <span>Create Task</span>
      </Link>
    </div>
  );
};

export default Home;
