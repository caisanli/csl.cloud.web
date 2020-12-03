import React, { useEffect, useState } from 'react';
import { Breadcrumb } from 'antd';
import Table, { IColumn } from '@/components/Table';
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
}

export default function(props: IProps) {
  const { visible, title } = props;
  const [folder, setFolder] = useState<string>(props.folder || '0');
  const [list, setList] = useState<IFolder[]>([]);
  const [crumbs, setCrumbs] = useState<ICrumbItem[]>([]);
  //
  const columns: IColumn[] = [
    {
      key: 'icon',
      width: '35px',
      render() {
        return <FolderOutlined style={{ fontSize: '18px' }} />;
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
    query();
  }, [props.visible, folder]);

  async function query() {
    const {
      data: { folders, crumbs },
    } = await api.getChildren(folder);
    setList(folders);
    setCrumbs(crumbs);
  }
  function onClickCrumb(item: ICrumbItem) {
    setFolder(item.id);
  }
  return (
    <Modal title={title || '选择文件夹'} visible={visible}>
      <Breadcrumb>
        {crumbs.map(item => (
          <Breadcrumb.Item key={item.id} onClick={() => onClickCrumb(item)}>
            {item.name}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
      <Table dataSource={list} dataIndex="id" columns={columns} />
    </Modal>
  );
}
