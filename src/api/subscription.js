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
    url: `/user/orders/order_details_from_order_no`,
    method: "get",
    data,
  });
}
