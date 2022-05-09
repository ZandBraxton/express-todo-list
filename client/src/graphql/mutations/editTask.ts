import { gql } from "@apollo/client";

const EDIT_TASK_MUTATION = gql`
  mutation EditTaskMutation($name: String!, $date: Date!, $id: ID!) {
    editTask(name: $name, date: $date, id: $id) {
      name
    }
  }
`;

export default EDIT_TASK_MUTATION;
