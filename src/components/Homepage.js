import React from 'react';
import { Link } from 'react-router-dom';
import style from '../styles/Homepage.module.css';

const HomePage = () => {
  return (
    <div className={style.homePageContainer}>
      <h1 className="homePageHeading">Be More Productive, Start Today! </h1>
      <p className="homePageParagraph">
        A simple todo list app to track your tasks
      </p>
      <button className={style.homePageButton}>
        <Link className={style.homePageLink} to="/list">
          Todo List
        </Link>
      </button>
    </div>
  );
};

export default HomePage;
