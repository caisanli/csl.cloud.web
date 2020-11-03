import React from 'react';
import Table from "@/components/Table";
interface IProps {
  data: []
}
export default function(props: IProps) {
  const columns = [{
    key: '01',
    label: '文件名',
    value: 'name'
  }, {
    key: '02',
    label: '大小',
    value: 'size'
  }, {
    key: '03',
    label: '修改日期',
    value: 'modifyDate'
  }]
  return (
    <Table
      columns={columns}
      dataSource={ props.data }
    />
  )
}
