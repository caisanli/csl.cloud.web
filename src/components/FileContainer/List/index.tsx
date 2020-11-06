import React, { useState } from 'react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import Scroll from '@/components/Scroll';
import { IContextMenu, ITableIconProps } from '@/types';
import { IColumn } from '@/components/Table';
import IconList from './icon';
import TableList from './table';
import styles from './index.module.less';
interface IProps extends ITableIconProps {
  style: 'table' | 'icon';
}
const columns: IColumn[] = [
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
  },
  {
    key: '03',
    label: '修改日期',
    value: 'modifyDate',
  },
];

export default function(props: IProps) {
  const { style, ...otherProps } = props;
  const List = props.style === 'icon' ? IconList : TableList;
  const [elem, setElem] = useState();
  function onRef(elem) {
    setElem(elem)
  }
  return (
    <div className={ styles.list } id="list">
      <Scroll onRef={ onRef }>
        <List {...otherProps} columns={ columns } />
      </Scroll>
    </div>
  );
}
