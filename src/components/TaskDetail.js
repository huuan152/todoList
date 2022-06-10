import React, { useState } from "react";
import DatePicker, { CalendarContainer } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { GoCalendar } from "react-icons/go";
import { RiArrowDownSFill } from "react-icons/ri";
import "./styles.css";
import { format } from "date-fns";

const TaskDetail = (props) => {
  const [title, setTitle] = useState(props.newTask ? "" : props.task.title);
  const [description, setDescription] = useState(
    props.newTask ? "" : props.task.description
  );
  const [dueDate, setDueDate] = useState(
    props.newTask ? new Date() : new Date(props.task.dueDate)
  );
  const [priority, setPriority] = useState(
    props.newTask ? "Normal" : props.task.priority
  );
  const [isOpen, setIsOpen] = useState(false);
  const [showPriority, setShowPriority] = useState(false);
  const [showValidate, setShowValidate] = useState(false);

  const handleSubmit = (e) => {
    setIsOpen(false);
    setShowPriority(false);
    if (title !== "") {
      if (e.target.value === "Add") {
        props.addNewTask({
          title: title,
          description: description,
          dueDate: dueDate,
          priority: priority,
        });
        setTitle("");
        setDescription("");
        setDueDate(new Date());
        setPriority("Normal");
      } else {
        props.updateTask(props.index, {
          title: title,
          description: description,
          dueDate: dueDate,
          priority: priority,
        });
      }
      setShowValidate(false);
      if (!props.newTask) {
        props.isUpdated(true);
      }
    } else {
      setShowValidate(true);
    }
  };

  const MyContainer = ({ className, children }) => {
    return (
      <div style={{ textAlign: "left", height: "0" }}>
        <CalendarContainer className={className}>
          <div
            style={{
              position: "absolute",
              zIndex: "10",
              top: "-10px",
              backgroundColor: "white",
            }}
          >
            {children}
          </div>
        </CalendarContainer>
      </div>
    );
  };

  const prioritySelect = (priority) => {
    setPriority(priority);
    setShowPriority(false);
  };

  return (
    <div
      style={
        props.newTask
          ? { border: "none" }
          : { border: "1px solid black", borderTop: "none", padding: "20px" }
      }
    >
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add new task ..."
        type="text"
        className="input"
        style={showValidate ? { borderColor: "red" } : { borderColor: "black" }}
      ></input>
      <div style={showValidate ? { color: "red" } : { color: "white" }}>
        <div
          style={{
            textAlign: "left",
            paddingTop: "5px",
            fontSize: "12px",
          }}
        >
          Tiêu đề không được để trống!
        </div>
      </div>
      <div className="label">Description</div>
      <textarea
        rows={10}
        className="input"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <div id="selectableArea">
        <div className="selectableItem" style={{ paddingRight: "5px" }}>
          <div className="label">Due Date</div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              paddingLeft: "10px",
              border: "1px solid black",
            }}
          >
            <div
              style={{
                width: "100%",
                textAlign: "left",
              }}
            >
              {format(dueDate, "dd/MM/yyyy")}
            </div>
            <button
              id="calendar"
              onClick={() => setIsOpen(!isOpen)}
              style={{
                height: "fit-content",
                borderLeft: "1px solid black",
              }}
            >
              <GoCalendar fontSize={"23px"} />
            </button>
          </div>
          {isOpen && (
            <DatePicker
              selected={dueDate}
              onChange={(date) => {
                setDueDate(date);
              }}
              minDate={new Date()}
              calendarContainer={MyContainer}
              inline
            />
          )}
        </div>
        <div className="selectableItem">
          <div className="label">Priority</div>
          <div
            className="priorityValue"
            onClick={() => setShowPriority(!showPriority)}
          >
            {priority}
            <RiArrowDownSFill />
          </div>
          {showPriority && (
            <div id="priority">
              <div
                onClick={() => prioritySelect("Low")}
                className="priorityItem"
                style={
                  priority === "Low" ? { backgroundColor: "lightgrey" } : {}
                }
              >
                Low
              </div>
              <div
                onClick={() => prioritySelect("Normal")}
                className="priorityItem"
                style={
                  priority === "Normal" ? { backgroundColor: "lightgrey" } : {}
                }
              >
                Normal
              </div>
              <div
                onClick={() => prioritySelect("High")}
                className="priorityItem"
                style={
                  priority === "High" ? { backgroundColor: "lightgrey" } : {}
                }
              >
                High
              </div>
            </div>
          )}
        </div>
      </div>
      <input
        type="submit"
        value={props.newTask ? "Add" : "Update"}
        onClick={(e) => handleSubmit(e)}
        id="AddButton"
      ></input>
    </div>
  );
};

export default TaskDetail;
