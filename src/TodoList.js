import React from 'react';
import TodoListItem from './TodoListItem';
import style from './TodoListItem.module.css';

const TodoList = ({ todoList, onRemoveTodo, setUpdate }) => {
  return (
    <div className={style.ListContainer}>
      <ul>
        {todoList.map((item) => {
          // console.log('TodoList setUpdate: ', setUpdate);
          return (
            <TodoListItem
              key={item.id}
              item={item}
              onRemoveTodo={onRemoveTodo}
              setUpdate={setUpdate}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default TodoList;
