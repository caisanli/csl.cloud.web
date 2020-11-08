import React from 'react';
import Toolbar from './toolbar';
import Crumb from './crumb';
import List from './List';
import { IFileContainerProps } from '@/types';

const crumbs = [
  {
    name: '全部文件',
    id: 0,
    pid: -1,
  },
  {
    name: '文件夹1',
    id: 1,
    pid: 0,
  },
];
export default function(props: IFileContainerProps) {
  return (
    <>
      {/* 工具栏 */}
      <Toolbar
        tools={props.tools || []}
        canCreateFolder
        onCreateFolder={props.onCreateFolder}
        onSearch={props.onSearch}
      />
      {/* 面包屑 */}
      <Crumb crumbs={crumbs} />
      {/* 列表 */}
      <List dataSource={props.dataSource} />
    </>
  );
}
