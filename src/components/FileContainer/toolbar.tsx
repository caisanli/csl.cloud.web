import React, { useState, FC } from 'react';
import { Upload, Button, Input, Dropdown, Menu } from 'antd';
import { FileModelState, ConnectProps, connect } from 'umi';
import { IToolBar } from '@/types';
import {
  UploadOutlined,
  FolderAddOutlined,
  SortAscendingOutlined,
  CheckOutlined,
  SortDescendingOutlined,
  AppstoreOutlined,
  MenuOutlined,
} from '@ant-design/icons';
import styles from './index.module.less';
const { Search } = Input;

interface IProps extends ConnectProps {
  file: FileModelState;
  canCreateFolder?: boolean;
  tools: IToolBar[];
  onSearch?: (name: string) => void;
  onCreateFolder?: () => void;
}

const IndexPage: FC<IProps> = function(props) {
  const { file } = props;
  /**
   * 点击工具栏按钮
   * @param tool
   */
  function onClick(tool: IToolBar) {
    if (tool.onClick) tool.onClick();
  }
  /**
   * 搜索文件
   * @param value
   */
  function onSearch(value: string) {
    if (props.onSearch) props.onSearch(value);
  }

  /**
   * 点击排序菜单
   * @param e
   */
  function onClickSortMenu(e) {
    if (e.key === file.sort.type) {
      dispatch('file/setSort', {
        sort: {
          ...file.sort,
          order: file.sort.order === 'asc' ? 'desc' : 'asc',
        },
      });
      return;
    }
    dispatch('file/setSort', {
      sort: {
        ...file.sort,
        type: e.key,
      },
    });
  }
  // 排序菜单
  const sortMenus = [
    { name: '文件名', value: 'name' },
    { name: '大小', value: 'size' },
    { name: '修改日期', value: 'modifyDate' },
  ];
  const SortIcon =
    file.sort.order === 'asc' ? SortAscendingOutlined : SortDescendingOutlined;
  const sortMenu = (
    <Menu onClick={onClickSortMenu}>
      {sortMenus.map(item => (
        <Menu.Item key={item.value}>
          {file.sort.type === item.value ? <CheckOutlined /> : null}
          {item.name}
        </Menu.Item>
      ))}
    </Menu>
  );
  // 列表显示方式
  const StyleIcon = file.style === 'table' ? AppstoreOutlined : MenuOutlined;
  function onChangeStyle() {
    dispatch('file/setStyle', {
      style: file.style === 'table' ? 'icon' : 'table',
    });
  }
  function dispatch(type, payload) {
    props.dispatch &&
      props.dispatch({
        type,
        payload,
      });
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
          <Button
            onClick={props.onCreateFolder}
            style={{ marginRight: '10px' }}
            icon={<FolderAddOutlined />}
          >
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
        <Search placeholder="输入文件名" onSearch={onSearch} />
        {/* 排序方式 */}
        <Dropdown overlay={sortMenu}>
          <Button icon={<SortIcon />} />
        </Dropdown>
        {/* 列表显示方式 */}
        <Button
          style={{
            marginLeft: '5px',
          }}
          onClick={onChangeStyle}
          icon={<StyleIcon />}
        />
      </div>
    </div>
  );
};
const mapStateProps = state => ({
  file: state.file,
});
export default connect(mapStateProps)(IndexPage);
