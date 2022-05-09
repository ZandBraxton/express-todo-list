import { useQuery, useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AUTH_TOKEN } from "../constants/constants";
import GET_USER from "../graphql/queries/getUser";
import { useIsAuth } from "../utils/useIsAuth";
import { useApolloClient } from "@apollo/client";
import ADD_TASK_MUTATION from "../graphql/mutations/addTask";
import { coerceInputValue } from "graphql";
import EDIT_TASK_MUTATION from "../graphql/mutations/editTask";
const EditTask: React.FC<{}> = ({}) => {
  const { state }: any = useLocation();
  const formDate = new Date(state.task.date).toISOString().substring(0, 10);
  console.log(state.task);
  const client = useApolloClient();
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    name: state.task.name,
    date: formDate,
    id: state.task.id,
  });

  return (
    <div className="form-wrapper">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          console.log(formState);
          await client.mutate({
            mutation: EDIT_TASK_MUTATION,
            variables: {
              name: formState.name,
              date: formState.date,
              id: formState.id,
            },
          });
          client.clearStore();
          navigate("/");

          //   await login();
        }}
      >
        <h1 className="form-head">EDIT TASK</h1>
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
          <button type="submit">EDIT TASK</button>
        </div>
      </form>
    </div>
  );
};

export default EditTask;
