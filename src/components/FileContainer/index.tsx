import React from 'react';
import Toolbar from './toolbar';
import Crumb from './crumb';
import List from './List';
import { IFileContainerProps } from '@/types';

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
      { props.crumbs && <Crumb crumbs={ props.crumbs } /> }
      {/* 列表 */}
      <List dataSource={ props.dataSource } contextMenu={ props.contextMenu } />
    </>
  );
}
