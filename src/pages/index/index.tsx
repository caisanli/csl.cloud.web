import React from 'react';
import FileContainer from '@/components/File';
export default function Index() {
  let data: any[] = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      id: i,
      name: '文件 - ' + i,
      size: '1.5M',
      modifyDate: '2020/11/14 05:55:23',
    });
  }
  return <FileContainer data={data} type="person" canCreateFolder />;
}
