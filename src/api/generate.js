import request from "@/utils/request";

// 销售/移库配货查询
export function salesOrTRansferQuery(params) {
  return request({
    url: "/sc/wms/wm/command/query",
    method: "get",
    params,
  });
}
// 生图接口
export function generateImages(data) {
  return request({
    url: "/generate",
    method: "post",
    data,
  });
}
// 生图获取图片
export function getImageDetail(params) {
  return request({
    url: "/generation_request/single/" + params,
    method: "get",
    params,
  });
}
// 获取视角类型、风格类别
export function getPerspectiveStyle(data) {
  return request({
    url: "/generation/preset",
    method: "post",
    data,
  });
}
// 自动识别
export function preprocessSegment(data) {
  return request({
    url: "/preprocess/segment",
    method: "post",
    data,
  });
}
// 详情接口
export function getProjectDetail(params) {
  return request({
    url: "/generated_image/single/" + params,
    method: "get",
    params,
  });
}
// 作为底图生成接口
export function generateBaseImage(data) {
  return request({
    url: "/base_image/generated",
    method: "post",
    data,
  });
}
// 获取画廊所有图片
export function getGalleryImages(params) {
  return request({
    url: "/generated_image",
    method: "get",
    params,
  });
}
// 获取微信登录地址
export function getWechatLoginUrl(params) {
  return request({
    url: "/auth/wechat",
    method: "get",
    params,
  });
}
// 微信登录
export function wechatLogin(data) {
  return request({
    url: "/wechat_login",
    method: "post",
    data,
  });
}
// 删除图片
export function deleteImage(type, id) {
  let url = "";
  switch (type) {
    case "base":
      url = `/base_image/${id}`;
      break;
    case "style":
      url = `/style_image/${id}`;
      break;
    case "segment":
      url = `/segment_image/${id}`;
      break;
    default:
      throw new Error("未知图片类型");
  }
  return request({
    url,
    method: "DELETE",
  });
}
