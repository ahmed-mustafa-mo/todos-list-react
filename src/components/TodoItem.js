import React, { Component } from "react";
import PropTypes from "prop-types";
import EditableText from "./EditableText";

const TodoItem = ({todo, updateTodo, markComplete, delTodo}) => {
  const getStyle = () => {
    return {
      background: "#f4f4f4",
      padding: "10px",
      borderBottom: "1px #ccc dotted",
      textDecoration: todo.completed ? "line-through" : "none",
    };
  };

    const { id, completed } = todo;

    return (
      <div style={getStyle()}>
        <p>
          <input
            type="checkbox"
            checked={completed}
            onChange={() => markComplete(id)}
          />{" "}

          <EditableText todo={todo} onSave={updateTodo} />
          <button onClick={() => delTodo(id)} style={btnStyle}>
            x
          </button>
        </p>
      </div>
    );
  }

// PropTypes
TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
};

const btnStyle = {
  background: "#ff0000",
  color: "#fff",
  border: "none",
  padding: "5px 9px",
  borderRadius: "50%",
  cursor: "pointer",
  float: "right",
};

export default TodoItem;
