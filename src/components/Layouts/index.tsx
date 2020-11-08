import React from 'react';
import { Layout } from 'antd';
import { IRouteComponentProps } from 'umi';
import Aside from './aside';
import Head from './head';
import Main from './main/index';
const { Header, Sider, Content } = Layout;

export { Aside, Head, Main };

export default (props: IRouteComponentProps) => {
  return (
    <>
      <Sider style={{ overflow: 'hidden' }}>
        <Aside />
      </Sider>
      <Content>
        <Main>{props.children}</Main>
      </Content>
    </>
  );
};
