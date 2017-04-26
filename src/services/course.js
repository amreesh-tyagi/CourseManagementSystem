import request from '../utils/request';

export async function fetch() {
  return request('/api/course/list');
}

export async function add({ payload }) {
  const options = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(payload),
  };
  return request('/api/course/add', options);
}

export async function del({ payload }) {
  const options = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'DELETE',
    body: JSON.stringify(payload),
  };
  return request('/api/course/del', options);
}

