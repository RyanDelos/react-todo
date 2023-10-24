import React from 'react';
import TodoListItem from './TodoListItem';

const TodoList = ({ todoList }) => {
  return (
    <ul>
      {todoList.map((item) => {
        return <TodoListItem key={item.objectID} todo={item} />;
      })}
    </ul>
  );
};

export default TodoList;
