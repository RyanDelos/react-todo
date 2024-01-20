import { React, useState } from 'react';
import style from './TodoListItem.module.css';
import { ReactComponent as Trash } from './icons/delete.svg';

const TodoListItem = ({ item, onRemoveTodo, setUpdate }) => {
  const [updateInput, setUpdateInput] = useState(item.title);
  const [editing, setEditing] = useState(false);
  let viewMode = {};
  let editMode = {};
  if (editing) {
    viewMode.display = 'none';
  } else {
    editMode.display = 'none';
  }

  const handleEditing = () => {
    setEditing(true);
  };

  const handleUpdatedDone = (event) => {
    if (event.key === 'Enter') {
      setUpdate(updateInput, item.id);
      setEditing(false);
    }
  };

  return (
    <li className={style.ListItem}>
      <div className={style.ListRow}>
        {item.title}
        <div className={style.content} style={viewMode}>
          <button onClick={handleEditing}>Edit</button>
          <button
            className={style.BtnRemove}
            type="button"
            onClick={() => {
              onRemoveTodo(item.id);
            }}
          >
            <Trash height="16px" width="16px" />
          </button>
        </div>
      </div>
      <input
        type="text"
        value={updateInput}
        className={style.textInput}
        style={editMode}
        onChange={(e) => {
          console.log('e:', e);
          console.log('setUpdateInput:', setUpdateInput);
          console.log('item.id:', item.id);
          console.log('target value: ', e.target.value);
          setUpdateInput(e.target.value);
        }}
        onKeyDown={handleUpdatedDone}
      />
    </li>
  );
};

export default TodoListItem;
