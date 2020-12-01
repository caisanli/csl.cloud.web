import React, { useState, useEffect } from 'react';
import Modal from '../Modal';
import api from '@/api/user';
import { ColumnsType, IUser } from '@/types';
import { Col, Input, message, Row, Table } from 'antd';

type IProps = {
  checked?: string[];
  visible?: boolean;
  onOk?: (users: IUser[]) => void;
  onCancel?: () => void;
};

const columns: ColumnsType<IUser> = [
  {
    title: '名称',
    dataIndex: 'name',
  },
  {
    title: '电话',
    dataIndex: 'phone',
    render: text => text || '-',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    render: text => text || '-',
  },
];

enum rowSelectType {
  radio = 'radio',
  checkbox = 'checkbox',
}

export default function(props: IProps) {
  const [users, setUsers] = useState<IUser[]>([]);
  useEffect(() => {
    if (!props.visible) return;
    setSelectedRowKeys(props.checked);
    query();
  }, [props.visible]);

  // 查询用户
  function query(name?: string) {
    api.query(name).then(res => {
      setUsers(res.data);
    });
  }
  // 选择项
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>();
  let rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    type: rowSelectType.radio,
  };

  function onSelectChange(selectedRowKeys: any[]) {
    setSelectedRowKeys(selectedRowKeys);
  }

  // 确认选择
  function onOk() {
    if (!selectedRowKeys) return message.error('请选择人员');
    let checked: IUser[] = [];
    selectedRowKeys.forEach((id: string) => {
      let user = users.find(u => u.id === id);
      if (user) checked.push(user);
    });
    if (props.onOk) props.onOk(checked);
  }
  return (
    <Modal
      title="选择用户"
      visible={props.visible}
      onOk={onOk}
      onCancel={props.onCancel}
    >
      <Row align="middle" justify="space-between" gutter={[0, 10]}>
        <Col>
          当前有{users.length}个用户， 已选{selectedRowKeys?.length || 0}个用户
        </Col>
        <Col>
          <Input.Search size="small" onSearch={query} placeholder="输入名称" />
        </Col>
      </Row>
      <Table
        pagination={false}
        rowKey="id"
        rowSelection={rowSelection}
        columns={columns}
        dataSource={users}
        size="small"
      />
    </Modal>
  );
}
