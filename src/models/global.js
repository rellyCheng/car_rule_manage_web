import { queryNotices,fetchbasicData,fetchPlatFormAccountList,fetchAddPlatFormAccount, fetchRoleList,
  fetchChangeRole,fetchAppList,fetchEditPlatFormAccount,fetchbankList,fetchbankCardInfoList} from '@/services/api';
import { message } from 'antd';
import { reloadAuthorized } from '@/utils/Authorized';
import token from '@/utils/token';
import { setAuthority } from '@/utils/authority';
export default {
  namespace: 'global',

  state: {
    collapsed: false,
    notices: [],
    basicData:[],//省市区选择
    platFormAccountList:[],
    editPlatFormAccount:[],
    roleList:[],
    appList:[],//对接地区
    BankList:[],
    BankCardInfoList:[],
  },

  effects: {
    *fetchNotices(_, { call, put }) {
      const data = yield call(queryNotices);
      yield put({
        type: 'saveNotices',
        payload: data.data,
      });
      yield put({
        type: 'user/changeNotifyCount',
        payload: data.data.length,
      });
    },
    *clearNotices({ payload }, { put, select }) {
      yield put({
        type: 'saveClearedNotices',
        payload,
      });
      const count = yield select(state => state.global.notices.length);
      yield put({
        type: 'user/changeNotifyCount',
        payload: count,
      });
    },

    *fetchbasicData({ payload,callback }, { call, put }) {
      const response = yield call(fetchbasicData,payload);
      console.log(response)
      if(response.state==1){
        if(callback!==undefined){
          callback(response.data);
        }
        yield put({
          type: 'saveBasicData',
          payload: response.data,
        });
      }
    },
    *fetchPlatFormAccountList({ _ },{ call, put }) {
        const response = yield call(fetchPlatFormAccountList);
        console.log(response.data);
        if(response.state==1){
          yield put({
            type: 'savePlatFormAccountList',
            payload:response.data,
          });
        }
    },
    
    *fetchRoleList({ _ },{ call, put }) {
      const response = yield call(fetchRoleList);
      console.log(response.data);
      if(response.state==1){
        yield put({
          type: 'saveRoleList',
          payload:response.data,
        });
      }
    },  
    *fetchPlatFormAccountList({ _ },{ call, put }) {
          const response = yield call(fetchPlatFormAccountList);
          console.log(response.data);
          if(response.state==1){
            yield put({
              type: 'savePlatFormAccountList',
              payload:response.data,
            });
          }
    },
    *fetchAccountList({ payload }, { call, put }) {
      const response = yield call(fetchAccountList,payload);
      console.log(response)
      if(response.state==1){
        yield put({
          type: 'AccountList',
          payload: response.data,
        });
      }
    },
    //添加账号
    *fetchAddPlatFormAccount({ payload,callback },{ call, put }) {
      const response = yield call(fetchAddPlatFormAccount,payload);
      callback (response);
    },
    //修改账号
    *fetchEditPlatFormAccount({ payload,callback },{ call, put }) {
      const response = yield call(fetchEditPlatFormAccount,payload);
      callback (response);
    },
    *fetchChangeRole({ payload },{ call, put }) {
      const response = yield call(fetchChangeRole,payload);
      console.log(response.data);
      if(response.state==1){
        token.save(response.data.token);
        sessionStorage.setItem('name', response.data.username);
        sessionStorage.setItem('userJid', response.data.userJid);
        sessionStorage.setItem('userName', response.data.userName);
        sessionStorage.setItem('companyJid', response.data.companyJid);
        sessionStorage.setItem('accountJid', response.data.accountJid);
        sessionStorage.setItem('accountName', response.data.accountName);
        sessionStorage.setItem('companyName', response.data.companyName);
        sessionStorage.setItem('roleEnum', response.data.roleEnum);
        setAuthority(response.data.authority);
        reloadAuthorized();
        history.go(0) 
      }
    },
    
    *fetchAppList({ payload },{ call, put }) {
      const response = yield call(fetchAppList,payload);
      console.log(response.data);
      if(response.state==1){
        yield put({
          type: 'saveAppList',
          payload:response.data,
        });
      }
    },
    *fetchbankList({ payload }, { call, put }) {
      const response = yield call(fetchbankList,payload);
      console.log(response)
      if(response.state==1){
        yield put({
          type: 'saveBankList',
          payload: response.data,
        });
      }
    },   
    *fetchbankCardInfoList({ payload }, { call, put }) {
      const response = yield call(fetchbankCardInfoList,payload);
      console.log(response)
      if(response.state==1){
        yield put({
          type: 'saveBankCardInfoList',
          payload: response.data,
        });
      }
    },  
  },

  reducers: {
    changeLayoutCollapsed(state, { payload }) {
      return {
        ...state,
        collapsed: payload,
      };
    },
    saveNotices(state, { payload }) {
      return {
        ...state,
        notices: payload,
      };
    },
    saveClearedNotices(state, { payload }) {
      return {
        ...state,
        notices: state.notices.filter(item => item.type !== payload),
      };
    },
    // 省市区
    saveBasicData(state, { payload }){
      return {
        ...state,
        provinceCity:payload,
      };
    },
    savePlatFormAccountList(state, { payload }){
      return {
        ...state,
        platFormAccountList:payload,
      };
    },
    editPlatFormAccount(state, { payload }){
      return {
        ...state,
        editPlatFormAccount:payload,
      };
    },
    
    saveRoleList(state, { payload }){
      return {
        ...state,
        roleList:payload,
      };
    },
    saveAppList(state, { payload }){
      return {
        ...state,
        appList:payload,
      };
    },
    saveBankList(state, { payload }){
      return {
        ...state,
        BankList:payload,
      };
    },
    
    saveBankCardInfoList(state, { payload }){
      return {
        ...state,
        BankCardInfoList:payload,
      };
    },
    
    
  },

  subscriptions: {
    setup({ history }) {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      return history.listen(({ pathname, search }) => {
        if (typeof window.ga !== 'undefined') {
          window.ga('send', 'pageview', pathname + search);
        }
      });
    },
  },


};
