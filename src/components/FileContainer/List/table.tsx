import React from 'react';
import Table from '@/components/Table';
import { ITableIconProps } from '@/types';

export default function(props: ITableIconProps) {
  return (
    <Table
      dataIndex="id"
      select
      selecting
      { ...props }
    />
  );
}
