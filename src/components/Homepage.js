import React from 'react';
import { Link } from 'react-router-dom';
import style from '../styles/Homepage.module.css';
import { ReactComponent as Github } from '../icons/githubIcon.svg';
import { ReactComponent as LinkedIn } from '../icons/linkedinIcon.svg';

const HomePage = () => {
  return (
    <div className={style.homePageContainer}>
      <h1 className={style.homePageHeading}>
        Be More Productive, Start Today!
      </h1>
      <h3 className={style.homePageSubHeading}>
        A simple todo list app to track your tasks
      </h3>
      <button className={style.homePageButton}>
        <Link className={style.homePageLink} to="/list">
          Todo List
        </Link>
      </button>
      <p className={style.homePageParagraph}>Developed by Ryan Delos Santos</p>
      <div className={style.socialBox}>
        <span className="socialIcon">
          <a href="https://github.com/RyanDelos" target="blank">
            <Github />
          </a>
        </span>
        <span className="socialIcon">
          <a href="https://www.linkedin.com/in/ryan-ds/" target="blank">
            <LinkedIn />
          </a>
        </span>
      </div>
    </div>
  );
};

export default HomePage;
