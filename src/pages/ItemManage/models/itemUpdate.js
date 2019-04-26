import { fetchUpdateProjectTeam} from '@/services/item';
import { fetchCompanyUploadlist} from '@/services/companyUpload';
import { message } from 'antd';

export default {
  namespace: 'itemUpdate',

  state: {
    teamInfo:{},//获取班组信息
    companyUploadList:[],//获取企业列表
  },

  effects: {
    //更新班组信息
    *fetchUpdateProjectTeam({payload,callback},{call,put}){
      const response = yield call(fetchUpdateProjectTeam, payload);
      if (response.state == 1) {
        message.success('修改成功！');
        callback(response)
      }
    },
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
  },
  reducers: {
    saveCompanyUploadList(state,{ payload }){
      return{
        ...state,
        companyUploadList:payload
      }
    },
  }
}
