import request from '@/utils/request';

export async function fakeAccountLogin(params) {
  return request('/worker/manage/home/login', {
    method: 'POST',
    body: params,
  });
}
export async function fakeLogout() {
  return request('/worker/manage/home/logout', {
    method: 'POST',
  });
}
