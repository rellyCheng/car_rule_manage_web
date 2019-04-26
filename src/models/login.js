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
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      // Login successfully
      if (response.state === 1) {
        yield put({
          type: 'changeLoginStatus',
          payload: response,
        });
        token.save(response.data.token);
        sessionStorage.setItem('name', response.data.username);
        sessionStorage.setItem('userJid', response.data.userJid);
        sessionStorage.setItem('userName', response.data.userName);
        sessionStorage.setItem('companyJid', response.data.companyJid);
        sessionStorage.setItem('accountJid', response.data.accountJid);
        sessionStorage.setItem('accountName', response.data.accountName);
        sessionStorage.setItem('companyName', response.data.companyName);
        sessionStorage.setItem('roleEnum', response.data.roleEnum);
        reloadAuthorized();
        // const urlParams = new URL(window.location.href);
        // const params = getPageQuery();
        // let { redirect } = params;
        // if (redirect) {
        //   const redirectUrlParams = new URL(redirect);
        //   if (redirectUrlParams.origin === urlParams.origin) {
        //     redirect = redirect.substr(urlParams.origin.length);
        //     if (redirect.startsWith('/#')) {
        //       redirect = redirect.substr(2);
        //     }
        //   } else {
        //     window.location.href = redirect;
        //     return;
        //   }
        // }
        yield put(routerRedux.replace('/index'));
      } else {
        message.error(response.message);
      }
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },

    *logout(_, { call, put }) {
      // remove token in sessionStorage
      const response = yield call(fakeLogout);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      yield put(
        routerRedux.push({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        })
      );
      token.remove();
      reloadAuthorized();
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.data.authority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};
