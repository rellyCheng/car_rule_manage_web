import {
  fetchBadCredit,
  fetchBadCreditDetails,
  fetchGoodCredit,
  fetchGoodCreditDetails,
  fetchBlackCredit,
  fetchBlackCreditDetails,
  fetchPersonalBadCredit,
  fetchPersonalBadCreditDetails,
  fetchPersonalGoodCredit,
  fetchPersonalGoodCreditDetails,
  fetchPersonalBlackCredit,
  fetchPersonalBlackCreditDetails,
} from '@/services/credit';

export default {
  namespace: 'credit',

  state: {
    badCredit: [],
    badCreditDetails: [],
    goodCredit: [],
    goodCreditDetails: [],
    blackCredit: [],
    blackCreditDetails: [],
    personalbadCredit: [],
    personalbadCreditDetails: [],
    personalgoodCredit: [],
    personalgoodCreditDetails: [],
    personalblackCredit: [],
    personalblackCreditDetails: [],
  },

  effects: {
    // 企业不良行为列表
    *fetchBadCredit({ payload }, { call, put }) {
      const response = yield call(fetchBadCredit, payload);
      console.log(response);
      if (response.state == 1) {
        yield put({
          type: 'savebadCredit',
          payload: response.data,
        });
      }
    },
    *fetchBadCreditDetails({ payload }, { call, put }) {
      const response = yield call(fetchBadCreditDetails, payload);
      // console.log(response);
      if (response.state == 1) {
        yield put({
          type: 'savebadCreditDetails',
          payload: response.data,
        });
      }
    },
    *fetchGoodCredit({ payload }, { call, put }) {
      const response = yield call(fetchGoodCredit, payload);
      // console.log(response);
      if (response.state == 1) {
        yield put({
          type: 'savegoodCredit',
          payload: response.data,
        });
      }
    },
    *fetchGoodCreditDetails({ payload }, { call, put }) {
      const response = yield call(fetchGoodCreditDetails, payload);
      console.log(response);
      if (response.state == 1) {
        yield put({
          type: 'savegoodCreditDetails',
          payload: response.data,
        });
      }
    },
    *fetchBlackCredit({ payload }, { call, put }) {
      const response = yield call(fetchBlackCredit, payload);
      console.log(response);
      if (response.state == 1) {
        yield put({
          type: 'saveblackCredit',
          payload: response.data,
        });
      }
    },
    *fetchBlackCreditDetails({ payload }, { call, put }) {
      const response = yield call(fetchBlackCreditDetails, payload);
      console.log(response);
      if (response.state == 1) {
        yield put({
          type: 'saveblackCreditDetails',
          payload: response.data,
        });
      }
    },
    //人员不良行为列表
    *fetchPersonalBadCredit({ payload }, { call, put }) {
      const response = yield call(fetchPersonalBadCredit, payload);
      console.log(response);
      if (response.state == 1) {
        yield put({
          type: 'savepersonalbadCredit',
          payload: response.data,
        });
      }
    },
    *fetchPersonalBadCreditDetails({ payload }, { call, put }) {
      const response = yield call(fetchPersonalBadCreditDetails, payload);
      // console.log(response);
      if (response.state == 1) {
        yield put({
          type: 'savepersonalbadCreditDetails',
          payload: response.data,
        });
      }
    },
    *fetchPersonalGoodCredit({ payload }, { call, put }) {
      const response = yield call(fetchPersonalGoodCredit, payload);
      // console.log(response);
      if (response.state == 1) {
        yield put({
          type: 'savepersonalgoodCredit',
          payload: response.data,
        });
      }
    },
    *fetchPersonalGoodCreditDetails({ payload }, { call, put }) {
      const response = yield call(fetchPersonalGoodCreditDetails, payload);
      console.log(response);
      if (response.state == 1) {
        yield put({
          type: 'savepersonalgoodCreditDetails',
          payload: response.data,
        });
      }
    },
    *fetchPersonalBlackCredit({ payload }, { call, put }) {
      const response = yield call(fetchPersonalBlackCredit, payload);
      console.log(response);
      if (response.state == 1) {
        yield put({
          type: 'savepersonalblackCredit',
          payload: response.data,
        });
      }
    },
    *fetchPersonalBlackCreditDetails({ payload }, { call, put }) {
      const response = yield call(fetchPersonalBlackCreditDetails, payload);
      console.log(response);
      if (response.state == 1) {
        yield put({
          type: 'savepersonalblackCreditDetails',
          payload: response.data,
        });
      }
    },
  },

  reducers: {
    savebadCredit(state, { payload }) {
      return {
        ...state,
        badCredit: payload,
      };
    },
    savebadCreditDetails(state, { payload }) {
      return {
        ...state,
        badCreditDetails: payload,
      };
    },
    savegoodCredit(state, { payload }) {
      return {
        ...state,
        goodCredit: payload,
      };
    },
    savegoodCreditDetails(state, { payload }) {
      return {
        ...state,
        goodCreditDetails: payload,
      };
    },
    saveblackCredit(state, { payload }) {
      return {
        ...state,
        blackCredit: payload,
      };
    },
    saveblackCreditDetails(state, { payload }) {
      return {
        ...state,
        blackCreditDetails: payload,
      };
    },
    savepersonalbadCredit(state, { payload }) {
      return {
        ...state,
        personalbadCredit: payload,
      };
    },
    savepersonalbadCreditDetails(state, { payload }) {
      return {
        ...state,
        personalbadCreditDetails: payload,
      };
    },
    savepersonalgoodCredit(state, { payload }) {
      return {
        ...state,
        personalgoodCredit: payload,
      };
    },
    savepersonalgoodCreditDetails(state, { payload }) {
      return {
        ...state,
        personalgoodCreditDetails: payload,
      };
    },
    savepersonalblackCredit(state, { payload }) {
      return {
        ...state,
        personalblackCredit: payload,
      };
    },
    savepersonalblackCreditDetails(state, { payload }) {
      return {
        ...state,
        personalblackCreditDetails: payload,
      };
    },
  },
};
