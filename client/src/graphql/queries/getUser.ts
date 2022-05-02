import { gql, useQuery } from "@apollo/client";

const GET_USER = gql`
  query getMe {
    me {
      username
      email
      password
    }
  }
`;

export default GET_USER;
