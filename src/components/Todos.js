import React, { Component } from "react";
import TodoItem from "./TodoItem";
import PropTypes from "prop-types";

const Todos = ({ todos, markComplete, updateTodo, delTodo }) => {
  return todos.map((todo) => (
    <TodoItem
      key={todo.id}
      todo={todo}
      markComplete={markComplete}
      updateTodo={updateTodo}
      delTodo={delTodo}
    />
  ));
};

// PropTypes
Todos.propTypes = {
  todos: PropTypes.array.isRequired,
};

export default Todos;
