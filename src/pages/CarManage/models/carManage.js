import {
    fechAddCarInfo,
    fechUpdateCarInfo,
    fetchDelCarInfo,
    fetchCarInfoList,
    fetchCarUser,
    fechAddRepairInfo,
    fetchLookRepairInfo
} from '@/services/user';
import {message} from 'antd';


export default {
namespace: 'carManage',

state: {
    carInfoList:{},
    carUser:[],
    repairInfo:{}
},

effects: {
    *fechAddCarInfo({payload,callback},{call,put}){
        const response = yield call(fechAddCarInfo,payload);
        callback(response)
    },
    *fetchDelCarInfo({payload,callback},{call,put}){
        const response = yield call(fetchDelCarInfo,payload);
        callback(response)
    },
    // *fechUpdateCarInfo({payload,callback},{call,put}){
    //     const response = yield call(fechUpdateCarInfo,payload);
    //     callback(response)
    // }
    *fetchCarInfoList({payload},{call,put}){
        const response = yield call(fetchCarInfoList,payload);
        yield put ({
            type:'saveCarInfoList',
            payload:response.data
        })
    },
    *fetchCarUser({payload},{call,put}){
        const response = yield call(fetchCarUser,payload);
        // console.log(response.data)
        yield put({
          type:'saveBrokeUser',
          payload:response.data,
        })
      },
      *fechAddRepairInfo({payload,callback},{call,put}){
          const response = yield call(fechAddRepairInfo,payload)
          callback(response)
      },
      *fetchLookRepairInfo({payload},{call,put}){
          const response = yield call(fetchLookRepairInfo,payload)
          yield put({
              type:'saveRepairInfo',
              payload:response.data
          })
      }
},

reducers: {
    saveCarInfoList(state,{payload}){
        return {
            ...state,
            carInfoList:payload
        }
    },
    saveBrokeUser(state,{payload}){
        return {
          ...state,
          carUser:payload
        }
    },
    saveRepairInfo(state,{payload}){
        return {
            ...state,
            repairInfo:payload
        }
    }
},
};
