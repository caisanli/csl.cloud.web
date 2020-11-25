import React from 'react';
import { Layout } from 'antd';
import { Head } from '@/components/Layouts';
import { IRouteComponentProps } from 'umi';
import { INavItem } from '@/types';
import Login from './login';
const { Content, Header } = Layout;

const nav: INavItem[] = [{
  name: '用户',
  value: 'user',
  path: '/admin/user'
}, {
  name: '团队',
  value: 'group',
  path: '/admin/group'
}]

export default (props: IRouteComponentProps) => {
  let pathname = props.location.pathname;
  if(pathname === '/admin/login') {
    return <Login />
  }

  return (
    <Layout>
      <Header>
        <Head nav={ nav } />
      </Header>
      <Content>
        {props.children}
      </Content>
    </Layout>
  )
};
