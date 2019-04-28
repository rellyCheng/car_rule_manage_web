import {fechAddBrokenInfo} from '@/services/user';
import {message} from 'antd';


export default {
  namespace: 'brokeManage',

  state: {
  },

  effects: {
    *fechAddBrokenInfo({ payload,callback}, { call, put }) {
      const response = yield call(fechAddBrokenInfo,payload);
      callback(response)
    }
  },

  reducers: {
 
  },
};
