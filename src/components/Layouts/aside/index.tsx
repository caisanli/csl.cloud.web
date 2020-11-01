import React, { useState } from 'react';
import { INavItem } from '@/types';
import IconFont from '@/components/IconFont';
import styles from './index.module.less';
import nav from './nav';

export default function Aside() {
  const [active, setActive] = useState(nav[0].value);
  function onClickNav(item: INavItem) {
    setActive(item.value);
  }
  const iconStyle = {
    marginRight: '5px',
  };
  return (
    <div className={styles.aside}>
      {nav.map(item => (
        <div
          onClick={() => onClickNav(item)}
          className={[
            styles.navItem,
            item.value === active ? styles.active : '',
          ].join(' ')}
          key={item.value}
        >
          {item.icon ? <IconFont style={iconStyle} type={item.icon} /> : null}
          <span>{item.name}</span>
        </div>
      ))}
    </div>
  );
}
