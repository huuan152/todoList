import "./App.css";
import NewTask from "./screens/NewTask";
import TodoList from "./screens/TodoList";
import { useEffect, useState } from "react";

function App() {
  const [taskList, setTaskList] = useState(
    JSON.parse(window.localStorage.getItem("TaskList"))
  );

  useEffect(() => {
    window.localStorage.setItem("TaskList", JSON.stringify(taskList));
  }, [taskList]);

  const newTask = (task) => {
    let newTaskList = [...taskList, task];
    newTaskList.sort((a, b) => a.dueDate - b.dueDate);
    setTaskList(newTaskList);
  };

  const updateTask = (index, task) => {
    let newTaskList = [...taskList];
    newTaskList[index] = task;
    newTaskList.sort((a, b) => a.dueDate - b.dueDate);
    setTaskList(newTaskList);
  };

  const deleteTask = (index) => {
    let newTaskList = [...taskList];
    newTaskList.splice(index, 1);
    setTaskList(newTaskList);
  };

  const deleteMultiTasks = (indexes) => {
    let newTaskList = [...taskList];
    indexes.sort((a, b) => b - a);
    for (const index of indexes) {
      newTaskList.splice(index, 1);
    }
    setTaskList(newTaskList);
  };

  return (
    <div className="App">
      <NewTask addNewTask={newTask} />
      <TodoList
        taskList={taskList}
        updateTask={updateTask}
        deleteTask={deleteTask}
        deleteMultiTasks={deleteMultiTasks}
      />
    </div>
  );
}

export default App;
