import React from 'react';
import TodoListItem from './TodoListItem';

const todoList = [
  {
    objectID: 0,
    title: 'complete lesson 1',
  },
  {
    objectID: 1,
    title: 'workout',
  },
  {
    objectID: 2,
    title: 'laundry',
  },
];

function TodoList() {
  return (
    <ul>
      {todoList.map(function (item) {
        return <TodoListItem key={item.objectID} todo={item} />;
      })}
    </ul>
  );
}

export default TodoList;
