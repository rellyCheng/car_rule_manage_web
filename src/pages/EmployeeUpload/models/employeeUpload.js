import {  } from '@/services/employeeUpload';

import { fetchProjectEmployeeList } from '@/services/item';
export default {
  namespace: 'employeeUpload',

  state: {
      employeeUploadData:{},
      projectEmployeeData:{}
  },

  effects: {
    *fetchCompanyUploadlist({ payload },{ call, put }){
        const response = yield call ( fetchCompanyUploadlist, payload);
        console.log(response)
        if (response.state==1) {
          yield put({
            type:'saveCompanyUploadList',
            payload:response.data
          })
          
        }
      },
       //项目人员列表
    *fetchProjectEmployeeList({payload},{call,put}){
      const response = yield call(fetchProjectEmployeeList, payload);
      if (response.state == 1) {
        yield put({
          type: 'ProjectEmployeeList',
          payload: response.data,
        });
      }else{
        message.error(response.message)
      }
    }
  },

  reducers: {
    saveCompanyUploadList(state,{ payload }){
        return{
          ...state,
          companyUploadList:payload
        }
    },
    ProjectEmployeeList(state, {payload}) {
      return {
        ...state,
        projectEmployeeData: payload,
      };
    },
  }
};
