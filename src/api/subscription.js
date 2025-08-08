import request from '@/utils/request';

// 获取所有会员计划信息
export function getAllMembershipPlans() {
  return request({
    url: '/membership/plans',
    method: 'get'
  });
}

// 创建用户订单
export function createOrder(data) {
  return request({
    url: '/orders/create_order',
    method: 'post',
    data
  });
}

// 从订单号获取订单详情
export function getOrderDetail(data) {
  return request({
    url: `/user/orders/order_details_from_order_no/${data}`,
    method: 'get',
    data
  });
}

// 获取登录用户所有订单列表
export function getAllOrders() {
  return request({
    url: `/user/orders`,
    method: 'get'
  });
}

// 获取所有支付渠道列表
export function getAllPaymentChannels() {
  return request({
    url: '/payment_channels',
    method: 'get'
  });
}

// 获取单个用户订单信息
export function getUserOrderInfo(orderNo) {
  return request({
    url: `/user/orders/single/${orderNo}`,
    method: 'get'
  });
}

// 当前登录⽤户⽣效的会员计划 API
export function getCurrentMembershipPlan() {
  return request({
    url: '/user/memberships/status/current',
    method: 'get'
  });
}

// 获取用户会员计划最终到期日期
export function getUserMembershipPlanEndDate() {
  return request({
    url: '/user/memberships/status/end_date',
    method: 'get'
  });
}

// 获取用户所有会员计划信息
export function getAllUserMembershipPlans() {
  return request({
    url: '/user/memberships',
    method: 'get'
  });
}

// 预览订单信息
export function previewOrder(data) {
  return request({
    url: '/orders/create_order/preview',
    method: 'post',
    data
  });
}

