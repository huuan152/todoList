import React from "react";
import "../App.css";
import TaskDetail from "../components/TaskDetail";

const NewTask = (props) => {
  return (
    <div id="NewTask">
      <p className="title">New Task</p>
      <TaskDetail addNewTask={props.addNewTask} newTask={true} />
    </div>
  );
};

export default NewTask;
