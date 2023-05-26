import { Link } from 'react-router-dom';

import classes from './NotFound.module.scss';

const NotFound = () => {
  return (
    <>
      <div className={classes.message}>
        <p>Page is not found. </p>
        <p>Click the button to return to the Articles Page</p>
      </div>
      <Link to="./articles">
        <button className={classes.btn__back}>Articles Page</button>
      </Link>
    </>
  );
};
export default NotFound;
