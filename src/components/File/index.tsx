import React from 'react';
import Toolbar from './toolbar';
import Crumb from './crumb'
import List from './List';
import { IFileContainerProps } from '@/types';
import {
  DownloadOutlined,
  ShareAltOutlined,
  DeleteOutlined,
  EditOutlined,
  CopyOutlined,
} from '@ant-design/icons';

const tools = [
  {
    name: '下载',
    type: 'download',
    icon: <DownloadOutlined />,
  },
  {
    name: '分享',
    type: 'share',
    icon: <ShareAltOutlined />,
  },
  {
    name: '删除',
    type: 'delete',
    icon: <DeleteOutlined />,
  },
  {
    name: '重命名',
    type: 'rename',
    icon: <EditOutlined />,
  },
  {
    name: '复制',
    type: 'copy',
    icon: <CopyOutlined />,
  },
  {
    name: '移动到',
    type: 'move',
  },
];
const crumbs = [{
  name: '全部文件',
  id: 0,
  pid: -1
}, {
  name: '文件夹1',
  id: 1,
  pid: 0
}]
export default function File(props: IFileContainerProps) {
  function onClickToolbar(tool) {

  }
  return (
    <>
      {/* 工具栏 */}
      <Toolbar tools={tools} canCreateFolder onClick={onClickToolbar} />
      {/* 面包屑 */}
      <Crumb crumbs={crumbs} />
      {/* 列表 */}
      <List style='table' data={props.data} />
    </>
  );
}
