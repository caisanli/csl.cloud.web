import { Reducer } from 'umi';
import { ORDER, SORT } from '@/types';
export interface FileModelState {
  folder: string;
  style: string;
  sort: {
    type: SORT;
    order: ORDER;
  };
}

export interface FileModelType {
  namespace: 'file';
  state: FileModelState;
  reducers: {
    setStyle: Reducer<FileModelState>;
    setSort: Reducer<FileModelState>;
    setFolder: Reducer<FileModelState>
  };
}

const IndexModel: FileModelType = {
  namespace: 'file',
  state: {
    folder: '0',
    style: 'table',
    sort: {
      type: 'name',
      order: 'DESC',
    },
  },
  reducers: {
    setStyle(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    setSort(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    setFolder(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    }
  },
};

export default IndexModel;
