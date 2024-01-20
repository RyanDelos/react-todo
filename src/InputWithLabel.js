import React from 'react';
import style from './TodoListItem.module.css';

const InputWithLabel = ({ children, value, onChange }) => {
  const inputRef = React.useRef();

  React.useEffect(() => {
    inputRef.current.focus();
  });
  return (
    <>
      <label htmlFor="todoTitle">{children}</label>
      <input
        id="todoTitle"
        className={style.Input}
        name="title"
        onChange={onChange}
        ref={inputRef}
        value={value}
        placeholder={`What is the task?`}
      ></input>
    </>
  );
};

export default InputWithLabel;
