import React from 'react';
import { IRouteComponentProps } from 'umi';
import { Layout } from 'antd';
import { Head } from '@/components/Layouts';
import Login from '@/components/Login';
import '@/assets/css/global.less';
const { Header } = Layout;

export default function(props: IRouteComponentProps) {
  const pathname = props.location.pathname;
  if (pathname === '/login') {
    return <Login />;
  } else if (pathname.startsWith('/management')) {
    return props.children;
  }
  return (
    <Layout>
      <Header>
        <Head />
      </Header>
      <Layout>{props.children}</Layout>
    </Layout>
  );
}
