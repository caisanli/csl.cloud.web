import { IOperateProps, IUser } from '@/types';
import { message } from 'antd';
import { getUserValue } from '@/utils';
import React, { useState, useEffect } from 'react';
import SelectUser from '../SelectUser';
import api from '@/api/share';

export default function(props: IOperateProps) {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    if (props.now) setVisible(true);
  }, [props.now]);

  function onOk(users: IUser[]) {
    const data = props.data;
    if (!data) return message.error('请选择文件/文件夹');
    if (!data.files && !data.folders) return message.error('请选择文件/文件夹');
    const id = getUserValue('id');
    let ids: string[] = [];
    let error: boolean = false;
    users.forEach(user => {
      if (user.id === id) {
        error = true;
        return message.error('不能选择自己');
      }
      ids.push(user.id!);
    });
    if (error) return;
    if (!ids.length) return message.error('请选择用户');
    api.create(ids.join(','), data.files, data.folders).then(() => {
      message.success('分享成功');
      setVisible(false);
    });
  }

  return (
    <SelectUser
      visible={visible}
      onOk={onOk}
      onCancel={() => setVisible(false)}
    />
  );
}
