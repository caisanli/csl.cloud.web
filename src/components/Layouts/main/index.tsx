import React from 'react';
import styles from './index.module.less';

export default function Main(props) {
  return <div className={styles.main}>{props.children}</div>;
}
