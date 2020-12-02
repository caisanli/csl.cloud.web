import React, { useState, useEffect, FC } from 'react';
import { FileModelState, ConnectProps, connect } from 'umi';
import FileContainer from '@/components/FileContainer';
import { Folder, Rename, delFolder } from '@/components/FileOperate';
import { DownloadOutlined, ShareAltOutlined, DeleteOutlined, EditOutlined, CopyOutlined, ScissorOutlined } from '@ant-design/icons';
import { IContextMenu, ICrumbItem, IToolBar } from '@/types';
import fileApi from '@/api/file';
import file from '../group/file';
interface IProps extends ConnectProps {
  file: FileModelState;
}
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

const Index: FC<IProps> = function(props: IProps) {

  // 文件夹菜单
const folderRightMenu:IContextMenu[] = [
  {
    name: '更新',
    value: 'update',
    icon: <EditOutlined />,
    onClick(data: any) {
      setFId(data.id);
      setFType('update');
      setFceDate(Date.now());
    }
  }, {
    name: '删除',
    value: 'delete',
    icon: <DeleteOutlined />,
    onClick(data: any) {
      delFolder(data.id, onSuccess)
    }
  }, {
    name: '分享',
    value: 'share',
    icon: <ShareAltOutlined />,
    onClick(data: any) {

    }
  }
]
// 文件右键菜单
const fileRightMenu:IContextMenu[] = [
  {
    name: '重命名',
    value: 'rename',
    icon: <EditOutlined />,
    onClick(data: any) {

    }
  }, {
    name: '删除',
    value: 'delete',
    icon: <DeleteOutlined />,
    onClick(data: any) {

    }
  }, {
    name: '分享',
    value: 'share',
    icon: <ShareAltOutlined />,
    onClick(data: any) {

    }
  }, {
    name: '移动到',
    value: 'move',
    icon: <ScissorOutlined />,
    onClick(data: any) {

    }
  }, {
    name: '复制到',
    value: 'copy',
    icon: <CopyOutlined />,
    onClick(data: any) {

    }
  }
]
// 自定义生成右键菜单
const contextMenu = function(data: any): IContextMenu[] {
  if(data.parentId)
    return folderRightMenu;
   else
    return fileRightMenu;
}

  const [ crumbs, setCrumbs ] = useState<ICrumbItem[]>([]);
  const [ list, setList ] = useState([]);
  const { folder, sort: { order, type }  } = props.file;
  async function query() {
    const { data: { crumbs, files, folders, page } } = await fileApi.query(folder, type, order, 1, 10);
    setCrumbs(crumbs);
    setList(folders.concat(files))
  }
  // 文件夹
  const [ fceDate, setFceDate ] = useState<number>();
  const [ fId, setFId ] = useState<string>();
  const [fType, setFType] = useState<'create' | 'update'>('create');
  function onCreateFolder() {
    setFType('create')
    setFceDate(Date.now());
  }

  // 操作完成的回调
  function onSuccess() {
    query();
  }
  useEffect(function() {
    query();
  }, [])

  return (
    <>
      <FileContainer
        dataSource={ list }
        type="person"
        canCreateFolder
        crumbs={ crumbs }
        onCreateFolder={ onCreateFolder }
        tools={ tools }
        contextMenu={ contextMenu }
      />
      <Folder
        now={ fceDate }
        id={ fId }
        data={{ parentId: folder }}
        type={ fType }
        onSuccess = { onSuccess }
      />
      <Rename />
    </>
  );
}
const mapStateToProps = (state) => ({
  file: state.file
})
export default connect(mapStateToProps)(Index);
