import React from 'react';
import { Layout } from 'antd';
import { IRouteComponentProps } from 'umi';
// import Login from '@comp/Login/index.jsx';
const { Header, Sider, Content } = Layout;

export default function(props: IRouteComponentProps) {
  // if (props.location.pathname === '/login') {
  //   return <Login />;
  // }
  console.log('加载首页...');
  return (
    <Layout>
      <Header>

      </Header>
      <Layout>
        <Sider></Sider>
        <Content>
          <div>5</div>
          { props.children }
        </Content>
      </Layout>
    </Layout>
  );
}
