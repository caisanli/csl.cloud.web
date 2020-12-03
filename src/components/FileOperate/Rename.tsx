import React, { useState, useRef, useEffect } from 'react';
import { message } from 'antd';
import Form, { IFieldProps } from '@/components/Form';
import Modal from '@/components/Modal';
import { IFormInstance, IOperateProps } from '@/types';
import api from '@/api/file';
const fieldData: IFieldProps[] = [
  {
    key: 'name',
    label: '名称',
    rules: [{ required: true }],
    input: {
      placeholder: '输入名称',
    },
  },
];

export default function(props: IOperateProps) {
  const [visible, setVisible] = useState<boolean>(false);
  const { now, data, id, onSuccess } = props;
  const form = useRef<IFormInstance>();
  function onSubmit() {
    if (!form.current || !id) return;
    form.current.validateFields().then(values => {
      api.rename(id, values.name).then(() => {
        setVisible(false);
        message.success('修改成功');
        onSuccess && onSuccess();
      });
    });
  }
  function onCancel() {
    setVisible(false);
  }
  useEffect(() => {
    if (!now) return;
    setVisible(true);
    setTimeout(() => {
      if (data && form.current) {
        form.current.setFieldsValue({
          name: data.name,
        });
      }
    }, 0);
  }, [props.now]);
  return (
    <Modal title="重命名" visible={visible} onOk={onSubmit} onCancel={onCancel}>
      <Form ref={form} fieldData={fieldData} />
    </Modal>
  );
}
