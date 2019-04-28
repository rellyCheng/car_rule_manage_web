import {fechAddBrokenInfo,fetchBrokeList,fechUpdateBrokenInfo,fetchDelBrokeInfo} from '@/services/user';
import {message} from 'antd';


export default {
  namespace: 'brokeManage',

  state: {
    brokeList:{}
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
  },

  reducers: {
    saveBrokeList(state, {payload}){
      return{
        ...state,
        brokeList:payload
      }
    },
  },
};
