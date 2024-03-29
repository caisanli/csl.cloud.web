import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import ChooseFolder from './ChooseFolder';
import { IOperateProps } from '@/types';
import fileApi from '@/api/file';
import groupFileApi from '@/api/groupFile';

export default function(props: IOperateProps) {
  const [visible, setVisible] = useState<boolean>(false);
  const { type, groupId, id, now, data } = props;
  useEffect(() => {
    if (!now) return;
    setVisible(true);
  }, [props.now]);

  async function onOk(folder: string) {
    if (!data) return message.error('须传入“data”参数');
    if (!data.current) return message.error('须传入“data.current”参数');
    if (folder === data.current) return message.error('当前目录和目标目录相同');
    switch (type) {
      case 'move':
        await (groupId
          ? groupFileApi.move(data.ids, folder, groupId)
          : fileApi.move(data.ids, folder));
        message.success('移动成功');
        break;
      case 'copy':
        await (groupId
          ? groupFileApi.copy(data.ids, folder, groupId)
          : fileApi.copy(data.ids, folder));
        message.success('拷贝成功');
        break;
    }
    props.onSuccess && props.onSuccess(folder);
    setVisible(false);
  }

  return (
    <ChooseFolder
      visible={visible}
      groupId={groupId}
      onOk={onOk}
      onCancel={() => setVisible(false)}
    />
  );
}
