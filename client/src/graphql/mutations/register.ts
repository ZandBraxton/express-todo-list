import { gql } from "@apollo/client";

const REGISTER_MUTATION = gql`
  mutation Register($email: String!, $username: String!, $password: String!) {
    register(email: $email, username: $username, password: $password) {
      email
    }
  }
`;

export default REGISTER_MUTATION;
