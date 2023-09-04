import React, { useState, useEffect } from 'react';
import { history, ConnectProps, UserModelState, connect } from 'umi';
import api from '@/api/group';
import styles from './index.module.less';
import { IGroup } from '@/types';
interface IProps extends ConnectProps {
  user: UserModelState;
}

const IndexPage = function(props: IProps) {
  const [list, setList] = useState<IGroup[]>([]);

  function goIndex(g: IGroup) {
    props.dispatch &&
      props.dispatch({
        type: 'user/updateGroup',
        payload: {
          info: { ...props.user },
          group: g.id,
        },
      });
    localStorage.setItem('group', g.id + '');
    history.push('/group/file');
  }
  useEffect(() => {
    query();
  }, []);
  function query() {
    api.getByUser().then(res => {
      // console.log(res)
      setList(res.data);
    });
  }
  return (
    <div className={styles.groups}>
      {list.map(group => (
        <div className={styles.group} key={group.id}>
          <div className={styles.groupName} onClick={() => goIndex(group)}>
            {group.name}
          </div>
          <div className={styles.groupDescription}>
            {group.description || '--'}
          </div>
        </div>
      ))}
    </div>
  );
};
const mapStateProps = state => ({
  user: state.user.info,
});
export default connect(mapStateProps)(IndexPage);
