import { fetchCompanyUploadlist,fetchAddCompany,fetchCompanyDetail } from '@/services/companyUpload';
import { message } from 'antd';
import router from 'umi/router';

export default {
  namespace: 'companyUpload',

  state: {
    companyUploadList:[],
  },

  effects: {
    //获取企业上传的列表
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
    //添加企业
    *fetchAddCompany({ payload },{ call, put }){
      const response = yield call ( fetchAddCompany, payload);
      if (response.state==1) {
        message.success("添加成功!");
        history.go(-1);
      }else{
        message.error(response.message);
      }
    },
    //获取企业详情
    *fetchCompanyDetail({ payload },{ call, put }){
      const response = yield call ( fetchCompanyDetail, payload);
      if (response.state==1) {
        yield put({
          type:'saveCompanyUploadDetail',
          payload:response.data
        })
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
      saveCompanyUploadDetail(state,{ payload }){
        return{
          ...state,
          companyUploadDetail:payload
        }
      },
  }
};
