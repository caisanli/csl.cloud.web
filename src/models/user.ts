import { Reducer } from 'umi';

export interface UserModelState {
  info: {
    [key: string]: any;
  };
  group: number;
}

export interface UserModelType {
  namespace: 'user';
  state: UserModelState;
  reducers: {
    updateInfo: Reducer<UserModelState>;
    updateGroup: Reducer<UserModelState>;
  };
}

const IndexModel: UserModelType = {
  namespace: 'user',
  state: {
    info: {},
    group: 0,
  },
  reducers: {
    updateInfo(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    updateGroup(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};

export default IndexModel;
