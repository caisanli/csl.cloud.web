import React, { useState, useRef } from 'react';
import FileContainer from '@/components/FileContainer';
import { Folder, Rename } from '@/components/FileOperate';
import {
  DownloadOutlined,
  ShareAltOutlined,
  DeleteOutlined,
  EditOutlined,
  CopyOutlined,
} from '@ant-design/icons';
import { IContextMenu, IToolBar } from '@/types';

const tools: IToolBar[] = [
  {
    name: '下载',
    type: 'download',
    icon: <DownloadOutlined />,
    onClick() {

    }
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

const contextMenu: IContextMenu[] = [{
  name: '',
  value: '',
  icon: null,
  onClick() {

  }
}]

export default function Index() {
  const data: any[] = [];
  for (let i = 0; i < 300; i++) {
    data.push({
      id: i,
      name: '文件 - ' + i,
      size: '1.5M',
      modifyDate: '2020/11/14 05:55:23',
    });
  }
  // 文件夹相关
  const [folderVisible, setFolderVisible] = useState(false);
  const folderForm = useRef();
  function onCreateFolder() {
    setFolderVisible(true);
  }
  function onSubmitCreateFolder(values: any) {
    setFolderVisible(false);
  }
  // 重命名相关
  const [renameVisible, setRenameVisible] = useState(false);
  const renameForm = useRef();
  return (
    <>
      <FileContainer dataSource={data} type="person" canCreateFolder onCreateFolder={ onCreateFolder } tools={tools} contextMenu={contextMenu} />
      <Folder ref={ folderForm } visible={ folderVisible } onSubmit={ onSubmitCreateFolder } onCancel={ () => setFolderVisible(false) } />
      <Rename ref={ renameForm } visible={ renameVisible } />
    </>
  );
}
