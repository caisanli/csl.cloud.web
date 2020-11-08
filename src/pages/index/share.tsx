import React from 'react';
import { Tabs } from 'antd';
import styles from './share.module.less';
const { TabPane } = Tabs;

export default function() {
  function callback(key) {}
  return (
    <Tabs className={styles.share} defaultActiveKey="1" onChange={callback}>
      <TabPane tab="我的分享" key="1">
        我的分享
      </TabPane>
      <TabPane tab="分享给我" key="2">
        分享给我
      </TabPane>
    </Tabs>
  );
}
