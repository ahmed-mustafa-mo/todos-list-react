import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Todos from './components/Todos'
import Header from './components/layout/Header'
import AddTodo from './components/AddTodo'
// import uuid from 'uuid';
import axios from 'axios';

import './App.css';

class App extends Component {
  state = {
    todos: []
  }

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then(res => this.setState({ todos: res.data}))
      .catch(err => alert(`an error occured while getting todos: ${err.message}`))
  }

  markComplete = (id) => {
    this.setState({ todos: this.state.todos.map(todo => {
      if(todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo;
    })})
  }

  addTodo = (title) => {
    axios.post('https://jsonplaceholder.typicode.com/todos', {
      title: title,
      completed: false
    })
      .then(res => this.setState( { todos: [...this.state.todos, res.data]}))
      .catch(err => alert(`an error occured while adding todo: ${err.message}`))
  }

  updateTodo = ({id, title, completed}) => {
    axios.put(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      title: title,
      completed: completed
    })
      .then(res => {
        let updatedTodos = this.state.todos.map(item => item.id === id ? {...res.data} : item)

        this.setState({ todos: [...updatedTodos]})
      })
      .catch(err => alert(`an error occured while updating todo: ${err.message}`))
  }
  
  delTodo = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
    .then(res => this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)]}))
    .catch(err => alert(`an error occured while deleting todo: ${err.message}`));
    
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="Container">
            <Header/>
            <Route exact path="/" render={props => (
              <React.Fragment>
                <AddTodo addTodo={this.addTodo} />
                <Todos todos={this.state.todos} markComplete={this.markComplete} updateTodo={this.updateTodo} delTodo={this.delTodo} />
              </React.Fragment>
            )} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
