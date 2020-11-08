import React from 'react';
import { Breadcrumb, Modal } from 'antd';
import Table, { IColumn } from '@/components/Table';
import { modalProps } from './props';
interface IProps {
  title?: string;
  visible: boolean;
  data?: any[];
  crumbs?: any[];
  onCrumbs?: (data: any) => void;
}
const columns: IColumn[] = [
  {
    key: 'icon',
    label: '',
    value: '',
  },
  {
    key: 'name',
    label: '名称',
    value: 'name',
  },
];
export default function(props: IProps) {
  return (
    <Modal
      title={props.title || '选择文件夹'}
      visible={props.visible}
      {...modalProps}
    >
      <Breadcrumb>
        {props.crumbs &&
          props.crumbs.map(item => (
            <Breadcrumb.Item
              key={item.id}
              onClick={() => props.onCrumbs && props.onCrumbs(item)}
            >
              {item.name}
            </Breadcrumb.Item>
          ))}
      </Breadcrumb>
    </Modal>
  );
}
