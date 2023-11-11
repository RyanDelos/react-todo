import React from 'react';

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
        name="title"
        onChange={onChange}
        ref={inputRef}
        value={value}
      ></input>
    </>
  );
};

export default InputWithLabel;
