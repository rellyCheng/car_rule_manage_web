import request from '@/utils/request';

export async function fakeAccountLogin(params) {
  return request('/api/home/login', {
    method: 'POST',
    body: params,
  });
}
