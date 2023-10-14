import React from 'react';

function AddTodoForm({ onAddTodo }) {
  function handleAddTodo(event) {
    event.preventDefault();

    let todoTitle = event.target.title.value;
    onAddTodo(todoTitle);
    event.target.reset();
  }

  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="todoTitle">Title</label>
      <input id="todoTitle" name="title"></input>
      <button type="submit">Add</button>
    </form>
  );
}

export default AddTodoForm;
