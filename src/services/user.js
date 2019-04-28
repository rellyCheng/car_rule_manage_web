import request from '@/utils/request';

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