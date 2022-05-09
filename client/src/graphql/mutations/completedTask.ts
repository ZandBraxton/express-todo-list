import { gql } from "@apollo/client";

const COMPLETED_TASK_MUTATION = gql`
  mutation CompletedTaskMutation($id: ID!) {
    completedTask(id: $id) {
      name
    }
  }
`;

export default COMPLETED_TASK_MUTATION;
