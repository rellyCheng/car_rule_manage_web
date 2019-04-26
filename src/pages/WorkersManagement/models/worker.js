import { fetchWorkerList,fetchWorkerDetail,fetchKaoQin,
  fetchGongZi,fetchPeiXun,fetchPeiXunDetails,fetchIntelligence,fetchIntelligenceDetails,
  fetchRegister,fetchRegisterDetails,fetchRegisterChange,fetchRegisterProfession} from '@/services/worker';

export default {
  namespace: 'worker',

  state: {
    workerList: [],
    workerDetail:{},
    kaoqinList:[],
    gongziList:[],
    peixunList:[],
    peixundetails:[],
    intelligenceList:[],
    intelligenceDetails:[],
    register:[],
    registerDetails:[],
    registerChange:[],
    registerProfession:[]
  },

  effects: {
    *fetchWorkerList({ payload }, { call, put }) {
      const response = yield call(fetchWorkerList,payload);
      if(response.state==1){
        yield put({
          type: 'saveList',         
          payload: response.data,
        });
      }
    },
    *fetchWorkerDetail({ payload }, { call, put }) {
      const response = yield call(fetchWorkerDetail,payload);
      if(response.state==1){
        yield put({
          type: 'saveDetail',
          payload: response.data,
        });
      }
    },
    *fetchKaoQin({ payload }, { call, put }) {
      const response = yield call(fetchKaoQin,payload);
      let list = response.data.result.map((item,index)=>{
        item.key = index;
        return item;
      })
      response.data.result=list;
      if(response.state==1){
        yield put({
          type: 'saveKaoQin',
          payload: response.data,
        });
      }
    },
    *fetchGongZi({ payload }, { call, put }) {
      const response = yield call(fetchGongZi,payload);
      if(response.state==1){
        yield put({
          type: 'saveGongZi',
          payload: response.data,
        });
      }
    },
    *fetchPeiXun({ payload }, { call, put }) {
      const response = yield call(fetchPeiXun,payload);
      if(response.state==1){
        yield put({
          type: 'savePeiXun',
          payload: response.data,
        });
      }
    },
    *fetchPeiXunDetails({ payload }, { call, put }) {
      const response = yield call(fetchPeiXunDetails,payload);
      if(response.state==1){
        yield put({
          type: 'savePeiXunDetails',
          payload: response.data,
        });
      }
    },
    
    *fetchIntelligence({ payload }, { call, put }) {
      const response = yield call(fetchIntelligence,payload);
      if(response.state==1){
        yield put({
          type: 'saveIntelligence',
          payload: response.data,
        });
      }
    },
    *fetchIntelligenceDetails({ payload }, { call, put }) {
      const response = yield call(fetchIntelligenceDetails,payload);
      if(response.state==1){
        yield put({
          type: 'saveIntelligenceDetails',
          payload: response.data,
        });
      }
    },
    *fetchRegister({ payload }, { call, put }) {
      const response = yield call(fetchRegister,payload);
      if(response.state==1){
        yield put({
          type: 'saveRegister',
          payload: response.data,
        });
      }
    },
    *fetchRegisterDetails({ payload }, { call, put }) {
      const response = yield call(fetchRegisterDetails,payload);
      if(response.state==1){
        yield put({
          type: 'saveRegisterDetails',
          payload: response.data,
        });
      }
    },    
    *fetchRegisterChange({ payload }, { call, put }) {
      const response = yield call(fetchRegisterChange,payload);
      if(response.state==1){
        yield put({
          type: 'saveRegisterChange',
          payload: response.data,
        });
      }
    }, 
    *fetchRegisterProfession({ payload }, { call, put }) {
      const response = yield call(fetchRegisterProfession,payload);
      if(response.state==1){
        yield put({
          type: 'saveRegisterProfession',
          payload: response.data,
        });
      }
    },
  },

  reducers: {
    saveList(state, { payload }) {
      console.log(payload)
        return {
          ...state,
          ...payload,
          workerList:payload.result,
        };
    },
    saveDetail(state, { payload }) {
      return {
        ...state,
        workerDetail:payload,
      };
    },
    saveKaoQin(state, { payload }) {
      return {
        ...state,
        kaoqinList:payload,
      };
    },
    saveGongZi(state, { payload }) {
      return {
        ...state,
        gongziList:payload,
      };
    },
    savePeiXun(state, { payload }) {
      return {
        ...state,
        peixunList:payload,
      };
    },  
    savePeiXunDetails(state, { payload }) {
      return {
        ...state,
        peixundetails:payload,
      };
    },
    saveIntelligence(state, { payload }) {
      return {
        ...state,
        intelligenceList:payload,
      };
    },
    saveIntelligenceDetails(state, { payload }) {
      return {
        ...state,
        intelligenceDetails:payload,
      };
    },
    saveRegister(state, { payload }) {
      return {
        ...state,
        register:payload,
      };
    },
    saveRegisterDetails(state, { payload }) {
      return {
        ...state,
        registerDetails:payload,
      };
    },
    saveRegisterChange(state, { payload }) {
      return {
        ...state,
        registerChange:payload,
      };
    },
    saveRegisterProfession(state, { payload }) {
      return {
        ...state,
        registerProfession:payload,
      };
    },
  },
};
