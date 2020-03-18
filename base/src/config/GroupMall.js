import request from './index'

export default {
  getGroupMallBanner() { //轮播
    return request.get('/banner?type=1')
  },
  getCategory() { //导航分类
    return request.get('/group/goods/category')
  },
  getGroupMallMessage() { //公告
    return request.get('/group/message')
  },
  getGroupMallysGoods() { //预售：type=1 秒杀：type=2 预售  type=3 折扣：type=5 热销爆款：type=4 水果
    return request.get('/group/goods?type=2')
  },
  getGroupMallbkGoods() { //预售：type=2 热销爆款：type=5
    return request.get('/group/goods?type=5')
  },
  getGroupMallmsGoods() { //预售：type=2 热销爆款：type=5
    return request.get('/group/goods?type=1')
  },
  getGroupMallzkGoods() { //预售：type=2 热销爆款：type=5
    return request.get('/group/goods?type=3')
  },
  getGroupMallsgGoods() { //预售：type=2 热销爆款：type=5
    return request.get('/group/goods?type=4')
  },
  getGoodsDetail(data) { //商品详情
    return request.post('/group/goods/detail', data)
  },
  GoodSearch(data) { //搜索
    return request.post('/group/goods', data)
  },
  getGoodSearch(data) {
    return request.post('/keyword', data)
  },
  addressAdd(data) { //新增地址
    return request.post('/address/add', data)
  },
  addressList(data) { //地址列表
    return request.post('/address', data)
  },
  addressDelete(data) { //删除地址
    return request.post('/address/delete', data)
  },
  addressInfo(data) { //地址详情
    return request.post('/address/info', data)
  },
  addressSave(data) { //修改地址
    return request.post('/address/save', data)
  },
  // addressDef(data) { //设置默认地址 
  //   return request.post('/address/set_def', data)
  // },
  checkout(data) { //下单
    return request.post('/group/order/checkout', data)
  },
  pay(data) { //支付
    return request.post('/group/order/pay', data)
  },
  addressMemberInfo(data) { //查询默认地址
    return request.post('/group/member/info', data)
  },
  catGroupGoods(data) { //不同分类id 的商品列表
    return request.post('/group/goods', data)
  },
  groupOrder(data) { //拼团商城订单  status 1有效 2失效我之前做的status是未处理0 已发货1 已完成2这么来的  订单状态 0未处理 1已发货 2已收货 3已完成 4取消
    //团购状态 0进行中 1结束 2失败
    return request.post('/group/order', data)
  },
  commentPublish(data) { //发表评价
    return request.post('/group/comment/publish', data)
  },
  groupOrderDetail(data) { //商品订单详情
    return request.post('/group/order/detail', data)
  },
  groupOrderExchange(data) { //申请退换
    return request.post('/group/order/exchange', data)
  },
  getQrcode(data) { //获取商品二维码
    return request.post('/group/goods/qrcode', data)
  },
  groupOrderFinishe(data) { //确认收货
    return request.post('/group/order/finish', data)
  },
  groupOrderDelivery(data) { //确认发货
    return request.post('/group/order/delivery', data)
  },
  groupOrderCancel(data) { //取消订单  入参id和user_id
    return request.post('/group/order/cancel', data)
  },
  getUserInfo(data) { //查询用户信息point可兑换积分
    // total_point总积分
    // buy_point自购积分
    // buy_frozen_point自购预计积分
    // agent_point团队积分
    // agent_frozen_point团队预计积分
    return request.post('/member/info', data)
  },
  // applyAssemble(data) { //拼团申请user_id, company_name, biz_license(多个media_id逗号拼接), contact, phone, wechat, personal_license(多个逗号接)
  //   return request.post('/group/member/apply', data)
  // },
  getUserAgent(data) { //查询用户邀请人信息 order_type 1 按时间排序2 按注册数排序3 按订单数排序4 按订单金额排序
    return request.post('/member/tree', data)
  },
  agentApply(data) { //申请代理type:2代理 phone, fullname,wechat
    return request.post('/member/apply', data)
  },
  teamOrderDetail(data) { //团购详情入参id，就是发起拼团订单的id
    return request.post('/group/order/detail', data)
  },
  getSms(data) { //获取验证码
    return request.post('/api/sms', data)
  },
  getHomeGroup(data) { //获取积分
    return request.post('/home/group', data)
  },
  getHomeStore(data) { //获取积分
    return request.post('/home/store', data)
  },
}