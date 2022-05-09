import { useQuery } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import GET_TASKS from "../graphql/queries/getTasks";
import React, { useEffect, useState } from "react";
import { Task } from "./Task";
import { format, isThisWeek, compareAsc, addDays } from "date-fns";
import { useApolloClient } from "@apollo/client";
import "../assets/styles/tasks.scss";
import { Upcoming } from "@mui/icons-material";

export const Tasklist = () => {
  const client = useApolloClient();
  const [reload, setReload] = useState(false);
  const [todaysTasks, setTodaysTasks] = useState([] as any);
  const [weeklyTasks, setWeeklyTasks] = useState([] as any);
  const [upcomingTasks, setUpcomingTasks] = useState([] as any);
  const [pastTasks, setPastTasks] = useState([] as any);

  useEffect(() => {
    getTasks();
    setReload(false);
    // sortTasks()
  }, [reload]);

  const getTasks = async () => {
    let todayTask: any = [];
    let weekTask: any = [];
    let upcomingTask: any = [];
    let pastTasks: any = [];
    const tasks = await client.query({
      query: GET_TASKS,
    });
    tasks.data.task.map((task: any) => {
      const time = getDate();
      const utcDate = new Date(task.date);
      const utcDateOnly = new Date(
        utcDate.valueOf() + utcDate.getTimezoneOffset() * 60 * 1000
      );
      const date = format(new Date(utcDateOnly), "MM/dd/yyyy");
      if (date === time) {
        todayTask.push(task);
      }
      if (
        compareAsc(utcDateOnly, new Date(time)) !== -1 &&
        isThisWeek(utcDate) === true &&
        date !== time
      ) {
        weekTask.push(task);
      }
      if (
        compareAsc(utcDateOnly, new Date(time)) !== -1 &&
        isThisWeek(utcDate) === false
      ) {
        upcomingTask.push(task);
      }
      if (compareAsc(utcDateOnly, new Date(time)) === -1) {
        pastTasks.push(task);
      }
    });
    setTodaysTasks(todayTask);
    setWeeklyTasks(weekTask);
    setUpcomingTasks(upcomingTask);
    setPastTasks(pastTasks);
  };

  function getDate() {
    const timeElapsed = Date.now();
    const today = format(new Date(timeElapsed), "P");
    return today;
  }

  return (
    <div className="task-list-wrapper">
      <section className="task-list-container">
        <h2 className="today">Today</h2>
        {todaysTasks.length === 0 ? (
          <div className="no-tasks">
            <p>No tasks for today</p>
          </div>
        ) : (
          <div>
            {todaysTasks.map((task: any) => {
              return (
                <Task setReload={setReload} props={task} key={task.id}></Task>
              );
            })}
          </div>
        )}
      </section>
      <section className="task-list-container">
        <h2 className="today">This Week</h2>
        {weeklyTasks.length === 0 ? (
          <div className="no-tasks">
            <p>No tasks for this week</p>
          </div>
        ) : (
          <div>
            {weeklyTasks.map((task: any) => {
              return (
                <Task setReload={setReload} props={task} key={task.id}></Task>
              );
            })}
          </div>
        )}
      </section>
      <section className="task-list-container">
        <h2 className="today">Upcoming</h2>
        {upcomingTasks.length === 0 ? (
          <div className="no-tasks">
            <p>No upcoming tasks</p>
          </div>
        ) : (
          <div>
            {upcomingTasks.map((task: any) => {
              return (
                <Task setReload={setReload} props={task} key={task.id}></Task>
              );
            })}
          </div>
        )}
      </section>
      <section className="task-list-container">
        <h2 className="today">Past</h2>
        {pastTasks.length === 0 ? (
          <div className="no-tasks">
            <p>No prior tasks</p>
          </div>
        ) : (
          <div>
            {pastTasks.map((task: any) => {
              return (
                <Task setReload={setReload} props={task} key={task.id}></Task>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};
