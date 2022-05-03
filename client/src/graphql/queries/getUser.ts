import { gql, useQuery } from "@apollo/client";

const GET_USER = gql`
  query getMe {
    me {
      id
      username
      email
      password
    }
  }
`;

export default GET_USER;
