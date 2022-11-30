import React, { useState } from 'react';
import '../todoStyles/todo';

export default function Todo() {
  // States of the component
  const [todos, setTodos] = useState('');
  const [tasks, setTasks] = useState([]);
  const [cmplt, setCmplt] = useState(false);
  const [todoEditing, setTodoEditing] = useState(null);
  const [editingText, setEditingText] = useState('');

  // storing/taking the input
  function handleChange(event) {
    setTodos(event.target.value);
  }

  // marking the completed tasks
  function completeToggle(id) {
    const completed = tasks.map((item, idx) => {
      if (idx === id) {
        setCmplt(!cmplt);
      }
      return item;
    });
    setTasks(completed);
  }

  function handleDlt(id) {
    const filtered = tasks.filter((item, idx) => id !== idx);
    setTasks(filtered);
  }

  // editing the item in the list
  function submitEdits(id) {
    const updatedTodos = tasks.map((todo, idx) => {
      if (idx === id) {
        todo = editingText;
      }
      return todo;
    });
    setTasks(updatedTodos);
    setTodoEditing(null);
  }

  // handling states on submition and preventing the default
  function handleSubmit(event) {
    event.preventDefault();
    setTasks([...tasks, todos]);
    console.log(todos);
    setTodos('');
  }

  return (
    <div>
      <div className="container">
        <div className="heading">
          <h1>To-do List</h1>
        </div>
        <div className="form">
          <form action="" onSubmit={handleSubmit}>
            <input
              type="text"
              onChange={handleChange}
              value={todos}
              className="inpt"
            />
            <button className="form-btn">Add</button>
          </form>
        </div>
      </div>

      <div className="taskList">
        {tasks.map((item, idx) => {
          return (
            <li key={idx} className="list">
              {idx === todoEditing ? (
                <input
                  type="text"
                  onChange={(event) => setEditingText(event.target.value)}
                  value={editingText}
                />
              ) : (
                <p> {item} </p>
              )}

              <div className="todo-actions">
                {idx === todoEditing ? (
                  <button onClick={() => submitEdits(idx)}>Submit Edits</button>
                ) : (
                  <button onClick={() => setTodoEditing(idx)}>Edit</button>
                )}
              </div>

              <input type="checkbox" onClick={() => completeToggle(idx)} />
              <button className="dlt-btn" onClick={() => handleDlt(idx)}>
                Delete
              </button>
              <input type="date" name="" id="date" />
            </li>
          );
        })}
      </div>
    </div>
  );
}
