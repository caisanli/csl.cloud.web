import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal, message } from 'antd';
import React from 'react';
import api from '@/api/file';
const { confirm  } = Modal;

export default function (fileIds: string, folderIds: string, callback?: () => void) {
  confirm({
    okText: '删除',
    okType: 'danger',
    okButtonProps: {
      type: 'primary'
    },
    cancelText: '取消',
    title: '是否要删除所选文件/文件夹?',
    icon: <ExclamationCircleOutlined />,
    content: '如目录下有文件或子目录，则不能忽略删除',
    onOk() {
      api.remove(fileIds, folderIds).then(() => {
        message.success('删除成功');
        callback && callback();
      });
    }
  });
}
