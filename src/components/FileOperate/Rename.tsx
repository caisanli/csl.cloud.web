import React from 'react';
import { Modal, Form, Input } from 'antd';
import { IOperateProps } from "@/types";
import { formLayout, modalProps, validateMessages } from './props';
const rename = function(props: IOperateProps, ref) {
  const [ form ] = Form.useForm();

  function onSubmit() {
    form.validateFields().then(props.onSubmit)
  }
  return (
    <Modal
          title="重命名"
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
          </Form>
      </Modal>
  );
}
export default React.forwardRef(rename)
