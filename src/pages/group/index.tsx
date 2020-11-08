import React, { FC } from 'react';
import { history, ConnectProps, UserModelState, connect } from 'umi';
interface IProps extends ConnectProps {
  user: UserModelState;
}
const IndexPage: FC<IProps> = function(props) {
  function goIndex() {
    props.dispatch &&
      props.dispatch({
        type: 'user/updateGroup',
        payload: {
          info: { ...props.user },
          group: 5,
        },
      });
    history.push('/group/file');
  }
  return (
    <div>
      <button onClick={goIndex}>去首页</button>
    </div>
  );
};
const mapStateProps = state => ({
  user: state.user.info,
});
export default connect(mapStateProps)(IndexPage);
