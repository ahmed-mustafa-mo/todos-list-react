import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Todos from "./components/Todos";
import Header from "./components/layout/Header";
import AddTodo from "./components/AddTodo";
// import uuid from 'uuid';
import axios from "axios";

import "./App.css";

const App = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos?_limit=10")
      .then((res) => setTodos(res.data))
      .catch((err) =>
        alert(`an error occured while getting todos: ${err.message}`)
      );
  }, []);

  const markComplete = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    );
  };

  const addTodo = (title) => {
    axios
      .post("https://jsonplaceholder.typicode.com/todos", {
        title: title,
        completed: false,
      })
      .then((res) => setTodos([...todos, res.data]))
      .catch((err) =>
        alert(`an error occured while adding todo: ${err.message}`)
      );
  };

  const updateTodo = ({ id, title, completed }) => {
    axios
      .put(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        title: title,
        completed: completed,
      })
      .then((res) => {
        let updatedTodos = todos.map((item) =>
          item.id === id ? { ...res.data } : item
        );

        setTodos([...updatedTodos]);
      })
      .catch((err) =>
        alert(`an error occured while updating todo: ${err.message}`)
      );
  };

  const delTodo = (id) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then((res) =>
        setTodos([...todos.filter((todo) => todo.id !== id)])
      )
      .catch((err) =>
        alert(`an error occured while deleting todo: ${err.message}`)
      );
  };

  return (
    <Router>
      <div className="App">
        <div className="Container">
          <Header />
          <Route
            exact
            path="/"
            render={(props) => (
              <>
                <AddTodo addTodo={addTodo} />
                <Todos
                  todos={todos}
                  markComplete={markComplete}
                  updateTodo={updateTodo}
                  delTodo={delTodo}
                />
              </>
            )}
          />
        </div>
      </div>
    </Router>
  );
};

export default App;
