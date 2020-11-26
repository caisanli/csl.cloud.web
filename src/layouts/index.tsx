import React from 'react';
import { IRouteComponentProps } from 'umi';
import { Layout } from 'antd';
import { Head } from '@/components/Layouts';
import Login from '@/components/Login';
import '@/assets/css/global.less';
import { INavItem } from '@/types';
const { Header } = Layout;

const nav: INavItem[] = [
  {
    name: '个人',
    value: 'person',
    path: '/',
  },
  {
    name: '团队',
    value: 'group',
    path: '/group',
  },
];

export default function(props: IRouteComponentProps) {
  const pathname = props.location.pathname;
  if (pathname === '/login') {
    return <Login />;
  } else if (pathname.startsWith('/admin')) {
    return props.children;
  }
  return (
    <Layout>
      <Header>
        <Head nav={ nav } type="user" />
      </Header>
      <Layout>{props.children}</Layout>
    </Layout>
  );
}
