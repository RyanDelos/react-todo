import React, { useState } from 'react';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';
import { useAirtable } from './use-airtable';

const App = () => {
  const [todoList, setTodoList] = useState([]);

  const { records, createRecord } = useAirtable();

  const addTodo = (newTodo) => {
    createRecord(newTodo);
    console.log('newTodo:', newTodo);
  };

  return (
    <>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      <p>{}</p>
      <TodoList todoList={records} />
    </>
  );
};

export default App;
