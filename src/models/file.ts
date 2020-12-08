import { Reducer } from 'umi';
import { ORDER, SORT } from '@/types';
export interface FileModelState {
  folder: string;
  style: string;
  no: number;
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
    setFolder: Reducer<FileModelState>;
    setNo: Reducer<FileModelState>
  };
}
const baseReducer:Reducer<FileModelState> = (state, action) => {
  return {
    ...state,
    ...action.payload,
  };
}

const IndexModel: FileModelType = {
  namespace: 'file',
  state: {
    folder: '0',
    no: 1,
    style: 'table',
    sort: {
      type: 'name',
      order: 'DESC',
    },
  },
  reducers: {
    setStyle: baseReducer,
    setSort: baseReducer,
    setFolder: baseReducer,
    setNo: baseReducer
  },
};




export default IndexModel;
