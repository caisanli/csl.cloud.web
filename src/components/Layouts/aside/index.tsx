import React, { FC } from 'react';
import { history, AsideModelState, ConnectProps, connect } from 'umi';
import { INavItem } from '@/types';
import IconFont from '@/components/IconFont';
import styles from './index.module.less';

interface IProps extends ConnectProps {
  aside: AsideModelState;
}

const IndexPage: FC<IProps> = function(props) {
  const menu = props.aside.menu;
  const active = props.aside.active;
  function onClickNav(item: INavItem) {
    props.dispatch &&
      props.dispatch({
        type: 'aside/setActive',
        payload: {
          ...props.aside,
          active: item.value,
        },
      });
    localStorage.setItem('asideNavActive', item.value);
    history.push(item.path);
  }
  const iconStyle = {
    marginRight: '5px',
  };
  return (
    <div className={styles.aside}>
      {menu.map(item => (
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
};
const mapStateProps = state => ({
  aside: state.aside,
});
export default connect(mapStateProps)(IndexPage);
