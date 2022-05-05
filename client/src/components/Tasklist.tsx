import { useQuery } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import GET_TASKS from "../graphql/queries/getTasks";
import React, { useEffect, useState } from "react";
import { Task } from "./Task";
import { format, isThisWeek, compareAsc, addDays } from "date-fns";
import { useApolloClient } from "@apollo/client";
import "../assets/styles/tasks.scss";

export const Tasklist = () => {
  const client = useApolloClient();
  const [todaysTasks, setTodaysTasks] = useState([] as any);
  const [weeklyTasks, setWeeklyTasks] = useState([] as any);
  const [upcomingTasks, setUpcomingTasks] = useState([] as any);

  useEffect(() => {
    getTasks();
    // sortTasks()
  }, []);

  const getTasks = async () => {
    let todayTask: any = [];
    let weekTask: any = [];
    let upcomingTask: any = [];
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
      if (isThisWeek(utcDate) === true) {
        weekTask.push(task);
      }
      if (
        compareAsc(utcDate, new Date(time)) !== -1 &&
        isThisWeek(utcDate) === false
      ) {
        upcomingTask.push(task);
      }
    });
    setTodaysTasks(todayTask);
    setWeeklyTasks(weekTask);
    setUpcomingTasks(upcomingTask);
  };

  function getDate() {
    const timeElapsed = Date.now();
    const today = format(new Date(timeElapsed), "P");
    return today;
  }

  return (
    <div className="task-list-container">
      <section className="task-container-home">
        <h2 className="today">Today</h2>
        {todaysTasks.map((task: any) => {
          return <Task props={task} key={task.id}></Task>;
        })}
      </section>
      <section className="task-container-home">
        <h2 className="today">This Week</h2>
        {weeklyTasks.map((task: any) => {
          return <Task props={task} key={task.id}></Task>;
        })}
      </section>
      <section className="task-container-home">
        <h2 className="today">Upcoming</h2>
        {upcomingTasks.map((task: any) => {
          return <Task props={task} key={task.id}></Task>;
        })}
      </section>
    </div>
  );
};
