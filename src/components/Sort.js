import React from 'react';
import style from '../styles/Application.module.css';

const Sort = ({ onSortTodo }) => {
  return (
    <div className={style.selectBox}>
      <select onChange={onSortTodo}>
        <option value="asc">ASC</option>
        <option value="dsc">DSC</option>
      </select>
    </div>
  );
};

export default Sort;
