import React, { useState } from 'react';
import { history } from 'umi';
import { INavItem } from '@/types';
import styles from './index.module.less';

type IProps = {
  nav: INavItem[]
}

export default function Head(props: IProps) {
  const localNavActive = localStorage.getItem('topNavActive');
  const [active, setActive] = useState(localNavActive || props.nav[0].value);
  localStorage.setItem('topNavActive', active);
  function onClickItem(item: INavItem) {
    if (item.value === active) return;
    localStorage.setItem('asideNavActive', 'file');
    localStorage.setItem('topNavActive', item.value);
    setActive(item.value);
    history.push(item.path);
  }
  return (
    <div className={styles.head}>
      <div className={styles.headLeft}>
        <div className={styles.headLogo}>LOGO</div>
        <div className={styles.headNav}>
          {props.nav.map((item: INavItem) => (
            <div
              key={item.value}
              className={[
                styles.navItem,
                active === item.value ? styles.active : '',
              ].join(' ')}
              onClick={() => onClickItem(item)}
            >
              {item.name}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.headRight}>
        <div className={styles.user}>
          <img src="" className={styles.userPic} />
          <span className={styles.userName}>我又不是猫先生</span>
        </div>
      </div>
    </div>
  );
}
