import request from "@/utils/request";

// 获取用户所有会员计划信息
export function getAllMembershipPlans() {
  return request({
    url: "/membership/plans",
    method: "get",
  });
}

// 创建用户订单
export function createOrder(data) {
  return request({
    url: "/orders/create_order",
    method: "post",
    data,
  });
}

//从订单号获取订单详情
export function getOrderDetail(data) {
  return request({
    url: `/user/orders/order_details_from_order_no/${data}`,
    method: "get",
    data,
  });
}

// 获取登录用户所有订单列表
export function getAllOrders() {
  return request({
    url: `user/orders`,
    method: "get",
  });
}

// 获取所有支付渠道列表
export function getAllPaymentChannels() {
  return request({
    url: "/payment_channels",
    method: "get",
  });
}
