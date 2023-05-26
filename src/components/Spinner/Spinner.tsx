import { Spin } from 'antd';

import classes from './Spinner.module.scss';
const Spinner = () => (
  <div className={classes.spinner}>
    <Spin size="large" />
  </div>
);
export default Spinner;
