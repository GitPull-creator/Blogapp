import { Spin } from 'antd';

import classes from './Spinner.module.scss';
const Spinner = () => (
  <div className={classes.spinner}>
    <Spin size="large" tip="Loading..." />
  </div>
);
export default Spinner;
