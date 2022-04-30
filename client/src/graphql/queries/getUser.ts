import React from "react";
import { useQuery, gql } from "@apollo/client";

const GET_USERS = gql`
  {
    users {
      username
    }
  }
`;

export default GET_USERS;
