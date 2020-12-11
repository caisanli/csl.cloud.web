import { Reducer } from 'umi';
import { ORDER, SORT } from '@/types';
export interface FileModelState {
  folder: string;
  style: string;
  no: number;
  name: string;
  sort: {
    type: SORT;
    order: ORDER;
  };
}

export interface FileModelType {
  namespace: 'file';
  state: FileModelState;
  reducers: {
    update: Reducer<FileModelState>;
  };
}

const IndexModel: FileModelType = {
  namespace: 'file',
  state: {
    name: '',
    folder: '0',
    no: 1,
    style: 'table',
    sort: {
      type: 'name',
      order: 'DESC',
    },
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
