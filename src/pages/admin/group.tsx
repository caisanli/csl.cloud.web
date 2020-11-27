import React from 'react';
import { ColumnsType, IFormInstance, IGroup } from '@/types';
import { Button, Col, Input, Row, Table } from '@/utils/_ant';
import { UsergroupAddOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import api from '@/api/group';
import Modal from '@/components/Modal';
import Form, { IFieldProps } from '@/components/Form';
import SelectUser from '@/components/SelectUser';

interface IState {
  groups: IGroup[],
  loading: boolean,
  createUpdateVisible: boolean,
  selectUserVisible: boolean
}
export default class Index extends React.Component<null, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      groups: [],
      loading: false,
      createUpdateVisible: false,
      selectUserVisible: false
    }
  }

  // 表单
  form?: IFormInstance;

  // 表格列数据
  columns: ColumnsType<IGroup> = [{
    title: '名称',
    dataIndex: 'name'
  }, {
    title: '用户',
    key: 'user',
    render: (text: any, row: IGroup) => (
      <>
        { row.user?.name }
      </>
    ),
  }, {
    title: '总容量',
    dataIndex: 'size'
  }, {
    title: '描述',
    ellipsis: true,
    dataIndex: 'description'
  }, {
    title: '操作',
    width: '300px',
    dataIndex: 'action',
    render: () => (
      <>
        <Button size="small" icon={ <EditOutlined /> } style={{marginRight: '5px'}} />
        <Button size="small" danger icon={ <DeleteOutlined /> } />
      </>
    )
  }]

  // 表单数据
  formField: IFieldProps[] = [{
    key: 'name',
    label: '名称',
    rules: [
      { required: true },
      { whitespace: true },
      { type: 'string', min: 2, max: 24 }
    ],
    input: {
      placeholder: '输入名称'
    }
  }, {
    key: 'size',
    label: '容量',
    input: {
      customType: 'number',
      placeholder: '输入容量',
      formatter: value => value ? `${ value } M` : '',
      parser: value => value ? value.replace(' M', '') : ''
    }
  }, {
    key: 'userId',
    label: '所有者',
    input: () => (
      <div>
        <Input type="hidden" id="userId" />
        <Button onClick={ () => this.setState({ selectUserVisible: true }) }>选择所有者</Button>
      </div>
    )
  }, {
    key: 'description',
    label: '描述',
    input: {
      customType: 'textarea',
      placeholder: '输入描述'
    }
  }]

  // 搜索名称
  searchName?: string;

  onCreate() {
    this.setState({
      createUpdateVisible: true
    })
  }

  // 查询
  async query(name?: string) {
    this.setState({
      loading: true
    })
    const res = await api.query(name);
    this.setState({
      groups: res.data,
      loading: false
    })
  }

  componentDidMount() {
    this.query();
  }

  render() {
    let { groups, loading, createUpdateVisible, selectUserVisible } = this.state;
    return (
      <>
        <Row gutter={[0, 10]} align="middle" justify="space-between">
          <Col>
            当前共{ groups.length }个团队
          </Col>
          <Col>
            <Button onClick={ () => this.onCreate() } icon={ <UsergroupAddOutlined /> }>
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
          loading={ loading }
          rowKey='id'
          pagination={ false }
          columns={ this.columns }
          dataSource={ groups }
        />
        {/* 创建/编辑团队 */}
        <Modal
          title="团队"
          visible={ createUpdateVisible }
        >
          <Form
            ref={ (form: IFormInstance) => this.form = form }
            fieldData={ this.formField }
          />
        </Modal>
        {/* 选择人员 */}
        <SelectUser
          visible={ selectUserVisible }
        />
      </>
    )
  }
}
