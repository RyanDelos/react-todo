import React, { useState } from 'react';
import InputWithLabel from './InputWithLabel';
import style from './TodoListItem.module.css';
import { ReactComponent as Check } from './icons/addIcon.svg';

const AddTodoForm = ({ onAddTodo }) => {
  const [todoTitle, setTodoTitle] = useState('');

  const handleTitleChange = (event) => {
    let newTodoTitle = event.target.value;
    setTodoTitle(newTodoTitle);
  };

  const handleAddTodo = (event) => {
    event.preventDefault();

    onAddTodo({
      title: todoTitle,
      id: Date.now(),
    });
    setTodoTitle('');
  };

  return (
    <div className={style.FormContainer}>
      <form className={style.form} onSubmit={handleAddTodo}>
        <InputWithLabel
          value={todoTitle}
          onChange={handleTitleChange}
        ></InputWithLabel>
        <button className={style.BtnAdd} type="submit">
          <Check />
        </button>
      </form>
    </div>
  );
};

export default AddTodoForm;
