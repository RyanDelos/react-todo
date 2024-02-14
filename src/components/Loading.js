import React from 'react';
import style from '../styles/Loading.module.css';

const Loading = () => {
  return (
    <div className={style.ring}>
      Loading
      <span className={style.spanRing}></span>
    </div>
  );
};

export default Loading;
