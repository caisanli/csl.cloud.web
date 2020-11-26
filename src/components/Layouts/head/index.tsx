import React, { FC, useState } from 'react';
import { Dropdown, Menu } from 'antd';
import { DownOutlined, LogoutOutlined } from '@ant-design/icons';
import { ConnectProps, history, UserModelState, AminModelState, connect } from 'umi';
import { INavItem } from '@/types';
import api from '@/api/login'
import styles from './index.module.less';

interface IProps extends ConnectProps {
  nav: INavItem[],
  type: 'user' | 'admin',
  user: UserModelState,
  admin: AminModelState
}

const IndexPage: FC<IProps> = (props) => {
  const { nav, type, user, admin } = props;
  const localNavActive = localStorage.getItem('topNavActive');
  const [active, setActive] = useState(localNavActive || nav[0].value);
  localStorage.setItem('topNavActive', active);
  function onClickItem(item: INavItem) {
    if (item.value === active) return;
    localStorage.setItem('asideNavActive', 'file');
    localStorage.setItem('topNavActive', item.value);
    setActive(item.value);
    history.push(item.path);
  }
  // 名称
  console.log('admin：', admin)
  const name = type === 'admin' ? admin.name : user.info.name;
  // 下拉菜单
  const dropMenu = (
    <Menu onClick={ onClickDropdown }>
      <Menu.Item key="logout">
        <LogoutOutlined />
        退出
      </Menu.Item>
    </Menu>
  );
  // 下拉菜单点击事件
  function onClickDropdown({ key }) {
    switch(key) {
      case 'logout':
        logout();
        break;
    }
  }
  // 退出
  async function logout() {
    if(type === 'admin') {
      await api.adminLogout();
      history.push('/admin/login')
    } else {
      await api.logout();
      history.push('/login')
    }
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
        <Dropdown overlay={ dropMenu } trigger={['click']}>
          <div className={styles.user}>
            <img src="" className={styles.userPic} />
            <span className={styles.userName}>
              { name } <DownOutlined />
            </span>
          </div>
          {/* <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            Hover me <DownOutlined />
          </a> */}
        </Dropdown>

      </div>
    </div>
  );
}
const mapStateToProps = state => {
  return ({
    user: state.user,
    admin: state.admin
  });
}

export default connect(mapStateToProps)(IndexPage);
