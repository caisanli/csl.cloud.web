import React from 'react';
import { Layout } from 'antd';
import CustomLayout, { Main } from '@/components/Layouts';
import { IRouteComponentProps } from 'umi';
const { Content } = Layout;
export default (props: IRouteComponentProps) => {
  if (props.location.pathname === '/group') {
    return (
      <Layout>
        <Content>
          <Main>{props.children}</Main>
        </Content>
      </Layout>
    );
  }
  return <CustomLayout {...props} />;
};
