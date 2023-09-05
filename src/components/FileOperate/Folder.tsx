import React, { useEffect, useState, useRef } from 'react';
import Form, { IFieldProps } from '@/components/Form';
import Modal from '@/components/Modal';
import { message } from 'antd';
import { IFormInstance, IOperateProps } from '@/types';
import folderApi from '@/api/folder';
import groupFolderApi from '@/api/groupFolder';

const fieldData: IFieldProps[] = [
  {
    key: 'name',
    label: '名称',
    rules: [{ required: true }, { type: 'string', max: 24, min: 2 }],
    input: {
      placeholder: '输入名称',
    },
  },
  {
    key: 'description',
    label: '描述',
    rules: [{ type: 'string', max: 150 }],
    input: {
      customType: 'textarea',
      placeholder: '输入描述',
    },
  },
];

export default function(props: IOperateProps) {
  const [mVisible, setVisible] = useState<boolean>(false);
  const { type, groupId, now, data, id, onSuccess } = props;
  const form = useRef<IFormInstance>();
  const api = groupId ? groupFolderApi : folderApi;

  useEffect(() => {
    if (!now) return;
    if (type === 'create') {
      form.current && form.current.resetFields();
      setVisible(true);
    } else if (type === 'update' && id) {
      api.getById(id).then(res => {
        setVisible(true);
        setTimeout(() => {
          form.current && form.current.setFieldsValue(res.data);
        }, 0);
      });
    }
  }, [props.now]);

  // 开始提交
  function onSubmit() {
    form.current &&
      form.current.validateFields().then(async (values: any) => {
        let { name, description } = values;
        if (type === 'create') {
          await (groupId
            ? groupFolderApi.create(
                data?.parentId,
                groupId || 0,
                name,
                description,
              )
            : folderApi.create(data?.parentId, name, description));
          message.success('创建成功');
        } else if (id) {
          await (groupId
            ? groupFolderApi.update(id, name, groupId || 0, description)
            : folderApi.update(id, name, description));
          message.success('更新成功');
        }
        setVisible(false);
        onSuccess && onSuccess();
      });
  }

  // 关闭
  function onCancel() {
    setVisible(false);
  }

  return (
    <Modal
      title="文件夹"
      visible={mVisible}
      onOk={onSubmit}
      onCancel={onCancel}
    >
      <Form ref={form} fieldData={fieldData} />
    </Modal>
  );
}
