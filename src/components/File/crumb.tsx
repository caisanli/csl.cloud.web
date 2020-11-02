import React from 'react';
import { Divider } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import styles from './index.module.less';

interface ICrumbItem {
  name: string;
  id: number;
  pid: number;
}
interface IProps {
  crumbs: ICrumbItem[],
  fileCount?: number,
  folderCount?: number
}

function onClickCrumb(item: ICrumbItem) {

}

export default function (props: IProps) {
  return (
    <div className={styles.crumb}>
      <div className={styles.crumbLeft}>
        {props.crumbs.length ? (<><span className={ styles.crumbItem }>返回上一级</span><Divider type="vertical" /></>) : <span>全部文件</span>}

        {
          props.crumbs.map(
            item => (
              <>
                <span onClick={ () => onClickCrumb(item) } className={ styles.crumbItem }>{item.name}</span>
                <RightOutlined className={ styles.crumbItemIcon } />
              </>
            )
          )
        }
      </div>
      <div className={styles.crumbRight}>
        共{props.folderCount || 0}个文件夹，{props.fileCount || 0}个文件
      </div>
    </div>
  )
}
