import React from 'react';
import { Layout } from 'antd';
import { Head, Main } from '@/components/Layouts';
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
        <Head nav={ nav } type="admin" />
      </Header>
      <Content style={{
          paddingLeft: '50px',
          paddingRight: '50px'
        }}>
        <Main>
          { props.children }
        </Main>
      </Content>
    </Layout>
  )
};
