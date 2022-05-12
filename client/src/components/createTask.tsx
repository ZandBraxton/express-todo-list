import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GET_USER from "../graphql/queries/getUser";
import { useIsAuth } from "../utils/useIsAuth";
import { useApolloClient } from "@apollo/client";
import ADD_TASK_MUTATION from "../graphql/mutations/addTask";

interface IformState {
  name: string;
  date: string;
  userId: string;
}

const CreateTask: React.FC<{}> = ({}) => {
  useIsAuth();
  const client = useApolloClient();
  const navigate = useNavigate();
  const [formState, setFormState] = useState<IformState>({
    name: "",
    date: "",
    userId: "",
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
              date: formState.date,
              isCompleted: false,
              userId: findUser.data.me.id,
            },
          });
          client.clearStore();
          navigate("/");
        }}
      >
        <h1 className="form-head">CREATE TASK</h1>
        <div className="form-content">
          <div className="input-wrapper">
            <input
              value={formState.name}
              placeholder={"Name"}
              required
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
              required
              onChange={(e) =>
                setFormState({
                  ...formState,
                  date: e.target.value,
                })
              }
            />
            {/* <span className="error">{errors.email}</span> */}
          </div>
          <button type="submit">CREATE TASK</button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
