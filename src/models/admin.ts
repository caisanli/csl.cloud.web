import { Reducer } from 'umi';

export interface AminModelState {
  update?: Date;
  name: string;
}

export interface UserModelType {
  namespace: 'admin';
  state: AminModelState;
  reducers: {
    update: Reducer<AminModelState>;
  };
}

const IndexModel: UserModelType = {
  namespace: 'admin',
  state: {
    update: undefined,
    name: '',
  },
  reducers: {
    update(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    }
  },
};

export default IndexModel;
