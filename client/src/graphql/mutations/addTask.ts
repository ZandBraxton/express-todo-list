import { gql } from "@apollo/client";

const ADD_TASK_MUTATION = gql`
  mutation AddTaskMutation(
    $name: String!
    $priority: String!
    $isCompleted: Boolean!
    $userId: ID!
  ) {
    addTask(
      name: $name
      priority: $priority
      isCompleted: $isCompleted
      userId: $userId
    ) {
      name
    }
  }
`;

export default ADD_TASK_MUTATION;
