import React from "react";
import { useQuery, gql } from "@apollo/client";
import GET_USERS from "../graphql/queries/getUser";

const Users = () => {
  const { data } = useQuery(GET_USERS);

  return <div>{data}</div>;
};

export default Users;
