import React, { useEffect, useState } from "react";
import "../App.css";
import "../components/styles.css";
import Task from "../components/Task";

const TodoList = (props) => {
  const [search, setSeacrh] = useState("");
  const [selected, setSelected] = useState([]);
  const [taskList, setTaskList] = useState(props.taskList);

  const selectTask = (index) => {
    let newSelected = [...selected];
    if (newSelected.indexOf(index) !== -1) {
      newSelected.splice(newSelected.indexOf(index), 1);
    } else {
      newSelected.push(index);
    }
    setSelected(newSelected);
  };

  const deleteMultiTasks = () => {
    props.deleteMultiTasks(selected);
    setSelected([]);
  };

  useEffect(() => {
    if (search !== "") {
      let newTaskList = [...props.taskList].filter((task) =>
        task.title.includes(search)
      );
      setTaskList(newTaskList);
    } else {
      setTaskList(props.taskList);
    }
  }, [props.taskList]);

  useEffect(() => {
    if (search !== "") {
      let newTaskList = [...taskList].filter((task) =>
        task.title.includes(search)
      );
      setTaskList(newTaskList);
    } else {
      setTaskList(props.taskList);
    }
  }, [search]);

  return (
    <div id="TodoList">
      <div id="TodoList_body">
        <p className="title">To Do List</p>
        <input
          placeholder="Search ..."
          className="input"
          id="search"
          type="text"
          onChange={(e) => setSeacrh(e.target.value)}
        ></input>
        <div
          id="taskList"
          style={
            selected.length !== 0 && props.taskList.length !== 0
              ? {
                  height: "378px",
                }
              : { height: "410px" }
          }
        >
          {taskList.map((task, index) => {
            return (
              <Task
                key={index}
                task={task}
                index={props.taskList.indexOf(task)}
                updateTask={props.updateTask}
                deleteTask={props.deleteTask}
                selectTask={selectTask}
                selected={selected.length > 0 ? true : false}
              />
            );
          })}
        </div>
      </div>
      <div
        id="bulkAction"
        style={
          selected.length !== 0 && props.taskList.length !== 0
            ? {}
            : { display: "none" }
        }
      >
        <div>Bulk Action:</div>
        <div className="task_part">
          <button className="detailButton" id="doneButton">
            Done
          </button>
          <button
            style={{ marginLeft: "10px" }}
            className="removeButton"
            onClick={() => deleteMultiTasks()}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
