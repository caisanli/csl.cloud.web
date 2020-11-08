import { Effect, Reducer, Subscription } from 'umi';
import { personMenu, groupMenu } from '@/assets/js/aside';
import { INavItem } from '@/types';

export interface AsideModelState {
  menu: INavItem[];
  active: string;
}

export interface AsideModelType {
  namespace: 'aside';
  state: AsideModelState;
  effects: {
    query: Effect;
  };
  reducers: {
    update: Reducer<AsideModelState>;
    clear: Reducer<AsideModelState>;
    setActive: Reducer<AsideModelState>;
  };
  subscriptions: { setup: Subscription };
}
let groupMenuLoaded = false;
let indexMenuLoaded = false;
const IndexModel: AsideModelType = {
  namespace: 'aside',
  state: {
    menu: [],
    active: '',
  },
  effects: {
    *query({ payload }, { call, put, select }) {
      const user = yield select(state => {
        return state.user;
      });

      const result = yield call(function() {
        return new Promise(function(resolve) {
          setTimeout(() => {
            resolve(groupMenu);
          }, 200);
        });
      });

      yield put({
        type: 'update',
        payload: {
          menu: result,
          active: localStorage.getItem('asideNavActive') || result[0].value,
        },
      });
    },
  },
  reducers: {
    update(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    clear(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    setActive(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
  subscriptions: {
    setup(props) {
      return props.history.listen(({ pathname }) => {
        if (pathname === '/') {
          groupMenuLoaded = false;
          setPersonMenu(props);
        } else if (pathname.startsWith('/group/')) {
          indexMenuLoaded = false;
          if (groupMenuLoaded) return;
          props.dispatch({
            type: 'query',
          });
          groupMenuLoaded = true;
        } else if (pathname.startsWith('/index/')) {
          groupMenuLoaded = false;
          setPersonMenu(props);
        } else {
          indexMenuLoaded = false;
          groupMenuLoaded = false;
        }
      });
    },
  },
};
function setPersonMenu(props) {
  if (indexMenuLoaded) return;
  props.dispatch({
    type: 'update',
    payload: {
      menu: personMenu,
      active: localStorage.getItem('asideNavActive') || personMenu[0].value,
    },
  });
  indexMenuLoaded = true;
}
export default IndexModel;
