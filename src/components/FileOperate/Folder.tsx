import React, { useEffect, useState } from 'react';
import Form, { IFieldProps } from '@/components/Form';
import Modal from '@/components/Modal';
import { message } from 'antd';
import { IFormInstance, IOperateProps } from '@/types';
import api from '@/api/folder';

const fieldData: IFieldProps[] = [{
  key: 'name',
  label: '名称',
  rules: [
    { required: true },
    { type: 'string', max: 24, min: 2 }
  ],
  input: {
    placeholder: '输入名称'
  }
}, {
  key: 'description',
  label: '描述',
  rules: [
    { type: 'string', max: 150 }
  ],
  input: {
    customType: 'textarea',
    placeholder: '输入描述'
  }
}]
let form: IFormInstance | null;
const Folder = function(props: IOperateProps, ref) {
  const [mVisible, setVisible] = useState<boolean>(false);
  const { type, now, data, id, onSuccess } = props;
  useEffect(function() {
    if(!now) return ;
    if(type === 'create') {
      form && form.resetFields();
      setVisible(true);
    } else if(type === 'update' && id) {
      api.getById(id).then(res => {
        setVisible(true);
        setTimeout(() => {
          form && form.setFieldsValue(
            res.data
          )
        }, 0)
      })
    }
    return function() {
      console.log('开始销毁...')
      form = null;
    }
  }, [props.now])

  // 开始提交
  function onSubmit() {
    form && form.validateFields().then( async (values: any) => {
      let { name, description } = values;
      if(type === 'create') {
        await api.create(data?.parentId, name, description)
        message.success('创建成功');
      } else if(id) {
        await api.update(id, name, description);
        message.success('更新成功');
      }
      setVisible(false);
      onSuccess && onSuccess();
    })
  }
  // 关闭
  function onCancel() {
    setVisible(false);
  }
  function onRef(formIns: IFormInstance) {
    form = formIns;
  }
  return (
    <Modal
          title="文件夹"
          visible={ mVisible }
          onOk={ onSubmit }
          onCancel={ onCancel }
        >
          <Form
            ref = { onRef }
            fieldData = { fieldData }
          />
      </Modal>
  )
}

export default React.forwardRef(Folder);
