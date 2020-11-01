import React from 'react';
import Layout from '@/components/Layouts';
import { IRouteComponentProps } from 'umi';

export default (props: IRouteComponentProps) => {
  return <Layout {...props} />;
};
