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


  const CHUNK_SIZE = 1024 * 1024 * 5;
  function fileChange(e) {
      const file = e.target.files[0];
      const chunks = Math.ceil(file.size / CHUNK_SIZE);
      upload(chunks, file)
  }

  function upload(total, file, index = 0) {
      if(index >= total) {
          alert('上传完成')
          return ;
      }
      const formData = new FormData();
      formData.append('name', file.name)
      formData.append('size', file.size);
      formData.append('chunks', total)
      formData.append('chunk', (index + 1) + '');
      formData.append('folder', '0');
      formData.append('modifyDate', new Date(file.lastModifiedDate).getTime() + '')
      let start = index * CHUNK_SIZE;
      let end = CHUNK_SIZE * (index + 1);
      end = end > file.size ? file.size : end;
      formData.append('file', file.slice(start, end))
      fetch('http://127.0.0.1:3000/apis/file/upload', {
          method: 'POST',
          body: formData,
          credentials: 'include'
      }).then(res => {
          return res.json();
      }).then(res => {
        if(res.code === 1)
          upload(total, file, ++index)
      }).catch(err => {
          console.log(err)
      })
  }

  function login() {
    let body = JSON.stringify({
      name: '测试125',
      password: 'Aa123456!'
    })
    fetch('http://127.0.0.1:3000/apis/login', {
      method: 'POST',
      body,
      headers: {
        'content-type': 'application/json'
      },
      credentials: 'include'
    }).then(res => {
      return res.json();
    }).then(res => {
      console.log(res);
    })
  }
  return (
    <>
      <FileContainer dataSource={data} type="person" canCreateFolder onCreateFolder={ onCreateFolder } tools={tools} contextMenu={contextMenu} />
      <Folder ref={ folderForm } visible={ folderVisible } onSubmit={ onSubmitCreateFolder } onCancel={ () => setFolderVisible(false) } />
      <Rename ref={ renameForm } visible={ renameVisible } />
      <input type="file" onChange={ fileChange } />
      <button onClick={ login }>登录</button>
    </>
  );
}
