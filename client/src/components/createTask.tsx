import { useQuery, useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AUTH_TOKEN } from "../constants/constants";
import GET_USER from "../graphql/queries/getUser";
import { useIsAuth } from "../utils/useIsAuth";
import { useApolloClient } from "@apollo/client";
import ADD_TASK_MUTATION from "../graphql/mutations/addTask";
const CreateTask: React.FC<{}> = ({}) => {
  useIsAuth();
  const client = useApolloClient();
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    name: "",
    priority: "Low",
    date: "",
    userId: "",
  });

  const [addTask, { data, loading, error }] = useMutation(ADD_TASK_MUTATION, {
    variables: {
      name: formState.name,
      priority: formState.priority,
      date: formState.date,
      userId: formState.userId,
    },
  });

  return (
    <div className="form-wrapper">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const findUser = await client.query({
            query: GET_USER,
          });

          await client.mutate({
            mutation: ADD_TASK_MUTATION,
            variables: {
              name: formState.name,
              priority: formState.priority,
              isCompleted: false,
              userId: findUser.data.me.id,
            },
          });
          navigate("/");

          //   await login();
        }}
      >
        <h1 className="form-head">CREATE TASK</h1>
        <div className="form-content">
          <div className="input-wrapper">
            <input
              value={formState.name}
              placeholder={"Name"}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  name: e.target.value,
                })
              }
            />
            {/* <span className="error">{errors.email}</span> */}
          </div>
          <div className="input-wrapper">
            <input
              type={"date"}
              value={formState.date}
              placeholder={"Due Date"}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  date: e.target.value,
                })
              }
            />
            {/* <span className="error">{errors.email}</span> */}
          </div>
          <div className="input-wrapper">
            <select
              value={formState.priority}
              placeholder={"Priority"}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  priority: e.target.value,
                })
              }
            >
              <option value={"Low"}>Low</option>
              <option value={"Medium"}>Medium</option>
              <option value={"High"}>High</option>
            </select>
            {/* <span className="error">{errors.password}</span> */}
          </div>

          <button type="submit">CREATE TASK</button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
