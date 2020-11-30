import React, { FC } from 'react';
import { AminModelState, connect, ConnectProps, history } from 'umi';
import { Form, Input, Button } from 'antd';
import { validateMessages } from '@/components/FileOperate/props';
import { LockOutlined } from '@ant-design/icons';
import styles from './login.module.less';
import api from '@/api/login';
interface IProps extends ConnectProps {
  admin: AminModelState;
}

const IndexPage:FC<IProps> = ({ dispatch }) => {
  const [ form ] = Form.useForm();
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
      form.setFieldsValue({
        password: ''
      })
    })
  }

  return (
    <div className={ styles.login }>
      <Form form={ form } validateMessages={ validateMessages } className={ styles.loginForm } onFinish={ onFinish }>
        <Form.Item
          name="password"
          label="密码"
          rules={[
            { required: true },
            { type: 'string', min: 6, max: 24 }
          ]}
        >
          <Input.Password
            placeholder="请输入管理员密码"
            prefix={<LockOutlined className="site-form-item-icon" />}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">登录</Button>
        </Form.Item>
      </Form>
    </div>
  );
}
export default connect()(IndexPage);
