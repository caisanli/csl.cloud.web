import React from 'react';
import { Row, Col, Input, Button, Table, Form } from 'antd';
import Modal from '@/components/Modal';
import { UserAddOutlined, EditOutlined } from '@ant-design/icons';
import api from '@/api/user';
import { IUser } from '@/types/back';
import { IFormInstance } from '@/types/front';

type IState = {
  users: IUser[],
  loading: boolean,
  createUpdateVisible: boolean,
  type: 'create' | 'update'
}
export default class User extends React.Component<null, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      users: [],
      loading: false,
      createUpdateVisible: false,
      type: 'create'
    }
    // this.form = ;
    this.onOk = this.onOk.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onCreateUser = this.onCreateUser.bind(this);
  }

  // 表格列数据
  columns = [{
    title: '用户名',
    dataIndex: 'name',
  }, {
    title: '手机',
    dataIndex: 'phone',
    render: (text: any) => (
      <>
        { !text ? '-' : text }
      </>
    )
  }, {
    title: '邮箱',
    dataIndex: 'email',
    render: (text: any) => (
      <>
        { !text ? '-' : text }
      </>
    )
  }, {
    title: '操作',
    dataIndex: 'action',
    width: '200px',
    render: () => (
      <>
        <Button size="small" icon={<EditOutlined />}></Button>
      </>
    )
  }]

  // 表单
  form?: IFormInstance<any> | null;
  async query(name?: string) {
    this.setState({
      loading: true
    })
    const res = await api.query(name);
    this.setState({
      users: res.data,
      loading: false
    })
  }

  // 开始创建用户
  onCreateUser() {
    this.setState({
      type: 'create',
      createUpdateVisible: true
    })
    if(this.form) this.form.resetFields();
  }

  // 模态框提交
  onOk() {

  }

  // 模态框取消
  onCancel() {
    this.setState({
      createUpdateVisible: false
    })
  }
  componentDidMount() {
    this.query();
  }

  render() {
    let { users, loading, createUpdateVisible } = this.state;
    return (
      <>
        {/* 工具栏 */}
        <Row justify="space-between" align="middle" gutter={[0, 10]}>
          <Col>
            当前有{ users.length }个用户
          </Col>
          <Col>
            <Button onClick={ this.onCreateUser } icon={ <UserAddOutlined/> }>
              创建用户
            </Button>
            <Input.Search
              style={{width: '200px', marginLeft: '10px'}}
              placeholder="输入名称"
              onSearch={ (value) => this.query(value) }
            />
          </Col>
        </Row>

        {/* 数据列表 */}
        <Table
          columns={ this.columns }
          dataSource={ users }
          loading={ loading }
          size="small"
          pagination={false}
          rowKey='id'
        />

        {/* 创建 / 编辑模态框 */}
        <Modal
          title="用户"
          visible={ createUpdateVisible }
          onCancel={ this.onCancel }
          onOk={ this.onOk }
        >
          <Form ref={ form => this.form = form } labelCol={{ span: 4 }} name="form">
            <Form.Item name="name" label="名称" rules={[
              { required: true },
              { type: 'string', max: 24, min: 2 }
            ]}>
              <Input placeholder="输入名称" />
            </Form.Item>
            <Form.Item name="phone" label="电话" rules={[
              { pattern: /^$|^1[\d]{10}$/ }
            ]}>
              <Input type="tel" placeholder="输入电话" />
            </Form.Item>
            <Form.Item name="email" label="邮箱" rules={[
              { type: 'email' }
            ]}>
              <Input type="email" placeholder="输入邮箱" />
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  }
}
