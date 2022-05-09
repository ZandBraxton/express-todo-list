import { gql } from "@apollo/client";

const DELETE_TASK_MUTATION = gql`
  mutation DeleteTaskMutation($id: ID!) {
    deleteTask(id: $id) {
      name
    }
  }
`;

export default DELETE_TASK_MUTATION;
