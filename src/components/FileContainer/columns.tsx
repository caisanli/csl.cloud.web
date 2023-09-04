import { IColumn } from 'comp/Table';
import { FileOutlined, FolderOutlined } from '@ant-design/icons';
import { bytesToSize, msToDate } from '@/utils';
import React from 'react';

const iconStyle = {
  fontSize: '18px',
  verticalAlign: 'sub',
  color: '#40a9ff',
};

/**
 * 获取基础columns
 * @param clickColumn
 */
export function getBaseColumns(
  clickColumn: (data?: unknown) => void,
): IColumn[] {
  return [
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
      onClickLink: clickColumn,
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
}
