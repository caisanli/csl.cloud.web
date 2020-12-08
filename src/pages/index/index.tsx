import React, { useState, useEffect } from 'react';
import { FileModelState, ConnectProps, connect } from 'umi';
import FileContainer from '@/components/FileContainer';
import { Folder, Rename, delFolder, del } from '@/components/FileOperate';
import {
  ShareAltOutlined,
  DeleteOutlined,
  EditOutlined,
  CopyOutlined,
  ScissorOutlined
} from '@ant-design/icons';
import { IContextMenu, ICrumbItem, IPage, IToolBar } from '@/types';
import fileApi from '@/api/file';
import Move from '@/components/FileOperate/Move';
import { copyBtn, delBtn, downBtn, moveBtn, renameBtn, shareBtn } from '@/components/FileContainer/tools';

interface IProps extends ConnectProps {
  file: FileModelState;
}

const Index = function (props: IProps) {

  // 文件夹菜单
  const folderRightMenu: IContextMenu[] = [
    {
      name: '更新',
      value: 'update',
      icon: <EditOutlined />,
      onClick(data: any) {
        setFId(data.id);
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
  const [page, setPage] = useState<IPage>()
  const {
    folder,
    sort: { order, type },
    no
  } = props.file;
  async function query() {
    const {
      data: { crumbs, files, folders, page },
    } = await fileApi.query(folder, type, order, no, 10);
    // console.log('page：', page)
    setPage(page);
    setCrumbs(crumbs);
    setTools([])
    if(no === 1) {
      setList(folders.concat(files));
    } else {
      setList(list.concat(files));
    }
  }
  // 文件夹
  const [fceDate, setFceDate] = useState<number>();
  const [fId, setFId] = useState<string>();
  function onCreateFolder() {
    setFceDate(Date.now());
  }
  // 文件
  const [renameDate, setRenameDate] = useState<number>();
  const [fileId, setFileId] = useState<string>();
  const [fileName, setFileName] = useState<string>();
  const [selected, setSelected] = useState<any[]>([]);
  // 操作完成的回调
  function onSuccess() {
    dispatchNo(1);
  }
  function dispatchNo(no: number) {
    props.dispatch && props.dispatch({
      type: 'file/setNo',
      payload: {
        ...props.file,
        no
      }
    })
  }
  // dispatch
  function dispatchFolder(folder: string) {
    props.dispatch && props.dispatch({
      type: 'file/setFolder',
      payload: {
        ...props.file,
        folder
      }
    })
  }
  // 点击项
  function onClickColumn(data: any) {
    if (data.parentId) { // 点击了文件夹
      dispatchFolder(data.id);
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
      case 1 : // 文件
        tools = [shareBtn, downBtn, delBtn, renameBtn, copyBtn, moveBtn];
        break;
      case 2: // 文件夹
        tools = [shareBtn, delBtn, renameBtn];
        break;
      case 3: // 文件 + 文件夹
        tools = [shareBtn];
        break;
    }
    setTools(tools);
  }
  // 点击工具栏
  function onClickTool(tool: IToolBar) {
    let idsObj = getSelectedIds();
    switch(tool.type) {
      case 'move':
      case 'copy':
        move(tool.type);
        break;
      case 'delete':
        del(idsObj.files, idsObj.folders, onSuccess);
        break;
    }
  }
  // 获取
  function getSelectedIds(): { files: string, folders: string } {
    let files: string[] = [],
        folders: string[] = [];
    selected.forEach(sel => {
      if(sel.parentId)
        folders.push(sel.id)
      else
        files.push(sel.id);
    })
    return { files: files.join(','), folders: folders.join(',') }
  }
  const [ moveDate, setMoveDate ] = useState<number>();
  const [ moveIds, setMoveIds ] = useState<string>();
  const [ moveType, setMoveType ] = useState<string>();
  function move(type: string) {
    let ids: string[] = [];
    selected.forEach(d => {
      ids.push(d.id);
    })
    setMoveType(type);
    setMoveIds(ids.join(','));
    setMoveDate(Date.now());
  }

  function onMoveSuccess(folder: string) {
    dispatchFolder(folder);
  }

  let scrollTimer: NodeJS.Timeout;
  function onScroll(data: any) {
    console.log('scroll...')
    if(scrollTimer)
      clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      console.log('page：', page)
      if(!page) return ;
      if(data.isBottom && page.page < page.count) {
        console.log(page.page)
        dispatchNo(no + 1)
      }
    }, 500)
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
        tools={tools}
        contextMenu={contextMenu}
        onClickColumn={onClickColumn}
        onSelect={onSelect}
        onClickTool={ onClickTool }
        onToolbarSuccess={ onSuccess }
        onScrollChange={ onScroll }
        onScroll={ onScroll }
      />
      {/* 编辑文件夹 */}
      <Folder
        now={fceDate}
        id={fId}
        data={{ parentId: folder }}
        type='update'
        onSuccess={ onSuccess }
      />
      {/* 重命名 */}
      <Rename
        id={fileId}
        now={renameDate}
        data={{ name: fileName }}
        onSuccess={onSuccess}
      />
      {/* 移动/复制文件 */}
      <Move
        now={ moveDate }
        data={{ ids: moveIds, current: folder }}
        type={ moveType }
        onSuccess={ onMoveSuccess }
      />
    </>
  );
};
const mapStateToProps = state => ({
  file: state.file,
});
export default connect(mapStateToProps)(Index);
