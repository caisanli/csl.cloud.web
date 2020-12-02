import React, { FC } from 'react';
import { Divider } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { ConnectProps, connect, FileModelState } from 'umi';
import styles from './index.module.less';
import { ICrumbItem } from '@/types';

interface IProps {
  crumbs: ICrumbItem[],
  fileCount?: number,
  folderCount?: number
}
interface IProps extends ConnectProps {
  file: FileModelState
}

const Index: FC<IProps> = function (props: IProps) {
  function onClickCrumb(item: ICrumbItem) {
    props.dispatch &&
    props.dispatch({
      type: 'file/setFolder',
      payload: {
        ...props.file,
        folder: item.parentId
      }
    })
  }
  return (
    <div className={styles.crumb}>
      <div className={styles.crumbLeft}>
        {
          props.crumbs.length > 1
            ? (<div className={styles.crumbItem}><span className={ styles.crumbItemName }>返回上一级</span><Divider type="vertical" /></div>)
            : (<div className={ styles.crumbItem }><span className={ styles.crumbItemName }>全部文件</span><Divider type="vertical" /></div>)
        }
        {
          props.crumbs.map(
            item => (
              <div key={item.id} className={ styles.crumbItem }>
                <span onClick={ () => onClickCrumb(item) } className={ styles.crumbItemName }>{item.name}</span>
                <RightOutlined className={ styles.crumbItemIcon } />
              </div>
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
const mapStateToProps = state => ({
  file: state.file
})

export default connect(mapStateToProps)(Index);
