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
// 获取用户单个生成请求详情
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
export function preprocessSegment(file) {
  const formData = new FormData();
  formData.append("segment_image", file);
  return request({
    url: "/preprocess/segment",
    method: "post",
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
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
// 删除用户生成的单张图片
export function deleteGeneratedImage(id) {
  return request({
    url: `/genegerated_image/${id}`,
    method: "DELETE",
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
// 获取用户收藏的生成图片列表
export function getUserFavoriteImages() {
  return request({
    url: "/user_favorites",
    method: "get",
  });
}
// 收藏生成图片
export function favoriteGeneratedImage(generatedImageId) {
  return request({
    url: "/user_favorites",
    method: "post",
    data: {
      generated_image_id: generatedImageId,
    },
  });
}
// 取消收藏生成图片
export function unfavoriteGeneratedImage(generatedImageId) {
  return request({
    url: `/user_favorites/${generatedImageId}`,
    method: "DELETE",
  });
}
