import React, { Component } from "react";
import PropTypes from "prop-types";
import EditableText from "./EditableText";

class TodoItem extends Component {
  getStyle = () => {
    return {
      background: "#f4f4f4",
      padding: "10px",
      borderBottom: "1px #ccc dotted",
      textDecoration: this.props.todo.completed ? "line-through" : "none",
    };
  };

  spanSwitch = (e) => {
    // debugger
    let txt = e.target.innerText;
    let element = document.getElementById("content_element");

    element.appendChild(<input onblur={(e) => this.spanReset(e)} value={txt} />)
    document.getElementsByTagName("input")[0].focus();
  };

  spanReset = (e) => {
    let txt = e.target.innerText;
    let element = document.getElementById("content_element");

    element.innerHTML = (
      <span onclick={(e) => this.spanSwitch(e)}> ${txt} </span>
    );
  };

  render() {
    const { id, title, completed } = this.props.todo;

    return (
      <div style={this.getStyle()}>
        <p>
          <input
            type="checkbox"
            checked={completed}
            onChange={() => this.props.markComplete(id)}
          />{" "}
          <EditableText todo={this.props.todo} onSave={this.props.updateTodo} />
          <button onClick={() => this.props.delTodo(id)} style={btnStyle}>
            x
          </button>
        </p>
      </div>
    );
  }
}

// PropTypes
TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
};

const divStyle = {
  display: "inline",
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
