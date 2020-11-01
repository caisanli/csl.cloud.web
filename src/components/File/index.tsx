import React from 'react';
import Toolbar from './toolbar';
import { IFileContainerProps } from '@/types';
import {
  DownloadOutlined,
  ShareAltOutlined,
  DeleteOutlined,
  EditOutlined,
  CopyOutlined,
} from '@ant-design/icons';
import styles from './index.module.less';

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

export default function File(props: IFileContainerProps) {
  function onClickToolbar(tool) {}
  return (
    <>
      <Toolbar tools={tools} canCreateFolder onClick={onClickToolbar} />
    </>
  );
}
