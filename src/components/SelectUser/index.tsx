import React, { useState, useEffect } from 'react';
import Modal from '../Modal';
import api from '@/api/user';
import { ColumnsType, IUser } from '@/types';
import { Col, Input, Row, Table } from '@/utils/_ant';

type IProps = {
  checked?: string[],
  visible?: boolean
}

const columns:ColumnsType<IUser> = [{
  title: '名称',
  dataIndex: 'name'
}, {
  title: '电话',
  dataIndex: 'phone',
  render: (text) => text || '-'
}, {
  title: '邮箱',
  dataIndex: 'email',
  render: (text) => text || '-'
}]

export default function(props: IProps) {
  const [ users, setUsers ] = useState([]);
  useEffect(() => {
    if(!props.visible)
      return ;
    setSelectedRowKeys(props.checked)
    query();
  }, [props.visible])

  // 查询用户
  function query(name?: string) {
    api.query(name).then(res => {
      setUsers(res.data);
    })
  }
  // 选择项
  const [selectedRowKeys , setSelectedRowKeys] = useState<string[]>();
  let rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  }

  function onSelectChange(selectedRowKeys: any[]) {
    setSelectedRowKeys(selectedRowKeys);
  }

  return (
    <Modal
      title="选择用户"
      visible={ props.visible }
    >
      <Row align="middle" justify="space-between" gutter={[0, 10]}>
        <Col>
          当前有{ users.length }个用户，
          已选{ selectedRowKeys?.length || 0 }个用户
        </Col>
        <Col>
          <Input.Search size="small" onSearch={ query } placeholder="输入名称"  />
        </Col>
      </Row>
      <Table
        pagination={ false }
        rowKey="id"
        rowSelection={ rowSelection }
        columns={ columns }
        dataSource={ users }
        size='small'
      />
    </Modal>
  )
}
