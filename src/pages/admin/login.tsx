import React from 'react';
import { history } from 'umi';
import { Form, Input, Button } from 'antd';
import { validateMessages } from '@/components/FileOperate/props';
import { LockOutlined } from '@ant-design/icons';
import styles from './login.module.less';
import { adminLogin } from '@/api/login';


export default function() {

  function onFinish(values: any) {
    console.log(values);
    adminLogin(values.password).then(() => {
      localStorage.setItem('topNavActive', '');
      history.push('/admin/user');
    })
  }

  return (
    <div className={ styles.login }>
      <Form validateMessages={ validateMessages } className={ styles.loginForm } onFinish={ onFinish }>
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
