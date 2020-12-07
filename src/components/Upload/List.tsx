import { BorderOutlined, CloseOutlined, MinusOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Row, Col } from 'antd';
import Table, { IColumn } from '../Table';
import Scroll from '../Scroll';
import { bytesToSize } from '@/utils';
import styles from './index.module.less';
import { IUploadFile } from '@/types';
const defaultProps = {
  list: [],
  message: ''
}

interface IProps {
  list: IUploadFile[],
  onRemove?: (file: IUploadFile) => void;
  message?: string;
}

const doc = window.document;
const node = doc.createElement('div');
doc.body.appendChild(node);

const columns:IColumn[] = [{
  key: 'name',
  label: '名称',
  value: 'name',
  width: '50%'
}, {
  key: 'size',
  label: '大小',
  render(data: any) {
    return <>{ bytesToSize(data.size) }</>;
  }
}, {
  key: 'folder',
  label: '目录',
  value: 'folder'
}, {
  key: 'process',
  label: '进度',
  render(data: any) {
    return <>
          {
              data.status === 'pending'
              ? data.process + '%'
              : data.status === 'waiting'
              ? '等待中'
              : '已完成'
            }
    </>;
  }
}]
type Status = 'close' | 'min' | 'max';
const Index = function(props: IProps) {
  let { message, list } = props;
  const [status, setStatus] = useState<Status>('max');
  useEffect(() => {
    setStatus('max');
  }, [ props.list ])
  return createPortal(
    <div className={ styles.uploadBox }>
      <div className={ styles.uploadContent }>
        <Row justify="space-between" align="middle" className={ styles.uploadHead }>
          <Col>
            { message }
          </Col>
          <Col className={ styles.uploadTools }>
            { status === 'min' && <BorderOutlined className={ styles.uploadTool } />}
            { status === 'max' && <MinusOutlined className={ styles.uploadTool } /> }
            <CloseOutlined className={ styles.uploadTool } />
          </Col>
        </Row>
        <div className={ styles.uploadBody }>
          <Scroll>
            <Table
              dataIndex="id"
              dataSource={ list }
              columns={ columns }
            />
          </Scroll>
        </div>
      </div>
    </div>,
    node
  )
}
Index.defaultProps = defaultProps;
export default Index;
