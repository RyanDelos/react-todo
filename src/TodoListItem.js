import React from 'react';
import style from './TodoListItem.module.css';
import { ReactComponent as Trash } from './icons/delete.svg';

const TodoListItem = ({ item, onRemoveTodo }) => {
  return (
    <li className={style.ListItem}>
      <div className={style.ListRow}>
        {item.title}{' '}
        <button
          type="button"
          onClick={() => {
            onRemoveTodo(item.id);
          }}
        >
          <Trash height="16px" width="16px" />
        </button>
      </div>
    </li>
  );
};

export default TodoListItem;
