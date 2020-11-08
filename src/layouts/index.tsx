import React from 'react';
import { IRouteComponentProps } from 'umi';
import { Layout } from 'antd';
import { Head } from '@/components/Layouts';
import Login from '@/components/Login';
import '@/assets/css/global.less';
const { Header } = Layout;

export default function(props: IRouteComponentProps) {
  if (props.location.pathname === '/login') {
    return <Login />;
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
