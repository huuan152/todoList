import React, { useEffect, useState } from "react";
import { BsCheck2Square, BsSquare } from "react-icons/bs";
import TaskDetail from "./TaskDetail";

const Task = (props) => {
  const [checked, setChecked] = useState(false);
  const [showTaskDetail, setShowTaskDetail] = useState(false);

  const selectTask = () => {
    setChecked(!checked);
    props.selectTask(props.index);
  };

  const isUpdated = (isTrue) => {
    setShowTaskDetail(!isTrue);
  };

  const deleteTask = () => {
    setShowTaskDetail(false);
    props.deleteTask(props.index);
  };

  useEffect(() => {
    if (props.selected === false) {
      setChecked(false);
    }
  }, [props.selected]);

  return (
    <>
      <div className="task">
        <div
          className="task_part"
          onClick={selectTask}
          style={{ paddingRight: "5px", textAlign: "left" }}
        >
          {checked ? <BsCheck2Square /> : <BsSquare />}
        </div>
        <div className="taskTitle">{props.task.title}</div>
        <div className="task_part">
          <button
            className="detailButton"
            onClick={() => setShowTaskDetail(!showTaskDetail)}
          >
            Detail
          </button>
          <button className="removeButton" onClick={() => deleteTask()}>
            Remove
          </button>
        </div>
      </div>
      {showTaskDetail && (
        <TaskDetail
          newTask={false}
          task={props.task}
          index={props.index}
          updateTask={props.updateTask}
          isUpdated={isUpdated}
        />
      )}
    </>
  );
};

export default Task;
