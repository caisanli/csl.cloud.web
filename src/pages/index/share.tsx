import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import { history } from 'umi';
import api from '@/api/share';
import styles from './share.module.less';
import { IShare } from '@/types';
import Table, { IColumn } from '@/components/Table';
import { msToDate } from '@/utils';
const { TabPane } = Tabs;

export default function() {
  const columns: IColumn[] = [
    {
      key: 'name',
      value: 'name',
      link: true,
      onClickLink(data: any) {
        history.push({
          pathname: '/index/share/' + data.id,
          state: {
            id: data.id,
          },
        });
        // history.push('/index/share/' + data.id)
      },
      label: '名称',
      ellipsis: true,
      width: '50%',
    },
    {
      key: 'date',
      label: '分享时间',
      render(data: any) {
        return <>{msToDate(data.date)}</>;
      },
    },
    {
      key: 'count',
      label: '文件/文件夹',
      render(data: any) {
        return <>{data.count + '个'}</>;
      },
    },
  ];
  const [list, setList] = useState<IShare[]>([]);
  function callback(key: string) {
    switch (key) {
      case '1':
        query1();
        break;
      case '2':
        query2();
        break;
    }
  }
  useEffect(() => {
    query1();
  }, []);

  async function query1() {
    const { data } = await api.query();
    setList(data);
  }

  async function query2() {
    const { data } = await api.queryToMe();
    setList(data);
  }

  return (
    <Tabs className={styles.share} defaultActiveKey="1" onChange={callback}>
      <TabPane tab="我的分享" key="1">
        <Table dataIndex="id" columns={columns} dataSource={list} />
      </TabPane>
      <TabPane tab="分享给我" key="2">
        <Table dataIndex="id" columns={columns} dataSource={list} />
      </TabPane>
    </Tabs>
  );
}
