import React, { useState } from 'react';

const EditableText = ({ todo, onSave }) => {
  const [editing, setEditing] = useState(false);
  const [inputText, setInputText] = useState(todo.title);

  const handleClick = () => {
    setEditing(true);
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleInputBlur = () => {
    setEditing(false);
    // console.log(todo.title, inputText)
    // if(todo.title === inputText) return

    todo.title = inputText
    onSave(todo);
  };

  return (
    <>
      {editing ? (
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          autoFocus
        //   size={inputText.length}
        />
      ) : (
        <span onClick={handleClick}>{todo.title}</span>
      )}
    </>
  );
};

export default EditableText;
