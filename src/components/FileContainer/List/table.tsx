import React from 'react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import Table from '@/components/Table';
interface IProps {
  data: any[];
  scrollSelector?: string | Element;
}
export default function(props: IProps) {
  const columns = [
    {
      key: '01',
      label: '文件名',
      value: 'name',
      width: '50%',
      ellipsis: true,
      render(data: any) {
        return data.name;
      },
    },
    {
      key: '02',
      label: '大小',
      value: 'size',
    },
    {
      key: '03',
      label: '修改日期',
      value: 'modifyDate',
    },
  ];
  const contextMenu = [
    {
      name: '删除',
      value: 'delete',
      icon: <DeleteOutlined />,
    },
    {
      name: '编辑',
      value: 'update',
      icon: <EditOutlined />,
    },
  ];
  return (
    <Table
      select
      selecting
      contextMenu={contextMenu}
      dataIndex="id"
      columns={columns}
      dataSource={props.data}
      scrollSelector={props.scrollSelector}
    />
  );
}
