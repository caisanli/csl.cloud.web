import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal, message } from 'antd';
import React from 'react';
import api from '@/api/folder';
import groupFolderApi from '@/api/groupFolder';
const { confirm } = Modal;

export default function(id: string, groupId?: number, callback?: () => void) {
  confirm({
    okText: '删除',
    okType: 'danger',
    okButtonProps: {
      type: 'primary',
    },
    cancelText: '取消',
    title: '是否要删除该目录?',
    icon: <ExclamationCircleOutlined />,
    content: '如该目录下有文件或子目录，则不能删除',
    onOk() {
      (groupId ? groupFolderApi : api).remove(id).then(() => {
        message.success('删除失败');
        callback && callback();
      });
    },
  });
}
