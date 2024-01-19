import React from 'react';
import TodoListItem from './TodoListItem';
import style from './TodoListItem.module.css';

const TodoList = ({ todoList, onRemoveTodo }) => {
  return (
    <div className={style.ListContainer}>
      <ul>
        {todoList.map((item) => {
          return (
            <TodoListItem
              key={item.id}
              item={item}
              onRemoveTodo={onRemoveTodo}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default TodoList;
