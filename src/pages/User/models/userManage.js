import {fetchUserInfo,fetchDelUserInfo,fetchAddUserInfo,fetchEditUserInfo} from '@/services/user';
import {message} from 'antd';


export default {
  namespace: 'userManage',

  state: {
    userInfo:{}
  },

  effects: {
    *fetchUserInfo({ payload}, { call, put }) {
      const response = yield call(fetchUserInfo,payload);
      yield put({
        type:'saveUserInfo',
        payload:response.data,
      })
    },
    *fetchDelUserInfo({ payload,callback}, { call, put }) {
      const response = yield call(fetchDelUserInfo,payload);
      callback(response)
    },
    *fetchAddUserInfo({ payload,callback}, { call, put }) {
      const response = yield call(fetchAddUserInfo,payload);
      console.log(response)
      if(response.state=="OK"){
        message.success("添加成功！")
        callback(response)
      }else{
        message.error(response.message)
      }
    },
    *fetchEditUserInfo({ payload,callback}, { call, put }) {
      const response = yield call(fetchEditUserInfo,payload);
      console.log(response)
      if(response.state=="OK"){
        message.success("编辑成功！")
        callback(response)
      }else{
        message.error(response.message)
      }
    },
  },

  reducers: {
    saveUserInfo(state, {payload}){
      return{
        ...state,
        userInfo:payload
      }
  },
  },
};
