import React, { FC, useRef } from 'react';
import Form, { IFieldProps } from '@/components/Form';
import { AminModelState, connect, ConnectProps, history } from 'umi';
import { LockOutlined } from '@ant-design/icons';
import styles from './login.module.less';
import api from '@/api/login';
import { IFormInstance } from '@/types';
interface IProps extends ConnectProps {
  admin: AminModelState;
}
const fieldData: IFieldProps[] = [{
  key: 'password',
  required: true,
  input: {
    customType: 'password',
    prefix: <LockOutlined />,
    placeholder: '输入密码'
  }
}, {
  key: 'submit',
  input: {
    type: 'primary',
    label: '登录',
    customType: 'button',
    htmlType: 'submit'
  }
}]
const IndexPage:FC<IProps> = ({ dispatch }) => {
  const form = useRef<IFormInstance>();
  function onFinish(values: any) {
    api.adminLogin(values.password).then(() => {
      dispatch && dispatch({
        type: 'admin/update',
        payload: {
          update: new Date(),
          name: '管理员'
        }
      })
      localStorage.setItem('topNavActive', '');
      localStorage.setItem('admin', JSON.stringify({ currentTime: Date.now(), name: '管理员' }));
      history.push('/admin/user');
    }).catch(() => {
      // 清空密码
      form.current && form.current.setFieldsValue({
        password: ''
      })
    })
  }

  return (
    <div className={ styles.login }>
      <Form
        fieldData={ fieldData }
        ref={ form }
        className={ styles.loginForm }
        onFinish={ onFinish }
      />
    </div>
  );
}
export default connect()(IndexPage);
