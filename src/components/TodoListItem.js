import { React, useState } from 'react';
import style from './TodoListItem.module.css';
import { ReactComponent as Trash } from '../icons/deleteIcon.svg';
import { ReactComponent as Edit } from '../icons/editIcon.svg';
import PropTypes from 'prop-types';

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
    <li className={style.listItem}>
      <div className={style.listRow}>
        {item.title}
        <div className={style.content} style={viewMode}>
          <button className={style.BtnEdit} onClick={handleEditing}>
            <Edit />
          </button>
          <button
            className={style.BtnRemove}
            type="button"
            onClick={() => {
              onRemoveTodo(item.id);
            }}
          >
            <Trash />
          </button>
        </div>
      </div>
      <input
        type="text"
        value={updateInput}
        className={style.textInput}
        style={editMode}
        onChange={(e) => {
          setUpdateInput(e.target.value);
        }}
        onKeyDown={handleUpdatedDone}
      />
    </li>
  );
};

TodoListItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  onRemoveClicked: PropTypes.func,
  setUpdate: PropTypes.func,
};

export default TodoListItem;
