import React, { FC } from 'react';
import { UserModelState, connect, ConnectProps, history } from 'umi';
import Form, { IFieldProps } from '../Form';
import styles from './login.module.less';
import api from '@/api/login';
import { IFormInstance } from '@/types';
import { message } from 'antd';
interface IProps extends ConnectProps {
  user: UserModelState;
}
const fieldData: IFieldProps[] = [
  {
    key: 'name',
    label: '名称',
    rules: [{ required: true }, { type: 'string', min: 2, max: 24 }],
    input: {
      placeholder: '输入用户名',
    },
  },
  {
    key: 'password',
    label: '密码',
    rules: [{ required: true }, { type: 'string', min: 2 }],
    input: {
      customType: 'password',
      placeholder: '输入密码',
    },
  },
  // {
  //   key: 'remember',
  //   style: {
  //     textAlign: 'right'
  //   },
  //   valuePropName: 'remember',
  //   input: {
  //     customType: 'checkbox',
  //     label: '记住我'
  //   }
  // },
  {
    key: 'submit',
    style: {
      textAlign: 'center',
    },
    input: {
      type: 'primary',
      label: '登录',
      customType: 'button',
      htmlType: 'submit',
      style: {
        width: '100%',
      },
    },
  },
];
const IndexPage: FC<IProps> = ({ dispatch }) => {
  let formIns: IFormInstance;
  function onFinish(values: any) {
    api
      .login(values.name, values.password)
      .then(({ data }) => {
        message.success('登录成功');
        dispatch &&
          dispatch({
            type: 'user/updateInfo',
            payload: {
              info: data,
            },
          });
        localStorage.setItem('topNavActive', '');
        localStorage.setItem('asideNavActive', '');
        localStorage.setItem('user', JSON.stringify(data));
        history.push('/');
      })
      .catch(() => {
        // 清空信息
        formIns.setFieldsValue({
          password: '',
          name: '',
        });
      });
  }

  return (
    <div className={styles.login}>
      <div className={styles.loginForm}>
        <Form
          layout="vertical"
          fieldData={fieldData}
          ref={(form: IFormInstance) => (formIns = form)}
          onFinish={onFinish}
        />
      </div>
      <div className={styles.loginMask}></div>
    </div>
  );
};
export default connect()(IndexPage);
