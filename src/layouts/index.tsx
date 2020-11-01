import React from 'react';
import { IRouteComponentProps } from 'umi';
import Login from '@/components/Login';
import '@/assets/css/global.less';

export default function(props: IRouteComponentProps) {
  if (props.location.pathname === '/login') {
    return <Login />;
  }
  return props.children;
}
