import {fetchAddProjectManageCorp,
        fetchAddProjectManageTeam,
        fetchAddAttendenceForm,
        fetchAddProjectManageEmployeeForm,
        fetchAddProjectManageTeamGroup,
        fetchUploadProjectBasicInfo,
        fetchUploadContractor,
        fetchUploadTeam,
        fetchUploadProjectWorker,
        fetchUploadProjectTraning,
        fetchUploadWorkerAttendance,
        fetchProjectCorpUpdate,
        fetchEntryExit,
        fetchEntryExitDetail,
        fetchAddWorkerContract,//上传 人员合同
        fetchworkerContractDetail,//人员合同详情
  } from '@/services/project';
import {fetchBusinessList} from '@/services/business';
import { fetchDelProjectCorpInfo,
          fetchDelTeam,
          fetchDelEmployee,
  } from '@/services/item';
  import { message } from 'antd';
  
  export default {
    namespace: 'projectLocalUpload',
  
    state: {
      businessList: [],
      entryExitDetail:[],
      workerContractDetail:[]
    },
  
    effects: {  
      *fetchAddProjectManageCorp({ payload,callback}, { call, put }) {
        const response = yield call(fetchAddProjectManageCorp,payload);
        callback(response);
      },  
      *fetchAddProjectManageTeam({ payload,callback}, { call, put }) {
        const response = yield call(fetchAddProjectManageTeam,payload);
        callback(response);
      },
      *fetchAddAttendenceForm({ payload,callback}, { call, put }) {
        const response = yield call(fetchAddAttendenceForm,payload);
        callback(response);
      },
      *fetchAddProjectManageEmployeeForm({ payload,callback}, { call, put }) {
        const response = yield call(fetchAddProjectManageEmployeeForm,payload);
        callback(response);
      },
      //批量添加班组  
      *fetchAddProjectManageTeamGroup({ payload,callback}, { call, put }) {
        const response = yield call(fetchAddProjectManageTeamGroup,payload);
        callback(response)
      },     
      // 企业列表
      *fetchBusinessList({ payload }, { call, put }) {
        const response = yield call(fetchBusinessList,payload);
        console.log(response.data);
        if(response.state==1){
          yield put({
            type: 'saveList',
            payload: response.data,
          });
        }
      },
      //项目查询并同步
      *fetchUploadProjectBasicInfo({payload},{call,put}){
        const response = yield call(fetchUploadProjectBasicInfo,payload);
        callback(response)
      },
      //参建单位查询并同步
      *fetchUploadContractor({payload,callback},{call,put}){
        const response = yield call(fetchUploadContractor,payload);
        callback(response)
      },
      //班组查询并同步
      *fetchUploadTeam({payload,callback},{call,put}){
        const response = yield call(fetchUploadTeam,payload);
        callback(response)
      },
      //工人查询并同步
      *fetchUploadProjectWorker({payload},{call,put}){
        const response = yield call(fetchUploadProjectWorker,payload);
        callback(response)
      },
      //项目培训查询并同步
      *fetchUploadProjectTraning({payload},{call,put}){
        const response = yield call(fetchUploadProjectTraning,payload);
        callback(response)
      },
      //工人考勤查询并同步
      *fetchUploadWorkerAttendance({payload},{call,put}){
        const response = yield call(fetchUploadWorkerAttendance,payload);
        callback(response)
      },
      //删除参建单位
      *fetchDelProjectCorpInfo({payload,callback},{call,put}){
        console.log(payload)
        const response = yield call(fetchDelProjectCorpInfo,payload);
        if(response.state == 1){
            callback(response)
        }else{
          message.error(response.message)
        } 
      },
      //修改参建单位
      *fetchProjectCorpUpdate({payload,callback},{call,put}){
        const response = yield call(fetchProjectCorpUpdate,payload);
        callback(response)
      },
      //删除班组
      *fetchDelTeam({payload,callback},{call,put}){
        const response = yield call(fetchDelTeam,payload);
        if(response.state == 1){
          callback(response)
        }else{
          message.error(response.message)
        } 
      },
      //删除工人
      *fetchDelEmployee({payload,callback},{call,put}){
        const response = yield call(fetchDelEmployee,payload);
        if(response.state == 1){
          callback(response)
        }else{
          message.error(response.message)
        } 
      },
      //工人进退场
      *fetchEntryExit({payload,callback},{call,put}){
        const response = yield call(fetchEntryExit,payload);
        callback(response)
      },
      //工人进退场详情
      *fetchEntryExitDetail({payload,callback},{call,put}){
        const response = yield call(fetchEntryExitDetail,payload);
        if(response.state == 1){
          yield put({
            type: 'saveEntryExitDetail',
            payload: response,
          });
        }else{
          message.error(response.message)
        } 
      },
      //上传人员合同
    *fetchAddWorkerContract({payload,callback},{call,put}){
      console.log(payload)
      const response = yield call(fetchAddWorkerContract, payload);
      if (response.state == 1) {
        message.success('添加成功!');
        callback(response);
      }else{
        message.error(response.message)
      }
    },
    //人员合同详情
    *fetchworkerContractDetail({payload},{call,put}){
      const response = yield call(fetchworkerContractDetail, payload);
      if (response.state == 1) {
        yield put({
          type: 'saveWorkerContractDetail',
          payload: response.data,
        });
      }else{
        message.error(response.message)
      }
    }
    },
  
    reducers: {
      saveList(state, { payload }) {
        return {
          ...state,
          businessList:payload.result
        };
      },
      saveEntryExitDetail(state,{payload}){
        return {
          ...state,
          entryExitDetail:payload
        };
      },
      saveWorkerContractDetail(state,{payload}){
        return {
          ...state,
          workerContractDetail:payload
        };
      }
    },
  };
  