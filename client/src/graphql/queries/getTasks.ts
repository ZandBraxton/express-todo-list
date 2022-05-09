import { gql, useQuery } from "@apollo/client";

const GET_TASKS = gql`
  query getTask {
    task {
      id
      name
      date
      isCompleted
    }
  }
`;

export default GET_TASKS;
