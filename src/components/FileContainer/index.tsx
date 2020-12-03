import React, { useState } from 'react';
import { FileModelState, ConnectProps, connect } from 'umi';
import Scroll from '@/components/Scroll';
import Toolbar from './toolbar';
import Crumb from './crumb';
import IconList from './List/icon';
import TableList from './List/table';
import { IFileContainerProps } from '@/types';
import styles from './index.module.less';
import { bytesToSize, msToDate } from '@/utils';
import { IColumn } from '@/components/Table';
import { FileOutlined, FolderOutlined } from '@ant-design/icons';

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
      onClickLink: onClickName,
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

  // 点击名称
  function onClickName(data: any) {
    if (props.onClickColumn) props.onClickColumn(data);
  }
  function onRef(elem) {
    setElem(elem);
  }
  const { onClickTool, crumbs, onCreateFolder, tools, ...otherProps } = props;
  return (
    <>
      {/* 工具栏 */}
      <Toolbar
        tools={tools}
        canCreateFolder
        onCreateFolder={onCreateFolder}
        onSearch={props.onSearch}
        onClick={onClickTool}
      />
      {/* 面包屑 */}
      {props.crumbs && <Crumb crumbs={crumbs} />}
      {/* 列表 */}
      <div className={styles.list} id="list">
        <Scroll onRef={onRef}>
          <List {...otherProps} columns={columns} scrollSelector={elem} />
        </Scroll>
      </div>
    </>
  );
};
const mapStateProps = state => ({
  file: state.file,
});
export default connect(mapStateProps)(IndexPage);
