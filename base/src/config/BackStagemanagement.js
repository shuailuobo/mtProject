import request from './index'

export default {
  storeSave(data) { //店铺的管理
    return request.post('/store/save', data)
  },
  getStoreInfo(data) { //获取店铺详情
    return request.post('/store/info', data)
  },
  goodsSave(data) { //添加商品 'name', 'cat_id', 'thumb', 'spec', 'price', 'store_id'
    return request.post('/goods/save', data)
  },
  categoryList(data) { //栏目列表
    return request.post('/category', data)
  },
  categorySave(data) { //添加栏目 入参：name,store_id，传id保存
    return request.post('/category/save', data)
  },
  categoryDelete(data) { //删除栏目 入参id
    return request.post('/category/delete', data)
  },
  getStoreGoods(data) { //获取商品列表
    return request.post('/goods', data)
  },
  getBankCard(data) { //获取银行卡列表 user_id
    return request.post('/bankcard', data)
  },
  bankCardSave(data) { //添加银行卡 id,name,account,account_no,is_default
    return request.post('/bankcard/save', data)
  },
  withdrawalList(data) { //提现列表 user_id
    return request.post('/withdrawal', data)
  },
  withdrawalApply(data) { //提现 user_id ,amount,bankcard_id
    return request.post('/withdrawal/apply', data)
  },
  orderList(data) { //订单列表 入参store_id
    return request.post('/order', data)
  },
  orderDelivery(data) { //商家发货 入参订单id
    return request.post('/order/delivery', data)
  },
  goodsBatch(data) { //批量修改商品 入参ID=1,2,3 status，cat_id
    return request.post('/goods/batch', data)
  },
  homeStore(data) { //微店商家端首页
    return request.post('/home/store', data)
  },
  goodsDelete(data) { //微店批量删除商品
    return request.post('/goods/delete', data)
  },
  getPlace(data) { //回收站和厕所
    return request.post('/place', data)
  },
  homeGroup(data) { //拼团商家端首页
    return request.post('/home/group', data)
  },
  groupGoods(data) { //拼团发布商品列表
    return request.post('/group/goods', data)
  },
  groupGoodsDelete(data) { //拼团商品批量删除
    return request.post('/group/goods/delete', data)
  },
}