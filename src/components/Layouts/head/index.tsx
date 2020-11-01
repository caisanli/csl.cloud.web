import React, { useState } from 'react';
import { history } from 'umi';
import { INavItem } from '@/types';
import styles from './index.module.less';
console.log(styles);
const nav: INavItem[] = [
  {
    name: '个人',
    value: 'person',
    path: '/index',
  },
  {
    name: '团队',
    value: 'group',
    path: '/group',
  },
];

export default function Head() {
  const [active, setActive] = useState(nav[0].value);

  function onClickItem(item: INavItem) {
    if (item.value === active) return;
    setActive(item.value);
  }

  return (
    <div className={styles.head}>
      <div className={styles.headLeft}>
        <div className={styles.headLogo}>LOGO</div>
        <div className={styles.headNav}>
          {nav.map((item: INavItem) => (
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
