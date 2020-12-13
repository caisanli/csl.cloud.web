import React from 'react';
import { Layout } from 'antd';
import CustomLayout, { Main } from '@/components/Layouts';
import { IRouteComponentProps } from 'umi';
import { testPath } from '@/utils';
const { Content } = Layout;
const notAside: (string | RegExp)[] = [
  '/group',
  /\/preview\/[\w]+/,
  /\/share\/[\d]+/,
];

export default (props: IRouteComponentProps) => {
  if (testPath(props.location.pathname, notAside)) {
    return (
      <Content>
        <Main>{props.children}</Main>
      </Content>
    );
  }
  return <CustomLayout {...props} />;
};
