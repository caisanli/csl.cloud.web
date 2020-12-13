import React from 'react';
import { Divider, Row, Col } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { ConnectProps, connect, FileModelState } from 'umi';
import styles from './index.module.less';
import { ICrumbItem } from '@/types';
import Crumb from '../Crumb';

interface IProps {
  crumbs?: ICrumbItem[];
  count?: number;
}
interface IProps extends ConnectProps {
  file: FileModelState;
}

const Index = function(props: IProps) {
  const { crumbs, count } = props;
  function dispatch(id: string) {
    props.dispatch &&
      props.dispatch({
        type: 'file/update',
        payload: {
          folder: id,
        },
      });
  }
  function onClick(item: ICrumbItem) {
    dispatch(item.id);
  }
  return (
    <Row justify="space-between" align="middle">
      <Col>
        <Crumb crumbs={crumbs} onClick={onClick} />
      </Col>
      <Col>共{count}个项目</Col>
    </Row>
  );
};
const mapStateToProps = state => ({
  file: state.file,
});

export default connect(mapStateToProps)(Index);
