import axios from 'axios';
import { MessageBox, Message } from 'element-ui';
import store from '@/store';
import { getToken } from '@/utils/auth';

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000 // request timeout
});

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    // 统一设置请求头，所有请求都接受 JSON 响应
    config.headers['Accept'] = 'application/json';

    if (store.getters.token !== undefined && getToken() !== undefined) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Authorization'] = 'Bearer ' + getToken();
    }
    return config;
  },
  error => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data;
    // 当 HTTP 状态码不在 2xx 范围时判定为错误
    if (response.status < 200 || response.status >= 300) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      });

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload();
          });
        });
      }
      return Promise.reject(new Error(res.message || 'Error'));
    } else {
      return res;
    }
  },
  error => {
    console.log('err' + error); // for debug
    let message = error.response && error.response.data && (error.response.data.message || error.response.data.error);
    if (!message) {
      message = error.message || '请求失败，请稍后再试';
    }
    Message({
      message,
      type: 'error',
      duration: 5 * 1000
    });
    if (error.response && error.response.status === 401) {
      // 401 Unauthorized 错误，可能是 token 过期或无效
      store.dispatch('user/resetToken');
    }
    return Promise.reject(error);
  }
);

export default service;
