import { fetchIndexData } from '@/services/api';

export default {
  namespace: 'indexData',

  state: {
    saveIndexData: {},
  },

  effects: {
    *fetchIndexData({payload}, { call, put }) {
      const response = yield call(fetchIndexData);
      console.log(response)
      yield put({
        type: 'saveIndexData',
        payload: response.data
      });
    },
  },

  reducers: {
    saveIndexData(state, { payload }) {
      return {
        ...state,
        saveIndexData: payload,
      };
    },
  },
};
