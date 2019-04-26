import { fetchAES } from '@/services/createForm';

export default {
  namespace: 'createForm',

  state: {
    AESData:''
  },

  effects: {
   
    *fetchAES({ payload,callback  },{call,put}){
       console.log(payload)
      const response = yield call(fetchAES,payload);
      if(response.state ==1){
        callback(response.data); // 返回结果
          yield put({
            type:'saveAESData',
            payload:response.data,
          })
      }
    },
  },



  reducers: {
    saveAESData(state, { payload }) {
        return {
          ...state,
          AESData:payload
        };
    },
  },
};
