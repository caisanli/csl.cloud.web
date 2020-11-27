import React from 'react';
import { Table } from 'antd';
import { Row, Col, Input, Button, message as Message } from '@/utils/_ant';
import Modal from '@/components/Modal';
import Form, { IFieldProps } from '@/components/Form';
import { UserAddOutlined, EditOutlined } from '@ant-design/icons';
import api from '@/api/user';
import { IUser } from '@/types/back';
import { IFormInstance } from '@/types/front';

type IState = {
  users: IUser[];
  loading: boolean;
  createUpdateVisible: boolean;
};
export default class User extends React.Component<null, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      users: [],
      loading: false,
      createUpdateVisible: false
    };
    this.type = 'create';
    this.onOk = this.onOk.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onCreateUser = this.onCreateUser.bind(this);
  }
  // 操作类型
  type: 'create' | 'update';

  // 操作用户的ID
  userId?: string;

  // 表格列数据
  columns = [
    {
      title: '用户名',
      dataIndex: 'name',
    },
    {
      title: '手机',
      dataIndex: 'phone',
      render: (text: any) => <>{!text ? '-' : text}</>,
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      render: (text: any) => <>{!text ? '-' : text}</>,
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: '200px',
      render: (text: any, row: IUser) => (
        <>
          <Button onClick={ () => this.onUpdate(row) } size="small" icon={<EditOutlined />} />
        </>
      ),
    },
  ];

  // 表单数据
  formField: IFieldProps[] = [
    {
      key: 'name',
      label: '名称',
      rules: [
        { whitespace: true },
        { required: true },
        { type: 'string', max: 24, min: 2 },
      ],
      input: {
        placeholder: '输入用户',
      },
    },
    {
      key: 'phone',
      label: '电话',
      rules: [{ pattern: /^$|^1[\d]{10}$/ }],
      input: {
        placeholder: '输入电话',
      },
    },
    {
      key: 'email',
      label: '邮箱',
      rules: [{ type: 'email' }],
      input: {
        placeholder: '输入邮箱',
      },
    },
  ];

  // 表单
  form?: IFormInstance<any> | null;

  // 搜索名称
  searchName?: string;

  // 查找人员
  async query(name?: string) {
    this.searchName = name;
    this.setState({
      loading: true,
    });
    const res = await api.query(name);
    this.setState({
      users: res.data,
      loading: false,
    });
  }
  // 开始更新用户
  onUpdate(row: IUser) {
    this.type = 'update';
    this.userId = row.id;
    this.setState({
      createUpdateVisible: true
    }, () => {
      this.form?.setFieldsValue(row);
    })
  }
  // 开始添加用户
  onCreateUser() {
    this.type = 'create';
    this.setState({
      createUpdateVisible: true,
    });
    if (this.form) this.form.resetFields();
  }

  // 模态框提交
  onOk() {
    this.form?.validateFields().then( async ({ name, phone, email }) => {
      if(this.type === 'create') {
        await api.create(name, phone, email);
        Message.success('添加成功');
      } else if(this.userId) {
        await api.update(this.userId, name, phone, email);
        Message.success('更新成功');
      }
      this.setState({
        createUpdateVisible: false
      })
      this.query(this.searchName)
    })
  }

  // 模态框取消
  onCancel() {
    this.setState({
      createUpdateVisible: false,
    });
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
          <Col>当前有{users.length}个用户</Col>
          <Col>
            <Button onClick={this.onCreateUser} icon={<UserAddOutlined />}>
              添加用户
            </Button>
            <Input.Search
              style={{ width: '200px', marginLeft: '10px' }}
              placeholder="输入名称"
              onSearch={value => this.query(value)}
            />
          </Col>
        </Row>

        {/* 数据列表 */}
        <Table
          columns={this.columns}
          dataSource={users}
          loading={loading}
          size="small"
          pagination={false}
          rowKey="id"
        />

        {/* 添加 / 编辑模态框 */}
        <Modal
          title="用户"
          visible={createUpdateVisible}
          onCancel={this.onCancel}
          onOk={this.onOk}
        >
          <Form
            fieldData={this.formField}
            ref={(form: IFormInstance) => (this.form = form)}
            name="form"
          />
        </Modal>
      </>
    );
  }
}
