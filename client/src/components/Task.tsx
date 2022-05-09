import RadioButtonUncheckedSharpIcon from "@mui/icons-material/RadioButtonUncheckedSharp";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import format from "date-fns/format";
import "../assets/styles/tasks.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CloseIcon from "@mui/icons-material/Close";
import { useApolloClient } from "@apollo/client";
import COMPLETED_TASK_MUTATION from "../graphql/mutations/completedTask";
import DELETE_TASK_MUTATION from "../graphql/mutations/deleteTask";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export const Task = (props: any) => {
  const [isCompleted, setIsCompleted] = useState(props.props.isCompleted);
  const [isMenu, setIsMenu] = useState(false);
  const client = useApolloClient();
  const task = props.props;

  const utcDate = new Date(task.date);
  const utcDateOnly = new Date(
    utcDate.valueOf() + utcDate.getTimezoneOffset() * 60 * 1000
  );
  const date = format(new Date(utcDateOnly), "MM/dd/yy");
  return (
    <div className="task-container">
      {isCompleted ? (
        <CheckCircleOutlineIcon
          style={{ fill: "green" }}
          onClick={async () => {
            setIsCompleted(!isCompleted);
            await client.mutate({
              mutation: COMPLETED_TASK_MUTATION,
              variables: {
                id: task.id,
              },
            });
            client.clearStore();
            props.setReload(true);
          }}
        ></CheckCircleOutlineIcon>
      ) : (
        <RadioButtonUncheckedSharpIcon
          onClick={async () => {
            setIsCompleted(!isCompleted);
            await client.mutate({
              mutation: COMPLETED_TASK_MUTATION,
              variables: {
                id: task.id,
              },
            });

            props.setReload(true);
          }}
        ></RadioButtonUncheckedSharpIcon>
      )}

      <div className="name">{task.name}</div>
      <div className="date">{date}</div>
      {isMenu ? (
        <div className="menu-content">
          <CloseIcon
            onClick={() => {
              setIsMenu(!isMenu);
            }}
          ></CloseIcon>
          <div className="menu">
            <Link to={"/editTask"} state={{ task }}>
              <button>EDIT</button>
            </Link>
            <button
              onClick={async (e) => {
                await client.mutate({
                  mutation: DELETE_TASK_MUTATION,
                  variables: {
                    id: task.id,
                  },
                });
                client.clearStore();
                props.setReload(true);
              }}
            >
              DELETE
            </button>
          </div>
        </div>
      ) : (
        <MoreVertIcon
          onClick={() => {
            setIsMenu(!isMenu);
          }}
        ></MoreVertIcon>
      )}
    </div>
  );
};
