import request from '@/utils/request';

// 发送手机短信验证码
export function sendSmsCode(data) {
  return request({
    url: '/send_code',
    method: 'post',
    data
  });
}

// 手机号加验证码登录
export function phoneLogin(data) {
  return request({
    url: '/mobile_login',
    method: 'post',
    data
  });
}

// 登录
export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  });
}

// 登出
export function userLogout() {
  return request({
    url: '/logout',
    method: 'post'
  });
}

// 用户名密码注册
export function userRegister(data) {
  return request({
    url: '/registration',
    method: 'post',
    data
  });
}

// 重置密码
export function resetPassword(data) {
  return request({
    url: '/password_reset',
    method: 'post',
    data
  });
}

// 获取用户详情
export function getUserInfo(params) {
  return request({
    url: '/sc/auth/auth/user/info',
    method: 'get',
    params
  });
}

//   获取路由表接口
export function getMoveRouter() {
  return request({
    url: '/sc/auth/auth/auths',
    method: 'get'
  });
}
// uv aoaoe/api/uv
export function getUv() {
  return request({
    url: '/aoaoe/api/uv',
    method: 'get'
  });
}
// 省市区三级联动
export function getThreeLevelLinkage() {
  return request({
    url: '/region/queryAll',
    method: 'get'
  });
}
