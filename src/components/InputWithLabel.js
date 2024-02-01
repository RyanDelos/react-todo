import React from 'react';
import style from './TodoListItem.module.css';
import PropTypes from 'prop-types';

const InputWithLabel = ({ inputId, children, value, onChange }) => {
  const inputRef = React.useRef();

  React.useEffect(() => {
    inputRef.current.focus();
  });
  return (
    <>
      <label htmlFor={inputId}>{children}</label>
      <input
        id={inputId}
        className={style.input}
        name="title"
        onChange={onChange}
        ref={inputRef}
        value={value}
        placeholder={`What is the task?`}
        type="text"
      ></input>
    </>
  );
};

InputWithLabel.propTypes = {
  children: PropTypes.string,
  inputId: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default InputWithLabel;
