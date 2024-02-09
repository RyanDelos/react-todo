import React, { useState } from 'react';
import InputWithLabel from './InputWithLabel';
import style from './TodoListItem.module.css';
import { ReactComponent as Add } from '../icons/addIcon.svg';
import PropTypes from 'prop-types';

const titleId = 'todoTitle';
const AddTodoForm = ({ onAddTodo }) => {
  const [todoTitle, setTodoTitle] = useState('');

  const handleTitleChange = (event) => {
    let newTodoTitle = event.target.value;
    setTodoTitle(newTodoTitle);
  };

  const handleAddTodo = (event) => {
    event.preventDefault();

    if (!todoTitle.length) {
      alert('Please provide a title');
      return;
    }

    onAddTodo(todoTitle);

    setTodoTitle('');
  };

  return (
    <div className={style.FormContainer}>
      <form className={style.form} onSubmit={handleAddTodo}>
        <InputWithLabel
          value={todoTitle}
          onChange={handleTitleChange}
          inputId={titleId}
        ></InputWithLabel>
        <button className={style.BtnAdd} type="submit">
          <Add />
        </button>
      </form>
    </div>
  );
};

AddTodoForm.propTypes = {
  onAddTodo: PropTypes.func.isRequired,
};

export default AddTodoForm;
