import { gql } from "@apollo/client";

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      username
      token
    }
  }
`;

export default LOGIN_MUTATION;
