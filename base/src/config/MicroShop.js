import request from './index'

export default {
  // getStore() { //
  //   return request.get('/banner?type=1')
  // },
  getStore(data) { //获取店铺列表
    return request.post('/store', data)
  },
  getStoreInfo(data) { //获取店铺详情
    return request.post('/store/info', data)
  },
  getStoreCategory(data) { //获取店铺分类列表
    return request.post('/category', data)
  },
  getStoreGoods(data) { //获取商品列表
    return request.post('/goods', data)
  },
  getStoreGoodsInfo(data) { //获取商品详情
    return request.post('/goods/info', data)
  },
  cartSave(data) { //加入购物车 user_id,goods_spec_id,price,quantity
    return request.post('/cart/save', data)
  },
  changeCartSave(data) { //购物车商品数量加减 goods_spec_id,quantity
    return request.post('/cart/save', data)
  },
  cartLists(data) { //购物车商品列表
    return request.post('/cart', data)
  },
  cartDelete(data) { //购物车删除某个商品 id
    return request.post('/cart/delete', data)
  },
  cartEmpty(data) { //清空购物车 user_id 
    return request.post('/cart/clean', data)
  },
  orderCheckout(data) { //结算 user_id和addr_id shipping_type  order
    return request.post('/order/checkout', data)
  },
  microShopOrder(data) { //微店订单 
    return request.post('/order', data)
  },
  microOrderPay(data) { //微店订单支付 out_trade_no
    return request.post('/order/pay', data)
  },
  microOrderInfo(data) { //微店订单详情 入参：id或者out_trade_no
    return request.post('/order/info', data)
  },
  microOrderCancel(data) { //取消订单 入参：id和user_id
    return request.post('/order/cancel', data)
  },
  microOrderConfirm(data) { //确认收货订单 入参：id和user_id
    return request.post('/order/confirm', data)
  },
  memberApply(data) { //微店申请入驻 
    return request.post('/member/apply', data)
  },
  expressInfo(data) { //微店申请入驻 data/express
    return request.post('/data/express', data)
  },
}