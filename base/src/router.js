import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/view/Home/index.vue'
import PersonalCenter from '@/view/PersonalCenter/index.vue'
// import Myorder from '@/view/GroupMall/Myorder.vue'
import CategorizedGoods from '@/view/GroupMall/CategorizedGoods.vue'
import CommodityDetails from '@/view/GroupMall/CommodityDetails.vue'
import Spike from '@/view/GroupMall/Spike.vue'
import AdvanceSale from '@/view/GroupMall/AdvanceSale.vue'
import Discount from '@/view/GroupMall/Discount.vue'
import AllEvaluate from '@/view/AllEvaluate/index'
import Orderdetails from '@/view/GroupMall/Orderdetails.vue'
import PaySucceed from '@/view/GroupMall/PaySucceed.vue'
import Evaluation from '@/view/GroupMall/evaluation.vue'
import Search from '@/view/GroupMall/search.vue'
import Refund from '@/view/GroupMall/refund.vue'

Vue.use(Router);

const routes = [{
    name: 'MicroShop',
    component: () => import('./view/MicroShop/MicroShop'),
    meta: {
      title: '掌上超市'
    }
  }, {
    name: 'user',
    component: () => import('./view/user'),
    meta: {
      title: '会员中心'
    }
  }, {
    name: 'cart',
    component: () => import('./view/cart'),
    meta: {
      title: '购物车'
    }
  }, {
    name: 'coupon',
    component: () => import('./view/coupon'),
    meta: {
      title: '优惠券'
    }
  },
  // {
  //   name: 'ShowBlogs',
  //   component: () => import('./view/MicroShop/ShowBlogs'),
  //   meta: {
  //     title: '博客列表'
  //   }
  // }, {
  //   name: 'AddBlog',
  //   component: () => import('./view/MicroShop/AddBlog'),
  //   meta: {
  //     title: '添加博客'
  //   }
  // }, {
  //   name: 'blog/:id',
  //   component: () => import('./view/MicroShop/SingleBlog'),
  //   meta: {
  //     title: '博客详情'
  //   }
  // }, 
  {
    name: 'ShopDetail',
    component: () => import('./view/MicroShop/ShopDetail'),
    meta: {
      title: '店铺详情'
    }
  }, {
    name: 'AddressEdit',
    component: () => import('./view/MicroShop/AddressEdit'),
    meta: {
      title: '新增收货地址'
    }
  }, {
    name: 'adEdit',
    component: () => import('./view/MicroShop/adEdit'),
    meta: {
      title: '修改收货地址'
    }
  }, {
    name: 'AddressList',
    component: () => import('./view/MicroShop/AddressList'),
    meta: {
      title: '选择收货地址'
    }
  }, {
    name: 'Delivery',
    component: () => import('./view/MicroShop/Delivery'),
    meta: {
      title: '配送'
    }
  }, {
    name: 'SuccessPay',
    component: () => import('./view/MicroShop/SuccessPay'),
    meta: {
      title: '付款成功'
    }
  }, {
    name: 'OrderDetail',
    component: () => import('./view/MicroShop/OrderDetail'),
    meta: {
      title: '订单详情'
    }
  }, {
    name: 'MyOrder',
    component: () => import('./view/MicroShop/MyOrder'),
    meta: {
      title: '我的订单'
    }
  }, {
    name: 'amoyindex',
    component: () => import('./view/amoy/amoyindex'),
    meta: {
      title: '网购领券'
    }
  }, {
    name: 'Applicationagent',
    component: () => import('./view/amoy/Applicationagent'),
    meta: {
      title: '申请代理'
    }
  }, {
    name: 'amoysearch',
    component: () => import('./view/amoy/amoysearch'),
    meta: {
      title: '搜索'
    }
  }, {
    name: 'Coupondetails',
    component: () => import('./view/amoy/Coupondetails'),
    meta: {
      title: '优惠券详情'
    }
  }, {
    name: 'ApplicationAdmission',
    component: () => import('./view/ApplicationAdmission/ApplicationAdmission'),
    meta: {
      title: '拼团申请入驻'
    }
  }, {
    name: 'ApplicationAdmissionwd',
    component: () => import('./view/ApplicationAdmission/ApplicationAdmissionwd'),
    meta: {
      title: '微店申请入驻'
    }
  }, {
    name: 'Assemble',
    component: () => import('./view/Settled/Assemble'),
    meta: {
      title: '拼团入驻'
    }
  }, {
    name: 'MicroshopAdmission',
    component: () => import('./view/Settled/MicroshopAdmission'),
    meta: {
      title: '微店入驻'
    }
  }, {
    name: 'myteam',
    component: () => import('./view/amoy/myteam'),
    meta: {
      title: '我的团队'
    }
  }, {
    name: 'myteamsecond',
    component: () => import('./view/amoy/myteamsecond'),
    meta: {
      title: '我的团队-二级'
    }
  }, {
    name: 'myteamthird',
    component: () => import('./view/amoy/myteamthird'),
    meta: {
      title: '我的团队-三级'
    }
  }, {
    name: 'environmental',
    component: () => import('./view/environmental/environmental'),
    meta: {
      title: '垃圾分类'
    }
  }, {
    name: 'newslists',
    component: () => import('./view/environmental/newslists'),
    meta: {
      title: '新闻动态'
    }
  }, {
    name: 'newsdetail',
    component: () => import('./view/environmental/newsdetail'),
    meta: {
      title: '新闻详情'
    }
  }, {
    name: 'nearbypoint',
    component: () => import('./view/environmental/nearbypoint'),
    meta: {
      title: '附近的兑换点'
    }
  }, {
    name: 'areasroute',
    component: () => import('./view/environmental/areasroute'),
    meta: {
      title: '导航'
    }
  }, {
    name: 'guide',
    component: () => import('./view/environmental/guide'),
    meta: {
      title: '指南'
    }
  }, {
    name: 'GroupMall',
    component: () => import('./view/GroupMall/index.vue'),
    meta: {
      title: '拼团商城'
    }
  }, {
    name: 'fillOrder',
    component: () => import('./view/GroupMall/fillOrder.vue'),
    meta: {
      title: '填写订单'
    }
  }, {
    name: 'FruitBlending',
    component: () => import('./view/GroupMall/FruitBlending.vue'),
    meta: {
      title: '水果拼团'
    }
  }, {
    name: 'JoinCompetition',
    component: () => import('./view/GroupMall/JoinCompetition.vue'),
    meta: {
      title: '参与拼团'
    }
  }, {
    name: 'addsku',
    component: () => import('./view/publish/addsku.vue'),
    meta: {
      title: '添加规格'
    }
  }, {
    name: 'publish',
    component: () => import('./view/publish/publish.vue'),
    meta: {
      title: '拼团商品发布'
    }
  }, {
    name: 'appraise',
    component: () => import('./view/appraise/appraise.vue'),
    meta: {
      title: '发表评价'
    }
  }, {
    name: 'BackStagemanagement',
    component: () => import('./view/BackStagemanagement/index.vue'),
    meta: {
      title: '微店后台管理'
    }
  }, {
    name: 'setup',
    component: () => import('./view/BackStagemanagement/setup.vue'),
    meta: {
      title: '微店设置'
    }
  }, {
    name: 'ClassifiedManagement',
    component: () => import('./view/BackStagemanagement/ClassifiedManagement.vue'),
    meta: {
      title: '分类管理'
    }
  }, {
    name: 'Administration',
    component: () => import('./view/BackStagemanagement/Administration.vue'),
    meta: {
      title: '管理分类'
    }
  }, {
    name: 'CommodityManagement',
    component: () => import('./view/BackStagemanagement/CommodityManagement.vue'),
    meta: {
      title: '商品管理'
    }
  }, {
    name: 'goodspublish',
    component: () => import('./view/BackStagemanagement/goodspublish.vue'),
    meta: {
      title: '添加商品'
    }
  }, {
    name: 'BatchManagement',
    component: () => import('./view/BackStagemanagement/BatchManagement.vue'),
    meta: {
      title: '批量管理'
    }
  }, {
    name: 'IncomeAssets',
    component: () => import('./view/BackStagemanagement/IncomeAssets.vue'),
    meta: {
      title: '收入资产'
    }
  }, {
    name: 'OrderManagement',
    component: () => import('./view/BackStagemanagement/OrderManagement.vue'),
    meta: {
      title: '订单管理'
    }
  }, {
    name: 'goodsList',
    component: () => import('./view/BackStagemanagement/goodsList.vue'),
    meta: {
      title: '商品列表'
    }
  }, {
    name: 'myShopDetail',
    component: () => import('./view/BackStagemanagement/myShopDetail.vue'),
    meta: {
      title: '微店商家端'
    }
  }, {
    name: 'bankCard',
    component: () => import('./view/BackStagemanagement/bankCard.vue'),
    meta: {
      title: '添加银行卡'
    }
  }, {
    name: 'AssembleManagement',
    component: () => import('./view/AssembleManagement/index.vue'),
    meta: {
      title: '拼团商家端'
    }
  }, {
    name: 'AssembleBankCard',
    component: () => import('./view/AssembleManagement/bankCard.vue'),
    meta: {
      title: '添加银行卡'
    }
  }, {
    name: 'AssembleCommodityManagement',
    component: () => import('./view/AssembleManagement/CommodityManagement.vue'),
    meta: {
      title: '商品管理'
    }
  }, {
    name: 'AssembleBatchManagement',
    component: () => import('./view/AssembleManagement/BatchManagement.vue'),
    meta: {
      title: '批量管理'
    }
  }, {
    name: 'AssembleIncomeAssets',
    component: () => import('./view/AssembleManagement/IncomeAssets.vue'),
    meta: {
      title: '资产管理'
    }
  }, {
    name: 'AssembleOrderManagement',
    component: () => import('./view/AssembleManagement/OrderManagement.vue'),
    meta: {
      title: '订单管理'
    }
  }, {
    name: 'earnPoints',
    component: () => import('./view/user/earnPoints.vue'),
    meta: {
      title: '玩赚积分'
    }
  }, {
    name: 'proGuide',
    component: () => import('./view/user/proGuide.vue'),
    meta: {
      title: '推广指南'
    }
  }, {
    name: 'userCourse',
    component: () => import('./view/user/userCourse.vue'),
    meta: {
      title: '新手指南'
    }
  }, {
    name: 'publicToilets',
    component: () => import('./view/environmental/publicToilets.vue'),
    meta: {
      title: '附近公厕'
    }
  }, {
    name: 'presentation',
    component: () => import('./view/user/presentation.vue'),
    meta: {
      title: '提现说明'
    }
  }, {
    path: '/allevaluate',
    name: 'AllEvaluate',
    component: AllEvaluate
  }, {
    path: '/home',
    name: 'Home',
    component: Home
  }, {
    path: '/personalcenter',
    name: 'PersonalCenter',
    component: PersonalCenter
  }, {
    path: '/categorizedgoods',
    name: 'CategorizedGoods',
    component: CategorizedGoods
  }, {
    path: '/commoditydetails/:id',
    name: 'CommodityDetails',
    component: CommodityDetails
  }, {
    path: '/spike',
    name: 'Spike',
    component: Spike
  }, {
    path: '/advancesale',
    name: 'AdvanceSale',
    component: AdvanceSale
  }, {
    path: '/discount',
    name: 'Discount',
    component: Discount
  }, {
    path: '/orderdetails',
    name: 'Orderdetails',
    component: Orderdetails
  }, {
    path: '/paysucceed',
    name: 'PaySucceed',
    component: PaySucceed
  }, {
    path: '/evaluation',
    name: 'evaluation',
    component: Evaluation
  }, {
    path: '/search',
    name: 'Search',
    component: Search
  }, {
    path: '/refund',
    name: 'Refund',
    component: Refund
  }, {
    path: '*',
    redirect: '/environmental'
  }
];


// add route path
routes.forEach(route => {
  route.path = route.path || '/' + (route.name || '');
});

const router = new Router({
  routes,
  mode: "hash" //history   hash
});

var hrefArray = [];
router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0);
  hrefArray.push(to.fullPath)
  hrefArray.push(from.fullPath)
  sessionStorage.setItem("hrefArray", hrefArray);
  const title = to.meta && to.meta.title;
  if (title) {
    document.title = title;
  }
  next();
});

export {
  router
};