import { Reducer } from 'umi';
export interface FileModelState {
  style: string;
  sort: {
    type: string;
    order: 'asc' | 'desc';
  };
}

export interface FileModelType {
  namespace: 'file';
  state: FileModelState;
  reducers: {
    setStyle: Reducer<FileModelState>;
    setSort: Reducer<FileModelState>;
  };
}

const IndexModel: FileModelType = {
  namespace: 'file',
  state: {
    style: 'table',
    sort: {
      type: 'name',
      order: 'desc',
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
  },
};

export default IndexModel;
