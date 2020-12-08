import React, { useState } from 'react';
import { Button, Input, Dropdown, Menu } from 'antd';
import { FileModelState, ConnectProps, connect } from 'umi';
import Upload from '@/components/Upload';
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
import { Folder } from '../FileOperate';
const { Search } = Input;

interface IProps extends ConnectProps {
  file: FileModelState;
  canCreateFolder?: boolean;
  tools?: IToolBar[];
  onClick?: (data: IToolBar) => void;
  onSuccess?: (data?: any) => void;
}

const IndexPage = function(props: IProps) {
  const { file, onSuccess } = props;
  /**
   * 点击工具栏按钮
   * @param tool
   */
  function onClick(tool: IToolBar) {
    props.onClick && props.onClick(tool);
  }
  /**
   * 搜索文件
   * @param value
   */
  let searchTimer: NodeJS.Timeout;
  function onSearch(value: string) {
    if (!searchTimer) clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      dispatch({
        name: value,
      });
    }, 800);
  }

  /**
   * 点击排序菜单
   * @param e
   */
  function onClickSortMenu(e) {
    if (e.key === file.sort.type) {
      dispatch({
        sort: {
          ...file.sort,
          order: file.sort.order === 'ASC' ? 'DESC' : 'ASC',
        },
      });
      return;
    }
    dispatch({
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
    file.sort.order === 'ASC' ? SortAscendingOutlined : SortDescendingOutlined;
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
    dispatch({
      style: file.style === 'table' ? 'icon' : 'table',
    });
  }
  function dispatch(payload: any) {
    payload.no = 1;
    props.dispatch &&
      props.dispatch({
        type: 'file/update',
        payload,
      });
  }
  // 文件夹
  const [fceDate, setFceDate] = useState<number>();
  function onCreateFolder() {
    setFceDate(Date.now());
  }
  return (
    <div className={styles.toolbar}>
      <div className={styles.toolbarLeft}>
        <Upload
          action="/file/upload"
          data={{
            folder: file.folder,
          }}
          style={{
            marginRight: '15px',
          }}
          onSuccess={onSuccess}
        >
          <Button size="middle" type="primary" icon={<UploadOutlined />}>
            上传文件
          </Button>
        </Upload>

        {props.canCreateFolder ? (
          <Button
            onClick={onCreateFolder}
            style={{ marginRight: '10px' }}
            icon={<FolderAddOutlined />}
          >
            新建文件夹
          </Button>
        ) : null}
        {props.tools &&
          props.tools.map(tool => (
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
      {/* 创建文件夹 */}
      <Folder
        now={fceDate}
        data={{ parentId: file.folder }}
        type="create"
        onSuccess={onSuccess}
      />
    </div>
  );
};
const mapStateProps = state => ({
  file: state.file,
});
export default connect(mapStateProps)(IndexPage);
