import { fetchBusinessList,fetchBusinessListDetail,fetchBusinessZiZhi,fetchBusinessZiZhiDetails,fetchBusinessZhiYuan,fetchAddBusiness} from '@/services/business';

export default {
  namespace: 'business',

  state: {
    businessList: [],
    businessListDetail:[],
    businessZiZhi:[],
    businessZiZhiDetails:[],
    businessZhiYuan:[],
  },

  effects: {
    // 企业列表
    *fetchBusinessList({ payload }, { call, put }) {
      const response = yield call(fetchBusinessList,payload);
      console.log(response.data);
      let list = response.data.result.map((item,index)=>{
        item.key = index+1;
        return item;
      })
      response.data.result=list;
      if(response.state==1){
        yield put({
          type: 'saveList',
          payload: response.data,
        });
      }
    },
    //企业详情
    *fetchBusinessListDetail({payload},{call,put}){
      const response = yield call(fetchBusinessListDetail,payload);
      console.log(response.data);
      if(response.state ==1){
          yield put({
            type:'saveListDetails',
            payload:response.data,
          })
      }
    },
    //企业资质
    *fetchBusinessZiZhi({payload},{call,put}){
      const response = yield call(fetchBusinessZiZhi,payload);
      console.log(response.data);
      if(response.state ==1){
          yield put({
            type:'saveZiZhi',
            payload:response.data,
          })
      }
    },
    //企业资质详情
    *fetchBusinessZiZhiDetails({payload},{call,put}){
      const response = yield call(fetchBusinessZiZhiDetails,payload);
      console.log(response.data);
      if(response.state ==1){
          yield put({
            type:'saveZiZhiDetails',
            payload:response.data,
          })
      }
    },
    //企业职员    
    *fetchBusinessZhiYuan({payload},{call,put}){
      const response = yield call(fetchBusinessZhiYuan,payload);
      console.log(response.data);
      if(response.state ==1){
          yield put({
            type:'saveZhiYuan',
            payload:response.data,
          })
      }
    },
    //添加企业  
    *fetchAddBusiness({payload,callback},{call,put}){
      const response = yield call(fetchAddBusiness,payload);
      console.log(response.data);
      callback(response);
    },
  },



  reducers: {
    saveList(state, { payload }) {
        return {
          ...state,
          ...payload,
          businessList:payload.result
        };
    },
    saveListDetails(state, {payload}){
        return{
          ...state,
          ...payload,
          businessListDetail:payload
        }
    },
    saveZiZhi(state, {payload}){
      return{
        ...state,
        ...payload,
        businessZiZhi:payload
      }
    },
    saveZiZhiDetails(state, {payload}){
      return{
        ...state,
        ...payload,
        businessZiZhiDetails:payload
      }
    },
    saveZhiYuan(state, {payload}){
      return{
        ...state,
        ...payload,
        businessZhiYuan:payload
      }
    },
  },
};
