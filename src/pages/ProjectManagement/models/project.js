import {fetchProjectList,fetchProjectDetail,fetchAttendanceList,fetchLaoWuList,fetchCorpList,fetchPlatformCorpList,fetchBuilderLicenseList,fetchBankCardInfoList,fetchProjectTrainingList,
  fetchProjectEmployeeList,fetchCropProjectDetail,fetchTeamMasterList,fetchCountLabel,fetchSaveProject,fetchUpdateProject,fetchWorkerList,fetchTeamMasterInfo,fetchProjectWorkerDetail,
  fetchUpdateTeamMasterInfo,fetchUpdateCountryTeamMasterInfo,fetchUpdateProjectWorker,fetchAttendanceListCount,
  fetchProjectEmployeeWorkerDetail,fetchWorkerInfoWorkerDetail,fetchEmployeeFormUpdate,fetchCountryEmployeeFormUpdate,fetchPlatformTeamMasterList,fetchUpdateTeam
} from '@/services/project';
import Item from 'antd/lib/list/Item';
import { message } from 'antd';

export default {
  namespace: 'project',

  state: {
    tabNum:'1',
    projectList: [],//项目列表
    projectDetail:{},//项目详情列表
    attendanceList:[],//考勤
    laoWuList:[],//相关劳务包
    corpList:[],//参建单位
    platformCorpList:[],//获取平台上传的参建单位
    builderLicenseList:[], //项目许可证
    bankCardInfoList:[],//银行卡列表
    projectTrainingList:[], //培训记录
    projectEmployeeList:[],//项目职员
    projectWorkerDetail:{},//项目工人信息1
    ProjectEmployeeWorkerDetail:{},//项目工人信息2
    WorkerInfoWorkerDetail:{},//项目工人信息3
    cropProjectDetail:{},//参建单位详情
    teamMasterList:[],//班组
    platformTeamMasterList:[],
    countLabel:{},
    saveProject:[],
    attendanceList:{},
    projectJid:'',
    teamMasterInfo:{},//班组详情
    attendanceListCount:{}
    
  },

  effects: {
    *fetchTabNum({payload},{call,put}){
      yield put({
        type: 'tabNum',
        payload: payload,
      });
    },
    *fetchProjectList({ payload }, { call, put }) {
      const response = yield call(fetchProjectList,payload);
      if(response.state==1){
       yield put({
          type: 'saveList',
          payload: response.data,
        });
      }
    },
    *fetchProjectDetail({ payload }, { call, put }) {
        const response = yield call(fetchProjectDetail,payload);
        console.log(response)
        if(response.state==1){
          yield put({
            type: 'saveDetail',
            payload: response.data,
          });
        }
    },
    *fetchLaoWuList({ payload }, { call, put }) {
      const response = yield call(fetchLaoWuList,payload);
      console.log(response);
      if(response.state==1){
        yield put({
          type: 'saveLaoWuList',
          payload: response.data,
        });
      }
    },
    *fetchAttendanceList({ payload }, { call, put }) {
      const response = yield call(fetchAttendanceList,payload);
      console.log(response);
      if(response.state==1){
        yield put({
          type: 'saveAttendanceList',
          payload: response.data,
        });
      }
    },
    *fetchCorpList({ payload }, { call, put }) {
      const response = yield call(fetchCorpList,payload);
      console.log(response);
      if(response.state==1){
        yield put({
          type: 'saveCorpList',
          payload: response.data,
        });
      }
    },
    
    *fetchPlatformCorpList({ payload }, { call, put }) {
      const response = yield call(fetchPlatformCorpList,payload);
      console.log(response);
      if(response.state==1){
        yield put({
          type: 'savePlatformCorpList',
          payload: response.data,
        });
      }
    },
    
    *fetchBankCardInfoList({ payload }, { call, put }) {
      const response = yield call(fetchBankCardInfoList,payload);
      console.log(response);
      if(response.state==1){
        yield put({
          type: 'saveBankCardInfoList',
          payload: response.data,
        });
      }
    },
    *fetchProjectTrainingList({ payload }, { call, put }) {
      const response = yield call(fetchProjectTrainingList,payload);
      console.log(response);
      if(response.state==1){
        yield put({
          type: 'saveProjectTrainingList',
          payload: response.data,
        });
      }
    },
    *fetchProjectEmployeeList({ payload }, { call, put }) {
      const response = yield call(fetchProjectEmployeeList,payload);
      console.log(response);
      if(response.state==1){
        yield put({
          type: 'saveProjectEmployeeList',
          payload: response.data,
        });
      }
    },
    //获取工人信息1
    *fetchProjectWorkerDetail({ payload,callback }, { call, put }) {
      const response = yield call(fetchProjectWorkerDetail,payload);
      console.log(response);
      if(response.state==1){
        if(callback){
          callback(response)
        }
        
        yield put({
          type: 'saveProjectWorkerDetail',
          payload: response.data,
        });
      }
    },
    //获取工人信息2
    *fetchProjectEmployeeWorkerDetail({ payload }, { call, put }) {
      const response = yield call(fetchProjectEmployeeWorkerDetail,payload);
      console.log(response);
      if(response.state==1){
        yield put({
          type: 'saveProjectEmployeeWorkerDetail',
          payload: response.data,
        });
      }
    },
    //获取工人信息3
    *fetchWorkerInfoWorkerDetail({ payload,callback }, { call, put }) {
      const response = yield call(fetchWorkerInfoWorkerDetail,payload);
      console.log(response);
      if(response.state==1){
        if(callback){
          callback(response)
        }
        yield put({
          type: 'saveWorkerInfoWorkerDetail',
          payload: response.data,
        });
      }
    },
    // 编辑管工平台工人
    *fetchEmployeeFormUpdate({payload,callback},{call,put}){
      const response = yield call(fetchEmployeeFormUpdate,payload);
      callback(response)
    },
    // 编辑国家平台工人
    *fetchCountryEmployeeFormUpdate({payload,callback},{call,put}){
      const response = yield call(fetchCountryEmployeeFormUpdate,payload);
      callback(response)
    },

    *fetchCropProjectDetail({ payload }, { call, put }) {
      const response = yield call(fetchCropProjectDetail,payload);
      console.log(response);
      if(response.state==1){
        yield put({
          type: 'saveCropProjectDetail',
          payload: response.data,
        });
      }
    },
    *fetchTeamMasterList({ payload }, { call, put }) {
      const response = yield call(fetchTeamMasterList,payload);
      console.log(response);
      if(response.state==1){
        yield put({
          type: 'saveTeamMasterList',
          payload: response.data,
        });
      }
    },
    *fetchPlatformTeamMasterList({ payload }, { call, put }) {
      const response = yield call(fetchPlatformTeamMasterList,payload);
      console.log(response);
      if(response.state==1){
        yield put({
          type: 'savePlatformTeamMasterList',
          payload: response.data,
        });
      }
    },
    *fetchCountLabel({ payload }, { call, put }) {
      const response = yield call(fetchCountLabel,payload);
      console.log(response);
      if(response.state==1){
        yield put({
          type: 'saveCountLabel',
          payload: response.data,
        });
      }
    },
    *fetchBuilderLicenseList({ payload,callback}, { call, put }) {
      const response = yield call(fetchBuilderLicenseList,payload);
      console.log(response);
      if(response.state==1){
        let list = response.data.map((item,index)=>{
          item.key = index+1;
          return item;
        })
        callback(response.data)
        yield put({
          type: 'saveBuilderLicenseList',
          payload: list,
        });
      }
    },
    
    *fetchSaveProject({ payload }, { call, put }) {
      const response = yield call(fetchSaveProject,payload);
      console.log(response);
      if(response.state==1){
        yield put({
          type: 'saveProject',
          payload: response.data,
        });
        message.success("保存成功");
        history.go(-1);
      }else{
        message.error(response.message);
      }
    },
    *fetchUpdateProject({ payload,callback}, { call, put }) {
      const response = yield call(fetchUpdateProject,payload);
      console.log(response);
      callback(response)
    },

    
    *fetchWorkerList({ payload,callback}, { call, put }) {
      const response = yield call(fetchWorkerList,payload);
      console.log(response);
      callback(response.data)
    },

      //获取班组详情
      *fetchTeamMasterInfo({payload,callback},{call,put}){
        const response = yield call(fetchTeamMasterInfo,payload);
        
        if(response.state == 1){
          if(callback){
             callback(response)
          }
          yield put({
            type: 'saveTeamMasterInfo',
            payload: response.data,
          });
        }else{
          message.error(response.message)
        } 
      },

      //修改管工平台班组
      *fetchUpdateTeamMasterInfo({payload,callback},{call,put}){
        const response = yield call(fetchUpdateTeamMasterInfo,payload);
        if(response.state == 1){
          callback(response)
        }else{
          message.error(response.message)
        } 
      },

      //修改国家平台班组
      *fetchUpdateCountryTeamMasterInfo({payload,callback},{call,put}){
        const response = yield call(fetchUpdateCountryTeamMasterInfo,payload);
        if(response.state == 1){
          callback(response)
        }else{
          message.error(response.message)
        } 
      },

      //修改人员
      *fetchUpdateProjectWorker({payload},{call,put}){
        const response = yield call(fetchUpdateProjectWorker,payload);
        if(response.state == 1){
          message.success("修改成功");
        }else{
          message.error(response.message)
        } 
      },
      //考勤统计
      *fetchAttendanceListCount({payload},{call,put}){
        const response = yield call(fetchAttendanceListCount,payload);
        if(response.state == 1){
          yield put({
            type: 'saveAttendanceListCount',
            payload: response.data,
          });
        }else{
          message.error(response.message)
        } 
      },
      *fetchUpdateTeam({payload,callback},{call,put}){
        const response = yield call(fetchUpdateTeam,payload);
        if(response.state == 1){
          callback(response);
        }else{
          message.error(response.message)
        } 
      }
  },

  reducers: {
    tabNum(state,{payload}){
      return {
        ...state,
        tabNum:"1",
        projectJid:payload
      };
    },
    saveList(state, { payload }) {
        return {
          ...state,
          ...payload,
          projectList:payload.result,
        };
    },
    saveDetail(state, { payload }) {
        return {
            ...state,
            projectDetail:payload,
        };
    },
    
    saveAttendanceList(state, { payload }) {
      return {
          ...state,
          attendanceList:payload,
      };
    },
    saveLaoWuList(state, { payload }) {
      return {
          ...state,
          laoWuList:payload,
      };
    },
    saveCorpList(state, { payload }) {
      return {
          ...state,
          corpList:payload,
      };
    },
    savePlatformCorpList(state,{payload}){
      return {
        ...state,
        platformCorpList:payload,
      };
    },
    saveBuilderLicenseList(state,{payload}){
      return {
        ...state,
        builderLicenseList:payload,
      };
    },
    saveBankCardInfoList(state,{payload}){
      return {
        ...state,
        bankCardInfoList:payload,
      };
    },
    saveProjectTrainingList(state,{payload}){
      return {
        ...state,
        projectTrainingList:payload,
      };
    },
    saveProjectEmployeeList(state,{payload}){
      return {
        ...state,
        projectEmployeeList:payload,
      };
    },
    saveProjectWorkerDetail(state,{payload}){
      return {
        ...state,
        projectWorkerDetail:payload
      }
    },
    saveProjectEmployeeWorkerDetail(state,{payload}){
      return {
        ...state,
        ProjectEmployeeWorkerDetail:payload
      }
    },
    saveWorkerInfoWorkerDetail(state,{payload}){
      return {
        ...state,
        WorkerInfoWorkerDetail:payload
      }
    },
    saveCropProjectDetail(state,{payload}){
      return {
        ...state,
        cropProjectDetail:payload
      };
    },
    saveTeamMasterList(state,{payload}){
      return {
        ...state,
        teamMasterList:payload
      };
    },
    savePlatformTeamMasterList(state,{payload}){
      return {
        ...state,
        platformTeamMasterList:payload
      };
    },
    saveCountLabel(state,{payload}){
      return {
        ...state,
        countLabel:payload
      };
    },
    saveProject(state,{payload}){
      return {
        ...state,
        saveProject:payload.result
      };
    },
    saveTeamMasterInfo(state, { payload }) {
      return {
        ...state,
        teamMasterInfo:payload
      };
    },
    saveAttendanceListCount(state,{payload}){
      return{
        ...state,
        attendanceListCount:payload
      }
    }
  },
};
