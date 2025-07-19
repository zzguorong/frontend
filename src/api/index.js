import request from "@/utils/request";

// 登录
export function login(data) {
  return request({
    url: "/login",
    method: "post",
    data,
  });
}

// 获取用户详情
export function getUserInfo(params) {
  return request({
    url: "/sc/auth/auth/user/info",
    method: "get",
    params,
  });
}

//   获取路由表接口
export function getMoveRouter() {
  return request({
    url: "/sc/auth/auth/auths",
    method: "get",
  });
}
// uv aoaoe/api/uv
export function getUv() {
  return request({
    url: "/aoaoe/api/uv",
    method: "get",
  });
}
// 省市区三级联动
export function getThreeLevelLinkage() {
  return request({
    url: "/region/queryAll",
    method: "get",
  });
}
