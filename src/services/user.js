import request from '@/utils/request';
import { async } from 'q';
import { func } from 'prop-types';

export async function fetchUserInfo(params) {
    return request('/api/user/list', {
      method: 'POST',
      body: params,
    });
}

export async function fetchDelUserInfo(params) {
  return request(`/api/user/del?userId=${params}`, {
    method: 'POST',
  });
}

export async function fetchAddUserInfo(params) {
  return request('/api/user/add', {
    method: 'POST',
    body: params,
  });
}
export async function fetchEditUserInfo(params) {
  return request('/api/user/update', {
    method: 'POST',
    body: params,
  });
}

export async function fechAddBrokenInfo(params) {
  return request('/api/brokeInfo/add', {
    method: 'POST',
    body: params,
  });
}

export async function fetchBrokeList(params) {
  return request('/api/brokeInfo/list', {
    method: 'POST',
    body: params,
  });
}

export async function fechUpdateBrokenInfo(params) {
  return request('/api/brokeInfo/update', {
    method: 'POST',
    body: params,
  });
}

export async function fetchDelBrokeInfo(params) {
  return request(`/api/brokeInfo/del?brokeInfoId=${params.brokeInfoId}`, {
    method: 'POST',
  });
}

export async function fetchBrokeUser(params){
  return request(`/api/user/getListByName?name=${params}`,{
    method:'POST'
  })
}
export async function fetchCarUser(params){
  return request(`/api/user/getListByName?name=${params}`,{
    method:'POST'
  })
}

export async function fetchDeal(params){
  return request(`/api/brokeInfo/handle?userId=${params.userId}&brokeInfoId=${params.brokeInfoId}`,{
    method:'POST'
  })
}

export async function fechAddCarInfo(params){
  return request(`/api/car/add`,{
    method:'POST',
    body:params
  })
}

// export async function fechUpdateCarInfo(params){
//   return request(``,{
//     method:'POST'
//   })
// }

export async function fetchDelCarInfo(params){
  return request(`/api/car/del?carId=${params}`,{
    method:'POST'
  })
}

export async function fetchCarInfoList(params){
  return request(`/api/car/list`,{
    method:'POST',
    body:params
  })
}

export async function fechAddRepairInfo(params){
  return request(`/api/car/addRepairInfo`,{
    method:'POST',
    body:params
  })
}

export async function fetchLookRepairInfo(params){
  return request(`/api/car/getRepairInfoList?current=${params.current}&size=${params.size}&carId=${params.carId}`,{
    method:'POST'  
  })
}