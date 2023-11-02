import React, { useState } from 'react';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';

const useSemiPersistentState = () => {
  const [todoList, setTodoList] = useState(
    JSON.parse(localStorage.getItem('savedTodoList')) || []
  );
  // const todoListJSON = JSON.parse(todoList);

  React.useEffect(() => {
    localStorage.setItem('savedTodoList', JSON.stringify(todoList));
  }, [todoList]);

  return [todoList, setTodoList];
};

const App = () => {
  // const [setNewTodo] = useState('');
  const [todoList, setTodoList] = useSemiPersistentState();

  const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo]);
    console.log(todoList);
  };

  // console.log(`todoList variable type: ${typeof JSON.parse(todoList)}`);
  return (
    <>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      <p>{}</p>
      <TodoList todoList={todoList} />
    </>
  );
};

export default App;
