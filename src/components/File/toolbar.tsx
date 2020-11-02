import React, { ReactNode, useState } from 'react';
import { Upload, Button, Input, Dropdown, Menu } from 'antd';
import { UploadOutlined, FolderAddOutlined, SortAscendingOutlined, CheckOutlined, SortDescendingOutlined, AppstoreOutlined, MenuOutlined } from '@ant-design/icons';
import styles from './index.module.less';
const { Search } = Input;
interface ITool {
  name: string;
  icon?: ReactNode;
  type: string;
}

interface IProps {
  canCreateFolder?: boolean;
  tools: ITool[];
  onClick?: (type: string) => void;
}

export default function(props: IProps) {
  /**
   * 点击工具栏按钮
   * @param tool
   */
  function onClick(tool: ITool) {
    const type = tool.type || '';
    props.onClick && props.onClick(type);
  }
  /**
   * 搜索文件
   * @param value
   */
  function onSearch(value: string) {
    console.log('搜索：' + value);
  }

  /**
   * 点击排序菜单
   * @param e
   */
  function onClickSortMenu(e) {
    if(e.key === sortActive) {
      setAscending(!isAscending);
    }
    setSortActive(e.key);
    console.log('点击排序：', e);
  }
  // 排序菜单
  const sortMenus = [{name: '文件名', value: 'fileName'}, {name: '大小', value: 'size'}, {name: '修改日期', value: 'modifyDate'}]
  // 是否升序
  const [isAscending, setAscending] = useState(false);
  // 设置排序方式
  const [sortActive, setSortActive] = useState(sortMenus[0].value);
  const SortIcon = isAscending ? SortAscendingOutlined : SortDescendingOutlined;
  const sortMenu = (
    <Menu onClick={ onClickSortMenu }>
      {
        sortMenus.map(
          item =>
          <Menu.Item key={ item.value }>
            { sortActive === item.value ? <CheckOutlined /> : null }
            { item.name }
          </Menu.Item>
        )
      }
    </Menu>
  );
  // 列表显示方式
  const [style, setStyle] =  useState('table');
  const StyleIcon = style === 'table' ? AppstoreOutlined : MenuOutlined;
  function onChangeStyle() {
    setStyle(
      style === 'table' ? 'icon' : 'table'
    )
  }

  return (
    <div className={styles.toolbar}>
      <div className={styles.toolbarLeft}>
        <Upload className={styles.uploadBtn}>
          <Button type="primary" icon={<UploadOutlined />}>
            上传
          </Button>
        </Upload>
        {props.canCreateFolder ? (
          <Button style={{ marginRight: '10px' }} icon={<FolderAddOutlined />}>
            新建文件夹
          </Button>
        ) : null}
        {props.tools.map(tool => (
          <Button
            className={styles.toolBtn}
            key={tool.type}
            icon={tool.icon}
            onClick={() => onClick(tool)}
          >
            {tool.name}
          </Button>
        ))}
      </div>
      <div className={styles.toolbarRight}>
          {/* 文件搜索框 */}
          <Search placeholder="输入文件名" onSearch={ onSearch } />
          {/* 排序方式 */}
          <Dropdown overlay={ sortMenu }>
            <Button icon={ <SortIcon /> } />
          </Dropdown>
          {/* 列表显示方式 */}
          <Button style={{
            marginLeft: '5px'
          }} onClick={ onChangeStyle } icon={ <StyleIcon /> } />
      </div>
    </div>
  );
}
