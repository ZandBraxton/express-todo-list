import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useIsAuth } from "../utils/useIsAuth";
import { useApolloClient } from "@apollo/client";
import EDIT_TASK_MUTATION from "../graphql/mutations/editTask";
interface IformState {
  name: string;
  date: string;
  id: string;
}

const EditTask: React.FC<{}> = ({}) => {
  const { state }: any = useLocation();
  const formDate = new Date(state.task.date).toISOString().substring(0, 10);
  const client = useApolloClient();
  const navigate = useNavigate();
  const [formState, setFormState] = useState<IformState>({
    name: state.task.name,
    date: formDate,
    id: state.task.id,
  });

  useIsAuth();

  return (
    <div className="form-wrapper">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
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
        }}
      >
        <h1 className="form-head">EDIT TASK</h1>
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
          </div>
          <button type="submit">EDIT TASK</button>
        </div>
      </form>
    </div>
  );
};

export default EditTask;
