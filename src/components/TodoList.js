import React from 'react';
import TodoListItem from './TodoListItem';
import style from './TodoListItem.module.css';
import PropTypes from 'prop-types';

const TodoList = ({ todoList, onRemoveTodo, setUpdate }) => {
  return (
    <div className={style.ListContainer}>
      <ul>
        {todoList.map((item) => {
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

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ),
  onRemoveTodo: PropTypes.func.isRequired,
  setUpdate: PropTypes.func,
};

export default TodoList;
