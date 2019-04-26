import { fetchAllPlatFormAccountList,fetchBuildAccountList,fetchAddBuildAccount} from '@/services/winsheSuperManage';
export default {
    namespace: 'supermanage',
  
    state: {
      allAccountList:[],
      buildAccountList:[],
    },

    effects: {
      *fetchAllPlatFormAccountList({ payload }, { call, put }) {
        const response = yield call(fetchAllPlatFormAccountList,payload);
        console.log(response)
        if(response.state==1){
          yield put({
            type: 'allAccountList',
            payload: response.data,
          });
        }
      },
      *fetchBuildAccountList({ payload }, { call, put }) {
        const response = yield call(fetchBuildAccountList,payload);
        console.log(response)
        if(response.state==1){
          yield put({
            type: 'buildAccountList',
            payload: response.data,
          });
        }
      },
      *fetchAddBuildAccount({ payload,callback}, { call, put }) {
        const response = yield call(fetchAddBuildAccount,payload);
        callback(response)
      },
     
    },
    reducers: {
      allAccountList(state, { payload }) {
        return {
          ...state,
          allAccountList:payload,
        };
      },
      buildAccountList(state, { payload }) {
        return {
          ...state,
          buildAccountList:payload,
        };
      },
    }  
}