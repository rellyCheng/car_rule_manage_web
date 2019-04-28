import request from '@/utils/request';

export async function fetchUserInfo(params) {
    return request('/api/user/list', {
      method: 'POST',
      body: params,
    });
}

export async function fetchDelUserInfo(params) {
  return request('/api/user/del', {
    method: 'POST',
    body: params,
  });
}

export async function fetchAddUserInfo(params) {
  return request('/api/user/add', {
    method: 'POST',
    body: params,
  });
}