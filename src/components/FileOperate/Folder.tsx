import React from 'react';
import { Form, Modal, Input } from 'antd';
import { IOperateProps } from '@/types';
import { formLayout, validateMessages, modalProps } from './props';
const Folder = function(props: IOperateProps, ref) {
  const [ form ] = Form.useForm();

  function onSubmit() {
    form.validateFields().then(props.onSubmit)
  }

  return (
    <Modal
          title="文件夹"
          visible={ props.visible }
          onOk={ onSubmit }
          onCancel={ props.onCancel }
          { ...modalProps }
        >
          <Form ref={ ref } form={ form } {...formLayout} validateMessages={ validateMessages }>
            <Form.Item label="名称" name="name" rules={[
              { required: true },
              { type: 'string', min: 1, max: 24 }
            ]}>
              <Input placeholder="请输入名称" />
            </Form.Item>
            <Form.Item label="描述" name="describe" rules={[
              { type: 'string', min: 0, max: 255 }
            ]}>
              <Input.TextArea placeholder="请输入描述" />
            </Form.Item>
          </Form>
      </Modal>
  )
}

export default React.forwardRef(Folder);
