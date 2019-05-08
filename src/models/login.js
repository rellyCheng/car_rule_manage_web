import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { fakeAccountLogin, getFakeCaptcha, fakeLogout } from '@/services/api';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';
import token from '@/utils/token';
import { message } from 'antd';

export default {
  namespace: 'login',

  state: {
    status: undefined,
    userInfo:{}
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      // Login successfully
      if (response.state === "OK") {
        yield put({
          type: 'changeLoginStatus',
          payload: response
        });
        sessionStorage.setItem('name', response.data.name);
        sessionStorage.setItem('userImg', response.data.image);
        sessionStorage.setItem('userId', response.data.id);
        reloadAuthorized();
        yield put(routerRedux.replace('/index'));
        yield put({
          type:'saveUserInfo',
          payload:response.data,
        })
      } else {
        message.error(response.message);
      }
    },

    *logout(_, { call, put }) {
      yield put(routerRedux.replace('/user/login'));
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.data.authority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
        currentUser:payload.data
      };
    },
    saveUserInfo(state, {payload}){
      return{
        ...state,
        userInfo:payload
      }
  },
  },
};
