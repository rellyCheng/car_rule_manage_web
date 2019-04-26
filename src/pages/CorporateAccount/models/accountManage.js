import { fetchAddProject,
       fetchCreateAccount,
       fetchWorkerList,
       fetchUpdataAccount,
       fetchDelteWorker,
       fetchLookWorker,
       fechProjectList} from '@/services/accountManage';
import {message} from 'antd'
import { constants } from 'crypto';

export default {
    namespace: 'accountManage',
  
    state: {
      accountManage:{},
      saveState:"",
      saveWorkerList:[],//员工管理列表
      saveSearchWorkerList:[],//搜索出的员工列表
      saveLookWorker:{},
      saveProjectList:[],//项目列表
    },

    effects: {
      //添加项目
      *fetchAddProject({ payload ,callback}, { call, put }) {
        console.log(22)
        console.log(payload )
        const response = yield call(fetchAddProject,payload);
        console.log(response)
        if(response.state==1){
          callback(response)
        }
      },
      //创建账号
      *fetchCreateAccount({ payload,callback }, { call, put }){
        const response = yield call(fetchCreateAccount,payload);
        callback(response);
      },
      //修改账号
      *fetchUpdataAccount({ payload,callback }, { call, put }){
        const response = yield call(fetchUpdataAccount,payload);
        callback(response);
      },
      //移除员工
      *fetchDelteWorker({ payload,callback}, { call, put }){
        console.log(payload)
        const response = yield call(fetchDelteWorker,payload);
        if(response.state==1){
          callback(response)
        }
      },
      //员工管理列表
      *fetchWorkerList({ payload }, { call, put }){
        const response = yield call(fetchWorkerList,payload);
        if(response.state==1){
          yield put({
            type: 'saveWorkerList',
            payload: response.data,
          });
        }else{
          message.error(response.message)
        }
      },
      //查看
      *fetchLookWorker({ payload }, { call, put }){
        const response = yield call(fetchLookWorker,payload);
        console.log(response)
        if(response.state==1){
          yield put({
            type: 'saveLookWorker',
            payload: response.data,
          });
        }else{
          message.error(response.message)
        }
      },
      //项目列表
      *fechProjectList({ payload }, { call, put }){
        const response = yield call(fechProjectList,payload);
        if(response.state==1){
          yield put({
            type: 'saveProjectList',
            payload: response.data,
          });
        }else{
          message.error(response.message)
        }
      },
    },
    reducers: {
      saveState(state, { payload }) {
        return {
          ...state,
          saveState: payload,
        };
      },
      saveWorkerList(state, { payload }) {
        return {
          ...state,
          saveWorkerList: payload,
        };
      },
      saveSearchWorkerList(state, { payload }) {
        return {
          ...state,
          saveSearchWorkerList: payload,
        };
      },
      saveLookWorker(state, { payload }) {
        return {
          ...state,
          saveLookWorker: payload,
        };
      },
      saveProjectList(state, { payload }) {
        return {
          ...state,
          saveProjectList: payload,
        };
      },
    }
}