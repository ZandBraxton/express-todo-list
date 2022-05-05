import RadioButtonUncheckedSharpIcon from "@mui/icons-material/RadioButtonUncheckedSharp";
import format from "date-fns/format";
import "../assets/styles/tasks.scss";

export const Task = (props: any) => {
  const task = props.props;

  const utcDate = new Date(task.date);
  const utcDateOnly = new Date(
    utcDate.valueOf() + utcDate.getTimezoneOffset() * 60 * 1000
  );
  const date = format(new Date(utcDateOnly), "MM/dd/yyyy");
  return (
    <div className="task-container">
      <RadioButtonUncheckedSharpIcon></RadioButtonUncheckedSharpIcon>
      <div>{task.name}</div>
      <div>{task.priority}</div>
      <div>{date}</div>
    </div>
  );
};
