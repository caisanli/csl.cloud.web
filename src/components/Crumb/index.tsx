import { ICrumbItem } from '@/types';
import React from 'react';
import { Divider } from 'antd';
import styles from './index.module.less';
import { RightOutlined } from '@ant-design/icons';

export type ICrumb = {
  crumbs?: ICrumbItem[];
  onClick?: (item: ICrumbItem) => void;
};

export default function(props: ICrumb) {
  let { crumbs, onClick } = props;
  function onClickCrumb(item: ICrumbItem, index: number) {
    if ((crumbs && crumbs.length - 1 === index) || !onClick) return;
    onClick(item);
  }
  // 返回上一级
  function onBackPrev() {
    const item = crumbs ? crumbs[crumbs.length - 2] : null;
    item && onClick && onClick(item);
  }
  return (
    <div className={styles.crumb}>
      {crumbs && crumbs.length > 1 ? (
        <div className={styles.crumbItem}>
          <span className={styles.crumbItemName} onClick={onBackPrev}>
            返回上一级
          </span>
          <Divider type="vertical" />
        </div>
      ) : (
        <div className={styles.crumbItem}>
          <span className={styles.crumbItemName}>全部文件</span>
          <Divider type="vertical" />
        </div>
      )}
      {crumbs &&
        crumbs.map((item, i) => (
          <div key={item.id} className={styles.crumbItem}>
            <span
              onClick={() => onClickCrumb(item, i)}
              className={styles.crumbItemName}
            >
              {item.name}
            </span>
            <RightOutlined className={styles.crumbItemIcon} />
          </div>
        ))}
    </div>
  );
}
