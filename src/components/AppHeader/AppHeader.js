import { Link } from "react-router-dom";

import classes from "./AppHeader.module.scss";

function AppHeader() {
  return (
    // eslint-disable-next-line react/jsx-no-comment-textnodes
    <header className={classes.AppHeader}>
      <Link to="/" className={`${classes.AppHeader__text} ${classes.AppHeader__link}`}>
        <span>Realworld Blog</span>
      </Link>
      <div className={classes.AppHeader__wrapper}>
        <p className={`${classes.AppHeader__text} ${classes.AppHeader__status}`}>Sign in</p>
      </div>
    </header>
  );
}

export default AppHeader;
