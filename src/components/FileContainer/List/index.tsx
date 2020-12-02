import React, { FC, useState } from 'react';
import Scroll from '@/components/Scroll';
import { ITableIconProps } from '@/types';
import { FileModelState, ConnectProps, connect } from 'umi';
import { IColumn } from '@/components/Table';
import IconList from './icon';
import TableList from './table';
import styles from './index.module.less';
import { bytesToSize, msToDate } from '@/utils';
import { FileOutlined, FolderOutlined } from '@ant-design/icons';
interface IProps extends ITableIconProps {}
interface IProps extends ConnectProps {
  file: FileModelState;
}
const iconStyle = {
  fontSize: '18px',
  verticalAlign: 'sub',
  color: '#40a9ff'
}
const columns: IColumn[] = [
  {
    key: '00',
    width: 40,
    render(data: any) {
      if(data.parentId)
        return <FolderOutlined style={ iconStyle } />
      return <FileOutlined style={ iconStyle } />;
    }
  },
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
    render(data: any) {
      return (
        <>
          { bytesToSize(data.size) }
        </>
      );
    }
  },
  {
    key: '03',
    label: '修改日期',
    value: 'modifyDate',
    render(data: any) {
      return (
        <>
          { msToDate(data.modifyDate) }
        </>
      )
    }
  },
];

const IndexPage: FC<IProps> = function(props: IProps) {
  const List = props.file.style === 'icon' ? IconList : TableList;
  const [elem, setElem] = useState();
  function onRef(elem) {
    setElem(elem);
  }
  return (
    <div className={styles.list} id="list">
      <Scroll onRef={onRef}>
        <List {...props} columns={columns} scrollSelector={elem} />
      </Scroll>
    </div>
  );
};
const mapStateProps = state => ({
  file: state.file,
});
export default connect(mapStateProps)(IndexPage);
