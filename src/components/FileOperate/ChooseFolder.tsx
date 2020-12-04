import React, { useEffect, useState } from 'react';
import { Breadcrumb, Tree } from 'antd';
import Table, { IColumn } from '@/components/Table';
import Scroll from '@/components/Scroll';
import Modal from '@/components/Modal';
import api from '@/api/folder';
import { ICrumbItem, IFolder } from '@/types';
import { FolderOutlined } from '@ant-design/icons';
interface IProps {
  title?: string;
  visible: boolean;
  folder?: string;
  data?: any[];
  crumbs?: any[];
  onCrumbs?: (data: any) => void;
  onOk?: (folder: string) => void;
  onCancel?: () => void;
}
const iconStyle = {
  fontSize: '18px',
  fontWeight: 400,
  verticalAlign: 'sub'
};

export default function(props: IProps) {
  const { visible, title } = props;

  const [folder, setFolder] = useState<string>(props.folder || '');
  const [list, setList] = useState<IFolder[]>([]);
  const [crumbs, setCrumbs] = useState<ICrumbItem[]>([]);
  // 表格项
  const columns: IColumn[] = [
    {
      key: 'icon',
      width: '35px',
      render() {
        return <FolderOutlined style={ iconStyle } />;
      },
    },
    {
      key: 'name',
      label: '名称',
      value: 'name',
      link: true,
      onClickLink(data: any) {
        setFolder(data.id);
      },
    },
  ];

  useEffect(() => {
    if (!visible) return;
    setFolder('0');
  }, [props.visible]);

  useEffect(() => {
    if (!visible) return;
    query();
  }, [folder]);

  async function query() {
    const {
      data: { folders, crumbs },
    } = await api.getChildren(folder);
    setList(folders);
    setCrumbs(crumbs);
  }

  function onClickCrumb(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, item: ICrumbItem) {
    e.stopPropagation();
    setFolder(item.id);
  }

  function onOk() {
    props.onOk && props.onOk(folder);
  }

  return (
    <Modal
      title={ title || '选择文件夹' }
      visible={ visible }
      onOk={ onOk }
      onCancel={ props.onCancel }
    >
      <Breadcrumb style={{ marginBottom: '5px' }}>
        {crumbs.map(item => (
          <Breadcrumb.Item key={item.id}>
            <a onClick={(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => onClickCrumb(e, item)}>{ item.name }</a>
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
      <div style={{ height: '240px' }}>
        <Scroll>
          <Table
            hiddenHead
            dataSource={ list }
            dataIndex="id"
            columns={ columns }
          />
        </Scroll>

      </div>

    </Modal>
  );
}
