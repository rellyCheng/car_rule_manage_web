import {
  fetchSubmitProjectlist,
  fetchSubmitProject,
  fetchUpdateProject,
  fetchSubmitProjectDetails,
  fetchAddProjectCorp,
  fetchCorpList,
  fetchAddProjectTeam,
  fetchTeamList,
  fetchAddProjectEmployee,//上传项目人员
  fetchProjectEmployeeList,//查询项目人员列表
  fetchWorkerContractList,//查询 人员合同列表
  fetchAddWorkerEntryExit,//上传 人员进退场
  fetchWorkerEntryExitList,//查询 人员进退场
  fetchAddWorkerAttendance,//上传 人员考勤
  fetchWorkerAttendanceList,//列表 人员考勤
  fetchAddPayRoll,//上传 人员工资
  fetchAddTraining,//上传 项目培训
  fetchTrainingList,//查询 项目培训列表
  
} from '@/services/item';
import { message } from 'antd';
import router from 'umi/router';

export default {
  namespace: 'item',

  state: {
    submitList: [], //用户上传的项目列表
    submitProject: {},
    updateProject: {},
    submitProjectDetails: {},
    projectDetail:{},//项目详情列表
    attendanceList:{},//考勤统计
    wagesList:[],//工资统计
    corpList:[],//参建单位
    teamMasterList:{},//班组信息
    projectEmployeeList:{},//工人信息
    projectTrainingList:{}, //项目培训
    laoWuList:[],//专业分包
    projectJid:'',//当前项目的projectJid
    projectCorpDetail:{},
    ContractList:[],
    WorkerEntryExitList:[],
    tabNum:'1',
    projectJid:''
  },

  effects: {
    *fetchSubmitProjectlist({ payload }, { call, put }) {
      const response = yield call(fetchSubmitProjectlist, payload);
      console.log(response);
      if (response.state == 1) {
        yield put({
          type: 'submitList',
          payload: response.data,
        });
      }
    },
    //保存用户提交的项目信息
    *fetchSubmitProject({ payload }, { call, put }) {
      const response = yield call(fetchSubmitProject, payload);
      console.log(response);
      if (response.state == 1) {
        yield put({
          type: 'submitProject',
          payload: response.data,
        });
        message.success('提交成功！');
        router.push(`/item`);
      } else {
        message.error(response.message);
      }
    },
    // 更新项目数据
    *fetchUpdateProject({ payload }, { call, put }) {
      const response = yield call(fetchUpdateProject, payload);
      console.log(response);
      if (response.state == 1) {
        yield put({
          type: 'updateProject',
          payload: response.data,
        });
      }
    },
    // 项目详情
    *fetchSubmitProjectDetails({ payload, callback }, { call, put }) {
      const response = yield call(fetchSubmitProjectDetails, payload);
      console.log(response);
      if (response.state == 1) {
        yield put({
          type: 'saveProjectDetail',
          payload: response.data,
        });
        yield put({
          type: 'saveCurrentProjectJid',
          payload: payload.projectJid,
        });
      }
    },
    //添加参建单位
    *fetchAddProjectCorp({ payload,callback}, { call, put }) {
      const response = yield call(fetchAddProjectCorp, payload);
      callback(response)
    },
    //获取参建单位列表
    *fetchCorpList({payload},{call,put}){
        const response = yield call(fetchCorpList, payload);
        console.log(response);
        if (response.state == 1) {
          yield put({
            type: 'saveCorpList',
            payload: response.data,
          });
        }else{
          message.error(response.message)
        }
    },
    //添加工人工资
    *fetchAddPayRoll({ payload }, { call, put }) {
      const response = yield call(fetchAddPayRoll, payload);
      if (response.state == 1) {
        message.success('添加成功！');
        router.push(`/item/ItemDetails?projectJid=${payload.projectJid}&projectCode=${payload.projectCode}`);
      }else{
        message.error(response.message)
      }
    },
    //获取班组列表
    *fetchTeamList({payload},{call,put}){
    const response = yield call(fetchTeamList, payload);
    console.log(response);
    if (response.state == 1) {
      yield put({
        type: 'saveTeamList',
        payload: response.data,
      });
    }else{
      message.error(response.message)
    }
    },
    //添加班组
    *fetchAddProjectTeam({ payload,callback}, { call, put }) {
      const response = yield call(fetchAddProjectTeam, payload);
      if (response.state == 1) {
        callback(response);       
        //router.push(`/item/ItemDetails?projectJid=${payload.projectJid}&projectCode=${payload.projectCode}`);
      }else{
        message.error(response.message)
      }
    },
    //上传项目人员
    *fetchAddProjectEmployee({payload,callback},{call,put}){
      const response = yield call(fetchAddProjectEmployee, payload);
      console.log(response)
      if (response.state == 1) {
        callback(response);
        history.go(-1);
      }else{
        message.error(response.message)
      }
    },
    //列表 人员考勤
    *fetchWorkerAttendanceList({payload},{call,put}){
      const response = yield call(fetchWorkerAttendanceList, payload);
      console.log(response);
      if (response.state == 1) {
        yield put({
          type: 'saveAttendanceList',
          payload: response.data,
        });
      }else{
        message.error(response.message)
      }
    },
    //上传 人员考勤
    *fetchAddWorkerAttendance({payload},{call,put}){
      const response = yield call(fetchAddWorkerAttendance, payload);
      console.log(response);
      if (response.state == 1) {
        message.success('添加成功！');
        router.push(`/item/ItemDetails?projectJid=${payload.projectJid}&projectCode=${payload.projectCode}`);
      }else{
        message.error(response.message)
      }
    },
    //项目培训列表
    *fetchTrainingList({payload},{call,put}){
      const response = yield call(fetchTrainingList, payload);
      console.log(response);
      if (response.state == 1) {
        yield put({
          type: 'saveTrainingList',
          payload: response.data,
        });
      }else{
        message.error(response.message)
      }
    },
    //项目人员列表
    *fetchProjectEmployeeList({payload},{call,put}){
      const response = yield call(fetchProjectEmployeeList, payload);
      if (response.state == 1) {
        yield put({
          type: 'ProjectEmployeeList',
          payload:response.data,
        });
      }else{
        message.error(response.message)
      }
    },
    *fetchAddTraining({payload},{call,put}){
      const response = yield call(fetchAddTraining, payload);
      if (response.state == 1) {
        message.success('添加成功！');
      }else{
        message.error(response.message)
      }
    },
    //查询人员合同列表
    *fetchWorkerContractList({payload},{call,put}){
      const response = yield call(fetchWorkerContractList, payload);
      console.log(response);
      if (response.state == 1) {
          yield put({
            type: 'ContractList',
            payload: response.data,
          });
      }else{
          message.error(response.message)
      }
    },
    //上传项目工人进退场
    *fetchAddWorkerEntryExit({ payload,callback},{ call, put }){
      const response = yield call ( fetchAddWorkerEntryExit, payload);
      console.log(response.data)
      if (response.state == 1) {
        message.success('添加成功!');
        callback(response);
      }else{
        message.error(response.message)
      }
    },
    
    //查询项目工人进退场
    *fetchWorkerEntryExitList({ payload},{ call, put }){
      const response = yield call ( fetchWorkerEntryExitList, payload);
      console.log(response);
      if (response.state == 1) {
          yield put({
            type: 'WorkerEntryExitList',
            payload: response.data,
          });
      }else{
          message.error(response.message)
      }
    },
  },

  reducers: {
    submitList(state, { payload }) {
      return {
        ...state,
        submitList: payload,
      };
    },
    submitProject(state, { payload }) {
      return {
        ...state,
        submitProject: payload.result,
      };
    },
    updateProject(state, { payload }) {
      return {
        ...state,
        updateProject: payload,
      };
    },
    saveProjectDetail(state, { payload }) {
      return {
        ...state,
        projectDetail: payload,
      };
    },
    saveCorpList(state, {payload}) {
      return {
        ...state,
        corpList: payload,
      };
    },
    saveCurrentProjectJid(state, {payload}) {
      return {
        ...state,
        projectJid:payload,
      };
    },
    saveTeamList(state, {payload}) {
      return {
        ...state,
        teamMasterList: payload,
      };
    },
    saveAttendanceList(state, {payload}) {
      return {
        ...state,
        attendanceList: payload,
      };
    },
    saveTrainingList(state, {payload}) {
      return {
        ...state,
        projectTrainingList: payload,
      };
    },
    ProjectEmployeeList(state, {payload}) {
      return {
        ...state,
        projectEmployeeList: payload,
      };
    },
    ContractList(state, {payload}) {
      return {
        ...state,
        ContractList: payload,
      };
    },
    WorkerEntryExitList(state, {payload}) {
      return {
        ...state,
        WorkerEntryExitList: payload,
      };
    },
  },
};
