import React from 'react';
import { ColumnsType, IFormInstance, IGroup, IUser } from '@/types';
import { Button, Col, Input, message, Row, Table } from 'antd';
import {
  UsergroupAddOutlined,
  EditOutlined,
} from '@ant-design/icons';
import api from '@/api/group';
import Modal from '@/components/Modal';
import Form, { IFieldProps } from '@/components/Form';
import SelectUser from '@/components/SelectUser';

interface IState {
  groups: IGroup[];
  loading: boolean;
  checkedUser: IUser | null;
  createUpdateVisible: boolean;
  selectUserVisible: boolean;
}
export default class Index extends React.Component<null, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      groups: [],
      loading: false,
      createUpdateVisible: false,
      selectUserVisible: false,
      checkedUser: null,
    };
    //
    this.onSelectUser = this.onSelectUser.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // 表单
  form?: IFormInstance<IGroup>;

  // 表格列数据
  columns: ColumnsType<IGroup> = [
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '用户',
      key: 'user',
      render: (text: any, row: IGroup) => <>{row.user?.name}</>,
    },
    {
      title: '总容量',
      dataIndex: 'size',
    },
    {
      title: '描述',
      ellipsis: true,
      dataIndex: 'description',
    },
    {
      title: '操作',
      width: '300px',
      dataIndex: 'action',
      render: (text, row) => (
        <>
          <Button
            onClick={() => this.onUpdate(row)}
            size="small"
            icon={<EditOutlined />}
            style={{ marginRight: '5px' }}
          />
          {/* <Button onClick={ () => this.onDelete(row.id || '') } size="small" danger icon={ <DeleteOutlined /> } /> */}
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
        { required: true },
        { whitespace: true },
        { type: 'string', min: 2, max: 24 },
      ],
      input: {
        placeholder: '输入名称',
      },
    },
    {
      key: 'size',
      label: '容量',
      rules: [{ required: true }],
      input: {
        customType: 'number',
        placeholder: '输入容量',
        formatter: value => (value ? `${value} M` : ''),
        parser: value => (value ? value.replace(' M', '') : ''),
      },
    },
    {
      key: 'userId',
      label: '所有者',
      rules: [{ required: true }],
      input: () => (
        <div>
          <Input type="hidden" id="userId" />
          <Button onClick={() => this.setState({ selectUserVisible: true })}>
            {this.state.checkedUser
              ? this.state.checkedUser.name
              : '选择所有者'}
          </Button>
        </div>
      ),
    },
    {
      key: 'description',
      label: '描述',
      input: {
        customType: 'textarea',
        placeholder: '输入描述',
      },
    },
  ];

  // 当前操作的id
  id: string | null = null;

  // 操作类型
  type?: 'create' | 'update';

  // 搜索名称
  searchName?: string;

  // 创建
  onCreate() {
    this.type = 'create';
    this.setState({
      createUpdateVisible: true,
    });
  }

  // 更新
  onUpdate(group: IGroup) {
    let { user, userId, ...other } = group;
    let values = Object.assign({}, other, { userId: user?.id });
    this.type = 'update';
    this.id = group.id || null;
    this.setState(
      {
        createUpdateVisible: true,
        checkedUser: user || null,
      },
      () => {
        this.form?.setFieldsValue(values);
      },
    );
  }

  // 删除
  async onDelete(id: string) {
    await api.remove(id);
    message.success('删除成功');
    this.query(this.searchName);
  }

  // 选中人员
  onSelectUser(users: IUser[]) {
    let user = users[0];
    this.form?.setFieldsValue({
      userId: user.id,
    });
    this.setState({
      selectUserVisible: false,
      checkedUser: user,
    });
  }

  // 确认提交
  onSubmit() {
    this.form?.validateFields().then(async values => {
      try {
        let { name, size, userId, description } = values;
        if (this.type === 'create') {
          await api.create(name, userId, size, description);
          message.success('添加成功');
        } else if (this.id) {
          await api.update(this.id, name, userId, size, description);
          message.success('添加成功');
        }
        this.setState({
          createUpdateVisible: false,
        });
        this.query(this.searchName);
      } catch (error) {
        message.error(error.message);
      }
    });
  }

  // 查询
  async query(name?: string) {
    this.setState({
      loading: true,
    });
    const res = await api.query(name);
    this.setState({
      groups: res.data,
      loading: false,
    });
  }

  componentDidMount() {
    this.query();
  }

  render() {
    let {
      groups,
      loading,
      createUpdateVisible,
      selectUserVisible,
      checkedUser,
    } = this.state;
    return (
      <>
        <Row gutter={[0, 10]} align="middle" justify="space-between">
          <Col>当前共{groups.length}个团队</Col>
          <Col>
            <Button
              onClick={() => this.onCreate()}
              icon={<UsergroupAddOutlined />}
            >
              添加团队
            </Button>
            <Input.Search
              style={{ width: '200px', marginLeft: '10px' }}
              placeholder="输入名称"
              onSearch={value => this.query(value)}
            />
          </Col>
        </Row>
        <Table
          size="small"
          loading={loading}
          rowKey="id"
          pagination={false}
          columns={this.columns}
          dataSource={groups}
        />
        {/* 创建/编辑团队 */}
        <Modal
          title="团队"
          visible={createUpdateVisible}
          onOk={this.onSubmit}
          onCancel={() => this.setState({ createUpdateVisible: false })}
        >
          <Form
            ref={(form: IFormInstance) => (this.form = form)}
            fieldData={this.formField}
          />
        </Modal>
        {/* 选择人员 */}
        <SelectUser
          onOk={this.onSelectUser}
          onCancel={() => this.setState({ selectUserVisible: false })}
          checked={checkedUser ? [checkedUser.id || ''] : []}
          visible={selectUserVisible}
        />
      </>
    );
  }
}
