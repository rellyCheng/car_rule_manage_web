import { fetchAptitudeList } from '@/services/employeeAptitude';
import { message } from 'antd';

export default {
  namespace: 'employeeAptitude',

  state: {
    aptitudeList:[]//资质信息
  },

  effects: {
    //查询资质信息
    *fetchAptitudeList({ payload }, { call, put }){
      const response = yield call(fetchAptitudeList, payload);
      if (response.state == 1) {
        yield put({
          type: 'saveAptitudeList',
          payload: response.data,
        });
      }else{
        message.error(response.message)
      }
    }
  },

  reducers: {
    //查询资质信息
    saveAptitudeList(state, {payload}) {
      return {
        ...state,
        aptitudeList: payload,
      };
    },
  }
};
