import GET_TASKS from "../graphql/queries/getTasks";
import React, { useEffect, useState } from "react";
import { Task } from "./Task";
import { format, isThisWeek, compareAsc } from "date-fns";
import { useApolloClient } from "@apollo/client";
import "../assets/styles/tasks.scss";

interface Itask {
  date: Date;
  id: string;
  isCompleted: Boolean;
  name: string;
  __typename: string;
}

export const Tasklist = () => {
  const client = useApolloClient();
  const [reload, setReload] = useState(false);
  const [todaysTasks, setTodaysTasks] = useState<Itask[]>([]);
  const [weeklyTasks, setWeeklyTasks] = useState<Itask[]>([]);
  const [upcomingTasks, setUpcomingTasks] = useState<Itask[]>([]);
  const [pastTasks, setPastTasks] = useState<Itask[]>([]);
  useEffect(() => {
    getTasks();
    setReload(false);
  }, [reload]);

  const getTasks = async () => {
    let todayTask: Itask[] = [];
    let weekTask: Itask[] = [];
    let upcomingTask: Itask[] = [];
    let pastTasks: Itask[] = [];
    let tasks = await client.query({
      query: GET_TASKS,
    });

    tasks.data.task.map((task: Itask) => {
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
    console.log(todayTask);
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
