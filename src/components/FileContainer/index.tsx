import React, { useEffect, useState } from 'react';
import { FileModelState, ConnectProps, connect } from 'umi';
import Scroll from '@/components/Scroll';
import Toolbar from './toolbar';
import Crumb from './crumb';
import IconList from './List/icon';
import TableList from './List/table';
import {
  IContextMenu,
  ICrumbItem,
  IFileContainerProps,
  IPage,
  IToolBar,
} from '@/types';
import styles from './index.module.less';
import { bytesToSize, msToDate } from '@/utils';
import { delFolder, del } from '@/components/FileOperate';
import { IColumn } from '@/components/Table';
import {
  CopyOutlined,
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
  FileOutlined,
  FolderOutlined,
  ScissorOutlined,
  ShareAltOutlined,
} from '@ant-design/icons';
import { Folder, Rename, Share, Move } from '../FileOperate';
import Video from '@/components/Preview/video';
import {
  copyBtn,
  delBtn,
  downBtn,
  moveBtn,
  shareBtn,
} from '@/components/FileContainer/tools';
import fileApi from '@/api/file';

interface IProps extends IFileContainerProps {}
interface IProps extends ConnectProps {
  file: FileModelState;
}
const iconStyle = {
  fontSize: '18px',
  verticalAlign: 'sub',
  color: '#40a9ff',
};
const IndexPage = function(props: IProps) {
  const { file, canCreateFolder, category, showFolder } = props;
  const List = props.file.style === 'icon' ? IconList : TableList;
  const [elem, setElem] = useState();
  const columns: IColumn[] = [
    {
      key: '00',
      width: 40,
      render(data: any) {
        if (data.parentId) return <FolderOutlined style={iconStyle} />;
        return <FileOutlined style={iconStyle} />;
      },
    },
    {
      key: '01',
      label: '文件名',
      value: 'name',
      width: '50%',
      link: true,
      ellipsis: true,
      onClickLink: onClickColumn,
    },
    {
      key: '02',
      label: '大小',
      value: 'size',
      render(data: any) {
        return <>{bytesToSize(data.size)}</>;
      },
    },
    {
      key: '03',
      label: '修改日期',
      value: 'modifyDate',
      render(data: any) {
        return <>{msToDate(data.modifyDate)}</>;
      },
    },
  ];

  function onRef(elem) {
    setElem(elem);
  }

  const [crumbs, setCrumbs] = useState<ICrumbItem[]>([]);
  const [list, setList] = useState([]);
  const [page, setPage] = useState<IPage>();
  const {
    folder,
    name,
    sort: { order, type },
    no,
  } = file;
  // 查询文件
  async function query() {
    const {
      data: { crumbs, files, folders, page },
    } = await fileApi.query(
      type,
      order,
      no,
      10,
      name,
      showFolder ? folder : '',
      category,
    );
    setPage(page);
    setCrumbs(crumbs);
    if (no === 1) {
      setList(folders.concat(files));
    } else {
      setList(list.concat(files));
    }
  }

  useEffect(
    function() {
      query();
    },
    [props.file],
  );

  // 文件夹
  const [fceDate, setFceDate] = useState<number>();
  const [fId, setFId] = useState<string>();

  // 文件
  const [renameDate, setRenameDate] = useState<number>();
  const [fileId, setFileId] = useState<string>();
  const [fileName, setFileName] = useState<string>();
  const [selected, setSelected] = useState<any[]>([]);

  // 操作完成的回调
  function onSuccess() {
    dispatch({
      no: 1,
    });
  }
  const [videoVisible, setVideoVisible] = useState<boolean>(false);
  const [videoSrc, setVideoSrc] = useState<string>('');
  // 点击项
  function onClickColumn(data: any) {
    if (data.parentId) {
      // 点击了文件夹
      dispatch({
        folder: data.id,
        no: 1,
      });
    } else {
      // 点击了文件
      switch (data.category) {
        case '4':
          setVideoSrc(fileApi.preview(data.id));
          setVideoVisible(true);
          break;
      }
    }
  }

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
      onClick(data: any) {
        setShareFiles('');
        setShareFolders(data.id);
        setShareDate(Date.now());
      },
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
      onClick(data: any) {
        del(data.id, '', onSuccess);
      },
    },
    {
      name: '下载',
      value: 'download',
      icon: <DownloadOutlined />,
      onClick(data: any) {
        fileApi.download(data.id);
      },
    },
    {
      name: '分享',
      value: 'share',
      icon: <ShareAltOutlined />,
      onClick(data: any) {
        setShareFolders('');
        setShareFiles(data.id);
        setShareDate(Date.now());
      },
    },
    {
      name: '移动到',
      value: 'move',
      icon: <ScissorOutlined />,
      onClick(data: any) {
        setMoveIds(data.id);
        move('move');
      },
    },
    {
      name: '复制到',
      value: 'copy',
      icon: <CopyOutlined />,
      onClick(data: any) {
        setMoveIds(data.id);
        move('copy');
      },
    },
  ];

  // 自定义生成右键菜单
  const contextMenu = function(data: any): IContextMenu[] {
    if (data.parentId) return folderRightMenu;
    else return fileRightMenu;
  };

  // 工具栏
  const [tools, setTools] = useState<IToolBar[]>([]);
  // 监听选中的类型并动态设置工具栏
  function onSelect(data: any[]) {
    let type: number = 0;
    for (let i = 0; i < data.length; i++) {
      const d = data[i];
      if (type === 3) break;
      if (d.parentId) {
        // 文件夹
        type = type === 1 ? 3 : 2;
      } else {
        // 文件
        type = type === 2 ? 3 : 1;
      }
    }
    setSelected(data);
    let tools: IToolBar[] = [];
    switch (type) {
      case 1: // 文件
        tools = [shareBtn, downBtn, delBtn, copyBtn, moveBtn];
        break;
      case 2: // 文件夹
        tools = [shareBtn, delBtn];
        break;
      case 3: // 文件 + 文件夹
        tools = [shareBtn];
        break;
    }
    setTools(tools);
  }

  // 获取已选择的文件、文件夹ID
  function getSelectedIds(): { files: string; folders: string } {
    let files: string[] = [],
      folders: string[] = [];
    selected.forEach(sel => {
      if (sel.parentId) folders.push(sel.id);
      else files.push(sel.id);
    });
    return { files: files.join(','), folders: folders.join(',') };
  }
  // 移动、复制
  const [moveDate, setMoveDate] = useState<number>();
  const [moveIds, setMoveIds] = useState<string>();
  const [moveType, setMoveType] = useState<string>();
  function move(type: string) {
    setMoveType(type);
    setMoveDate(Date.now());
  }
  function onMoveSuccess(folder: string) {
    dispatch({
      folder,
    });
  }

  // 分享
  const [shareDate, setShareDate] = useState<number>();
  const [shareFils, setShareFiles] = useState<string>();
  const [shareFolders, setShareFolders] = useState<string>();
  function share() {
    let obj = getSelectedIds();
    setShareFiles(obj.files);
    setShareFolders(obj.folders);
    setShareDate(Date.now());
  }

  // 滚动刷新
  let scrollTimer: NodeJS.Timeout;
  function onScroll(data: any) {
    if (scrollTimer) clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      if (!page) return;
      if (data.isBottom && data.isDown && page.page < page.count) {
        dispatch({
          no: no + 1,
        });
      }
    }, 500);
  }

  // 点击工具栏
  function onClickTool(tool: IToolBar) {
    let idsObj = getSelectedIds();
    switch (tool.type) {
      case 'move':
      case 'copy':
        setMoveIds(idsObj.files);
        move(tool.type);
        break;
      case 'delete':
        del(idsObj.files, idsObj.folders, onSuccess);
        break;
      case 'share':
        share();
        break;
      case 'download':
        fileApi.download(idsObj.files);
        break;
    }
  }
  // dispatch
  function dispatch(data: any) {
    props.dispatch &&
      props.dispatch({
        type: 'file/update',
        payload: {
          ...props.file,
          ...data,
        },
      });
  }

  return (
    <>
      {/* 工具栏 */}
      <Toolbar
        tools={tools}
        canCreateFolder={canCreateFolder}
        onClick={onClickTool}
        onSuccess={onSuccess}
      />
      {/* 面包屑 */}
      {crumbs && <Crumb crumbs={crumbs} count={list.length} />}
      {/* 列表 */}
      <div className={styles.list} id="list">
        <Scroll onRef={onRef} onScroll={onScroll} onChange={onScroll}>
          <List
            onSelect={onSelect}
            contextMenu={contextMenu}
            columns={columns}
            scrollSelector={elem}
            dataSource={list}
          />
        </Scroll>
      </div>
      {/* 编辑文件夹 */}
      <Folder
        now={fceDate}
        id={fId}
        data={{ parentId: folder }}
        type="update"
        onSuccess={onSuccess}
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
        now={moveDate}
        data={{ ids: moveIds, current: folder }}
        type={moveType}
        onSuccess={onMoveSuccess}
      />
      {/* 分享文件 */}
      <Share
        now={shareDate}
        data={{ files: shareFils, folders: shareFolders }}
        onSuccess={onSuccess}
      />
      {/* 视频预览 */}
      <Video
        onCancel={() => setVideoVisible(false)}
        visible={videoVisible}
        url={videoSrc}
      />
    </>
  );
};
const mapStateProps = state => ({
  file: state.file,
});
export default connect(mapStateProps)(IndexPage);
