import {fetchUserInfo,fetchDelUserInfo,fetchAddUserInfo} from '@/services/user';
import {message} from 'antd';


export default {
  namespace: 'userManage',

  state: {
    userInfo:{}
  },

  effects: {
    *fetchUserInfo({ payload}, { call, put }) {
      const response = yield call(fetchUserInfo,payload);
      yield put({
        type:'saveUserInfo',
        payload:response.data,
      })
    },
    *fetchDelUserInfo({ payload,callback}, { call, put }) {
      const response = yield call(fetchDelUserInfo,payload);
      callback(response)
    },
    *fetchAddUserInfo({ payload,callback}, { call, put }) {
      const response = yield call(fetchAddUserInfo,payload);
      callback(response)
    },
  },

  reducers: {
    saveUserInfo(state, {payload}){
      return{
        ...state,
        userInfo:payload
      }
  },
  },
};
