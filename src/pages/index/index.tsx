import React, { useState, useEffect, FC } from 'react';
import { FileModelState, ConnectProps, connect } from 'umi';
import FileContainer from '@/components/FileContainer';
import { Folder, Rename, delFolder } from '@/components/FileOperate';
import {
  DownloadOutlined,
  ShareAltOutlined,
  DeleteOutlined,
  EditOutlined,
  CopyOutlined,
  ScissorOutlined
} from '@ant-design/icons';
import { IContextMenu, ICrumbItem, IToolBar } from '@/types';
import fileApi from '@/api/file';
import Move from '@/components/FileOperate/Move';
import { copyBtn, delBtn, downBtn, moveBtn, renameBtn, shareBtn } from '@/components/FileContainer/tools';

interface IProps extends ConnectProps {
  file: FileModelState;
}

const tools: IToolBar[] = []

const Index: FC<IProps> = function (props: IProps) {

  // 文件夹菜单
  const folderRightMenu: IContextMenu[] = [
    {
      name: '更新',
      value: 'update',
      icon: <EditOutlined />,
      onClick(data: any) {
        setFId(data.id);
        setFType('update');
        setFceDate(Date.now());
      },
    },
    {
      name: '删除',
      value: 'delete',
      icon: <DeleteOutlined />,
      onClick(data: any) {
        delFolder(data.id, onSuccess);
      },
    },
    {
      name: '分享',
      value: 'share',
      icon: <ShareAltOutlined />,
      onClick(data: any) { },
    },
  ];
  // 文件右键菜单
  const fileRightMenu: IContextMenu[] = [
    {
      name: '重命名',
      value: 'rename',
      icon: <EditOutlined />,
      onClick(data: any) {
        setFileId(data.id);
        setFileName(data.name);
        setRenameDate(Date.now());
      },
    },
    {
      name: '删除',
      value: 'delete',
      icon: <DeleteOutlined />,
      onClick(data: any) { },
    },
    {
      name: '分享',
      value: 'share',
      icon: <ShareAltOutlined />,
      onClick(data: any) { },
    },
    {
      name: '移动到',
      value: 'move',
      icon: <ScissorOutlined />,
      onClick(data: any) { },
    },
    {
      name: '复制到',
      value: 'copy',
      icon: <CopyOutlined />,
      onClick(data: any) { },
    },
  ];

  // 自定义生成右键菜单
  const contextMenu = function (data: any): IContextMenu[] {
    if (data.parentId) return folderRightMenu;
    else return fileRightMenu;
  };

  const [crumbs, setCrumbs] = useState<ICrumbItem[]>([]);
  const [list, setList] = useState([]);
  const {
    folder,
    sort: { order, type },
  } = props.file;
  async function query() {
    const {
      data: { crumbs, files, folders, page },
    } = await fileApi.query(folder, type, order, 1, 10);
    setCrumbs(crumbs);
    setList(folders.concat(files));
  }
  // 文件夹
  const [fceDate, setFceDate] = useState<number>();
  const [fId, setFId] = useState<string>();
  const [fType, setFType] = useState<'create' | 'update'>('create');
  function onCreateFolder() {
    setFType('create');
    setFceDate(Date.now());
  }
  // 文件
  const [renameDate, setRenameDate] = useState<number>();
  const [fileId, setFileId] = useState<string>();
  const [fileName, setFileName] = useState<string>();
  const [ moveDate, setMoveDate ] = useState<number>();
  const [ moveIds, setMoveIds ] = useState<string>();
  const [selected, setSelected] = useState<any[]>([]);
  // 操作完成的回调
  function onSuccess() {
    query();
  }

  // 点击项
  function onClickColumn(data: any) {
    if (data.parentId) { // 点击了文件夹
      props.dispatch && props.dispatch({
        type: 'file/setFolder',
        payload: {
          ...props.file,
          folder: data.id
        }
      })
    } else { // 点击了文件

    }
  }

  // 工具栏
  const [tools, setTools] = useState<IToolBar[]>([]);
  // 监听选中
  function onSelect(data: any[]) {
    let type: number = 0;

    for(let i = 0; i < data.length; i++ ) {
      const d = data[i];
      if(type === 3) break ;
      if(d.parentId) { // 文件夹
        type = type === 1 ? 3 : 2;
      } else { // 文件
        type = type === 2 ? 3 : 1;
      }
    }
    setSelected(data);
    let tools:IToolBar[] = [];
    switch(type) {
      case 1 :
        tools = [shareBtn, downBtn, delBtn, renameBtn, copyBtn, moveBtn];
        break;
      case 2:
        tools = [shareBtn, delBtn, renameBtn];
        break;
      case 3:
        tools = [shareBtn];
        break;
    }
    setTools(tools);
  }
  // 点击工具栏
  function onClickTool(tool: IToolBar) {
    switch(tool.type) {
      case 'move':
        move();
        break;
    }
  }
  function move() {
    let ids: string[] = [];
    selected.forEach(d => {
      ids.push(d.id);
    })
    setMoveIds(ids.join(','));
    setMoveDate(Date.now());
  }
  useEffect(function () {
    query();
  }, [props.file]);

  return (
    <>
      <FileContainer
        dataSource={list}
        type="person"
        canCreateFolder
        crumbs={crumbs}
        onCreateFolder={onCreateFolder}
        tools={tools}
        contextMenu={contextMenu}
        onClickColumn={onClickColumn}
        onSelect={onSelect}
        onClickTool={ onClickTool }
      />
      <Folder
        now={fceDate}
        id={fId}
        data={{ parentId: folder }}
        type={fType}
        onSuccess={onSuccess}
      />
      <Rename
        id={fileId}
        now={renameDate}
        data={{ name: fileName }}
        onSuccess={onSuccess}
      />
      <Move
        now={ moveDate }
        data={{ ids: moveIds }}
        onSuccess={onSuccess}
      />
    </>
  );
};
const mapStateToProps = state => ({
  file: state.file,
});
export default connect(mapStateToProps)(Index);
