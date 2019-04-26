import {fetchProjectList} from '@/services/project';
// import { fetchBusinessList} from '@/services/business';
import {
  fetchUserAccount,
  fetchCreateAccount,
  fetchUpdataAccout,
  fetchLookUserAccount,
  fetchRemoveAccount,
  fetchCorpList,
  fetchSuperviseList,
  fetchProjectAssignedAccountList,
  fetchassignedToProject,
  fetchdropDownCorpList,
  fetchAllWorkerList,
  fetchAlreadyExsitAccountList,
  assignedToProject2,
  fetchAreaSuperviseList,
  fetchCorpAssignedAccountList,
  fetchAssignedToCorp,
  fetchGetRealName,
  fetchdropDownProjectList,
  fetchRelevanceProject,
  fetchUnuploadeWorker
  } from '@/services/account'
import {message} from 'antd'
export default {
    namespace: 'account',
  
    state: {
      accountInfo:{},
      projectList: [],//项目列表
      businessList: [],
      saveUserAccount:[],//用户账号
      saveLookUserAccount:{},//查看账号
      saveCorpList:[],//企业列表
      saveSuperviseList:[],//权限列表
      projectAssignedAccountList:[],//项目已分配权限列表
      singleproject:[],//保存单条数据
      dropDownCorpList:[],//下拉企业列表
      allWorkerList:[],//获取企业权限列表
      alreadyExsitAccountList:[],//企业已经分配权限
      areaSuperviseList:[],
      corpAssignedAccountList:[],
      saveQueryContent:{},
      dropDownProjectList:[],//下拉项目列表
      unuploadeWorker:[],//未上传工人列表
    },

    effects: {
      *fetchProjectList({ payload }, { call, put }) {
        const response = yield call(fetchProjectList,payload);
        if(response.state==1){
          yield put({
            type: 'saveProjectList',
            payload: response.data,
          });
        }
      },
      //获取用户账号
      *fetchUserAccount({ payload }, { call, put }){
        const response = yield call(fetchUserAccount,payload);
        if(response.state==1){
          yield put({
            type: 'saveUserAccount',
            payload: response.data,
          });
        }else{
          message.error(response.message)
        }
      },
       //创建账号
    *fetchCreateAccount({ payload,callback }, { call, put }){
      const response = yield call(fetchCreateAccount,payload);
      console.log(response)
      if(response.state==1){
        callback(response)
      }else{
        message.error(response.message);
      }
    },
    //编辑账号
    *fetchUpdataAccout({ payload,callback }, { call, put }){
      const response = yield call(fetchUpdataAccout,payload);
      if(response.state==1){
        callback(response)
      }else{
        message.error(response.message);
      }
    },
    //查看账号
    *fetchLookUserAccount({ payload,callback }, { call, put }){
      const response = yield call(fetchLookUserAccount,payload);
      if(response.state==1){
        yield put({
          type: 'saveLookUserAccount',
          payload: response.data,
        });
      }else{
        message.error(response.message)
      }
    },
    //移出账号
    *fetchRemoveAccount({ payload,callback }, { call, put }){
      const response = yield call(fetchRemoveAccount,payload);
      if(response.state==1){
        callback(response)
      }
    },
    //获取企业列表
    *fetchCorpList({payload},{call,put}){
      const response = yield call(fetchCorpList,payload);
      if(response.state==1){
        yield put({
          type:'saveCorpList',
          payload:response.data
        })
      }else{
        message.error(res.message)
      }
    },
    //下拉企业列表
    *fetchdropDownCorpList({payload},{call,put}){
      const response = yield call(fetchdropDownCorpList,payload);
      if(response.state==1){
        yield put({
          type:'savedropDownCorpList',
          payload:response.data
        })
      }else{
        message.error(res.message)
      }
    },
    //下拉项目列表
    *fetchdropDownProjectList({payload},{call,put}){
      const response = yield call(fetchdropDownProjectList,payload);
      if(response.state==1){
        yield put({
          type:'savedropDownProjectList',
          payload:response.data
        })
      }else{
        message.error(res.message)
      }
    },
    //得到权限列表
    *fetchSuperviseList({payload},{call,put}){
      const response = yield call(fetchSuperviseList,payload);
      if(response.state==1){
        yield put({
          type:'saveSuperviseList',
          payload:response.data
        })
      }else{
        message.error(res.message)
      }
    },
    //获取该项目已分配过的账号信息集合
    *fetchProjectAssignedAccountList({payload,callback},{call,put}){
      const response = yield call(fetchProjectAssignedAccountList,payload);
      if(response.state==1){
        callback(response.data)
        yield put({
          type:'saveProjectAssignedAccountList',
          payload:response.data
        })
      }else{
        message.error(res.message)
      }
    },
    //分配权限
    *fetchassignedToProject({payload,callback},{call,put}){
      const response = yield call(fetchassignedToProject,payload);
      if(response.state==1){
        callback(response)
      }
    },
    //获取企业权限列表
    *fetchAllWorkerList({payload},{call,put}){
      const response = yield call(fetchAllWorkerList,payload);
      if(response.state==1){
        yield put({
          type:'saveAllWorkerList',
          payload:response.data
        })
      }else{
        message.error(res.message)
      }
    },
    //获取企业已经分配过的账号信息集合
    *fetchAlreadyExsitAccountList({payload,callback},{call,put}){
      const response = yield call(fetchAlreadyExsitAccountList,payload);
      if(response.state==1){
        callback(response.data)
        yield put({
          type:'saveAlreadyExsitAccountList',
          payload:response.data
        })
      }else{
        message.error(res.message)
      }
    },
    //企业分配权限
    *assignedToProject2({payload,callback},{call,put}){
      const response = yield call(assignedToProject2,payload);
      if(response.state==1){
        callback(response)
      }
    },
    
    *fetchAreaSuperviseList({payload},{call,put}){
      const response = yield call(fetchAreaSuperviseList,payload);
      if(response.state==1){
        yield put({
          type:'saveAreaSuperviseList',
          payload:response.data
        })
      }else{
        message.error(res.message)
      }
    },
    *fetchCorpAssignedAccountList({payload,callback},{call,put}){
      const response = yield call(fetchCorpAssignedAccountList,payload);
      if(response.state==1){
        callback(response.data)
        yield put({
          type:'saveCorpAssignedAccountList',
          payload:response.data
        })
      }else{
        message.error(res.message)
      }
    },
    *fetchAssignedToCorp({payload,callback},{call,put}){
      const response = yield call(fetchAssignedToCorp,payload);
        if(response.state==1){
          callback(response)
        }
    },
    //根据手机号获取手机号对应的姓名
    *fetchGetRealName({payload,callback},{call,put}){
      const response = yield call(fetchGetRealName,payload);
      if(response.state==1){
       callback(response)
      }
    },
     //根据手机号获取手机号对应的姓名
     *fetchRelevanceProject({payload,callback},{call,put}){
      const response = yield call(fetchRelevanceProject,payload);
      if(response.state==1){
       callback(response)
      }else{
        message.info(response.message)
      }
    },
    //未上传工人管理
    *fetchUnuploadeWorker({payload},{call,put}){
      const response = yield call(fetchUnuploadeWorker,payload);
        if(response.state==1){
          yield put({
            type:'saveUnuploadeWorker',
            payload:response.data
          })
      }else{
        message.info(response.message)
      }
    }
    },
  
    reducers: {
      saveProjectList(state, { payload }) {
        return {
          ...state,
          projectList:payload,
        };
      },
      saveCorpList(state, { payload }) {
        return {
          ...state,
          businessList:payload.result
       };
     },
     saveUserAccount(state, { payload }) {
      return {
        ...state,
        ...payload,
        saveUserAccount:payload
     };
   },
   saveLookUserAccount(state, { payload }) {
    return {
      ...state,
      saveLookUserAccount:payload
   };
  },
  saveCorpList(state, { payload }) {
    return {
      ...state,
      saveCorpList:payload
   };
  },
  savedropDownCorpList(state, { payload }) {
    return {
      ...state,
      dropDownCorpList:payload
   };
  },
  savedropDownProjectList(state, { payload }) {
    return {
      ...state,
      dropDownProjectList:payload
   };
  },
  saveSuperviseList(state, { payload }) {
    return {
      ...state,
      saveSuperviseList:payload
   };
  },
  saveProjectAssignedAccountList(state, { payload }) {
    return {
      ...state,
      projectAssignedAccountList:payload
   };
  },
  saveAllWorkerList(state, { payload }) {
    return {
      ...state,
      allWorkerList:payload
   };
  },
  saveAlreadyExsitAccountList(state,{payload}){
    return{
      ...state,
      alreadyExsitAccountList:payload
    };
  },
  saveAreaSuperviseList(state,{payload}){
    return{
      ...state,
      areaSuperviseList:payload
    };
  },
  saveCorpAssignedAccountList(state,{payload}){
    return{
      ...state,
      corpAssignedAccountList:payload
    }
  },
  saveUnuploadeWorker(state,{payload}){
    return{
      ...state,
      unuploadeWorker:payload
    }
  }
  }
}