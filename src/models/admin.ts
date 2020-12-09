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

let localAdminStr: string = localStorage.getItem('admin') || '{}';
let localAdmin: any = JSON.parse(localAdminStr);

const IndexModel: UserModelType = {
  namespace: 'admin',
  state: {
    update: undefined,
    name: localAdmin.name || '',
  },
  reducers: {
    update(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};

export default IndexModel;
