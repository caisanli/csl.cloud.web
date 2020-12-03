import React from 'react';
import { Divider } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { ConnectProps, connect, FileModelState } from 'umi';
import styles from './index.module.less';
import { ICrumbItem } from '@/types';

interface IProps {
  crumbs?: ICrumbItem[],
  fileCount?: number,
  folderCount?: number
}
interface IProps extends ConnectProps {
  file: FileModelState
}

const Index = function (props: IProps) {
  const { crumbs } = props;
  function onClickCrumb(item: ICrumbItem, index: number) {
    if(crumbs && crumbs.length - 1 === index)
      return ;
    dispatch(item.id);
  }
  // 返回上一级
  function onBackPrev() {
    const item = crumbs ? crumbs[crumbs.length - 2] : null;
    item && dispatch(item.id);
  }
  function dispatch(id: string) {
    props.dispatch &&
    props.dispatch({
      type: 'file/setFolder',
      payload: {
        ...props.file,
        folder: id
      }
    })
  }
  return (
    <div className={styles.crumb}>
      <div className={styles.crumbLeft}>
        {
          crumbs && crumbs.length > 1
            ? (<div className={styles.crumbItem}>
                <span className={ styles.crumbItemName } onClick={ onBackPrev }>返回上一级</span>
                <Divider type="vertical" />
              </div>)
            : (<div className={ styles.crumbItem }>
                <span className={ styles.crumbItemName }>全部文件</span>
                <Divider type="vertical" />
              </div>)
        }
        {
          crumbs && crumbs.map(
            (item, i) => (
              <div key={ item.id }
                className={ styles.crumbItem }
              >
                <span
                  onClick={ () => onClickCrumb(item, i) }
                  className={ styles.crumbItemName }
                >
                    { item.name }
                </span>
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
