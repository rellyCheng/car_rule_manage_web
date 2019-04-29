import {fechAddBrokenInfo,
    fetchBrokeList,
    fechUpdateBrokenInfo,
    fetchDelBrokeInfo,
    fetchBrokeUser,
    fetchDeal
  } from '@/services/user';
import {message} from 'antd';


export default {
  namespace: 'brokeManage',

  state: {
    brokeList:{},
    brokeUser:[]
  },

  effects: {
    *fechAddBrokenInfo({ payload,callback}, { call, put }) {
      const response = yield call(fechAddBrokenInfo,payload);
      callback(response)
    },
    *fetchBrokeList({ payload,callback}, { call, put }) {
      const response = yield call(fetchBrokeList,payload);
      yield put({
        type:'saveBrokeList',
        payload:response.data,
      })
    },
    *fechUpdateBrokenInfo({ payload,callback}, { call, put }) {
      const response = yield call(fechUpdateBrokenInfo ,payload);
      callback(response)
    },
    *fetchDelBrokeInfo({ payload}, { call, put }) {
      const response = yield call(fetchDelBrokeInfo ,payload);
      if(response.state="OK"){
        message.success('删除成功')
      }else{
        message.error(response.message)
      }
    },
    *fetchBrokeUser({payload},{call,put}){
      const response = yield call(fetchBrokeUser,payload);
      yield put({
        type:'saveBrokeUser',
        payload:response.data,
      })
    },
    *fetchDeal({payload,callback},{call}){
      const response = yield call (fetchDeal,payload);
      callback(response)
    }
  },

  reducers: {
    saveBrokeList(state, {payload}){
      return{
        ...state,
        brokeList:payload
      }
    },
    saveBrokeUser(state,{payload}){
      return {
        ...state,
        brokeUser:payload
      }
    }
  },
};
