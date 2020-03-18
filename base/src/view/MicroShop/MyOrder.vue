<template>
  <div class="container">
    <!-- <HeaderTop :title="title"></HeaderTop> -->
    <!-- tab标签 -->
    <van-tabs
      @click="onClick"
      type="card"
      background="#FC5D65"
      color="#fff"
      title-active-color="#FC5D65"
      class="reset"
      v-model="activeIndex"
    >
      <!-- <van-tab
        class="resets"
        title="网购返利"
      >
        <div
          class="sloter"
          slot=""
        >
          <div class="header"></div>

          <div class="container"> -->
      <!--导航条-->
      <!-- <div class="navbar">
              <p
                v-for="(item, index) in navbar"
                :key="index"
                @click="navbarTapwg(index)"
                :class='["item",currentTabwg== index ? "active" : ""]'
              >{{item}}</p>
            </div> -->

      <!--有效订单-->
      <!-- <div v-if="currentTabwg === 0">
              <div class="container-body">
                <div class="">
                  <div
                    class="order-list"
                    @click="ptOrderDetailTap(item.id)"
                    v-for="(item, index) in myorderlist"
                    :key="index"
                  >
                    <div class="goods">
                      <div class="goodsdetail">
                        <div>
                          <img
                            :src="item.src"
                            alt=""
                          >
                        </div>
                        <div class="goodstitle">
                          <p>{{item.address}}</p>
                          <p>订单号：{{item.orderid}}</p>
                          <p>当前状态：<span>{{item.status}}</span></p>
                        </div>
                      </div>
                    </div>
                    <div class="goodsintros">
                      <div>
                        <p>{{item.name}}</p>
                        <span>x{{item.num}}</span>
                      </div>
                      <div>
                        <p>￥<span>{{item.price}}</span></p>
                      </div>
                    </div>
                    <div class="feedetail">
                      <div>
                        <p>付款金额</p>
                        <p>￥{{item.payprice}}</p>
                      </div>
                      <div>
                        <p>领券</p>
                        <p>￥{{item.coupon}}</p>
                      </div>
                      <div>
                        <p>预估补贴</p>
                        <p>￥{{item.subsidy}}</p>
                      </div>
                    </div>
                    <div class="addtime">
                      <p>{{item.pay_time}} 创建</p>
                    </div>
                  </div>
                </div>

              </div>
            </div> -->

      <!--失效订单-->
      <!-- <div v-if="currentTabwg === 1">
              <div class="container-body">
                <div class="">
                  <div
                    class="order-list"
                    @click="ptOrderDetailTap(item.id)"
                    v-for="(item, index) in myinvalidorderlist"
                    :key="index"
                  >
                    <div class="goods">
                      <div class="goodsdetail">
                        <div>
                          <img
                            :src="item.src"
                            alt=""
                          >
                        </div>
                        <div class="goodstitle">
                          <p>{{item.name}}</p>
                          <p>订单号：{{item.orderid}}</p>
                          <p>当前状态：<span>{{item.status}}</span></p>
                        </div>
                      </div>
                    </div>
                    <div class="goodsintros">
                      <div>
                        <p>{{item.name}}</p>
                        <span>x{{item.num}}</span>
                      </div>
                      <div>
                        <p>￥<span>{{item.price}}</span></p>
                      </div>
                    </div>
                    <div class="feedetail">
                      <div>
                        <p>付款金额</p>
                        <p>￥{{item.payprice}}</p>
                      </div>
                      <div>
                        <p>领券</p>
                        <p>￥{{item.coupon}}</p>
                      </div>
                      <div>
                        <p>预估补贴</p>
                        <p>￥{{item.subsidy}}</p>
                      </div>
                    </div>
                    <div class="addtime">
                      <p>{{item.pay_time}} 创建</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </van-tab> -->

      <van-tab title="拼团商城">
        <div class="sloter" slot="">
          <div class="header"></div>

          <div class="container">
            <!--导航条-->
            <div class="navbar">
              <p
                v-for="(item, index) in navbar"
                :key="index"
                @click="navbarTappt(index)"
                :class="['item', currentTabpt == index ? 'active' : '']"
              >
                {{ item }}
              </p>
            </div>

            <!--有效订单-->
            <div v-if="currentTabpt === 0">
              <div class="container-body">
                <section v-for="(item, index) in groupOrderLists" :key="index">
                  <div class="order-list" v-if="item.group_status != '2'">
                    <div class="goods" @click="ptOrderDetailTap(item.id)">
                      <div class="goodsdetail">
                        <div>
                          <img :src="item.goods_thumb" alt="" />
                        </div>
                        <div class="goodstitle">
                          <p>
                            {{ item.goods_name }}
                          </p>
                          <p>订单号：{{ item.out_trade_no }}</p>
                          <p>
                            当前状态：<span>{{
                              item.status == "0" && item.pay_status == "0"
                                ? "未支付"
                                : item.status == "0" && item.pay_status == "1"
                                ? "待处理"
                                : item.status == "1"
                                ? "已发货"
                                : item.status == "2"
                                ? "已收货"
                                : item.status == "3"
                                ? "已完成"
                                : "已取消"
                            }}</span>
                          </p>
                          <p v-if="item.is_alone == '0'">
                            团购状态：<span>{{
                              item.group_status == "0"
                                ? "进行中"
                                : item.group_status == "1"
                                ? "已结束"
                                : "已失败"
                            }}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <!-- <div class="goodsintros">
                      <div>
                        <p>{{item.name}}</p>
                        <span>x{{item.num}}</span>
                      </div>
                      <div>
                        <p>￥<span>{{item.price}}</span></p>
                      </div>
                    </div> -->
                    <div class="feedetail">
                      <div>
                        <p>付款金额</p>
                        <p>￥{{ item.order_price }}</p>
                      </div>
                      <!-- <div>
                        <p>领券</p>
                        <p>￥{{ item.coupon_amount }}</p>
                      </div> -->
                      <div>
                        <p>积分补贴</p>
                        <p>{{ item.profit }}</p>
                      </div>
                    </div>
                    <div class="addtime">
                      <p>
                        {{ item.create_time }}
                        <!-- {{
                          new Date(
                            Number(item.create_time * 1000)
                          ).toLocaleString()
                        }} -->
                        创建
                      </p>
                    </div>
                    <div class="orderBtn">
                      <van-button
                        size="small"
                        type="default"
                        @click="Pay(item.out_trade_no, item.point)"
                        v-if="item.status == '0' && item.pay_status == '0'"
                        >立即支付</van-button
                      >
                      <van-button
                        size="small"
                        type="default"
                        @click="cancelOrder(item.id)"
                        v-if="item.status == '0' && item.pay_status == '0'"
                        >取消订单</van-button
                      >
                      <van-button
                        size="small"
                        type="default"
                        @click="viewLogisticsTap(item.shipping_no)"
                        v-if="item.status == '1'"
                        >查看物流</van-button
                      >
                      <van-button
                        size="small"
                        type="default"
                        @click="confirmTap(item.id)"
                        v-if="item.status == '1'"
                        >确认收货</van-button
                      >
                      <van-button
                        size="small"
                        type="default"
                        @click="evaluateTap(item.id)"
                        v-if="
                          (item.status == '2' || item.status == '3') &&
                            item.is_comment == '0'
                        "
                        >发表评价</van-button
                      >

                      <van-button
                        size="small"
                        type="default"
                        disabled
                        v-if="item.is_comment == '1'"
                        >已评价</van-button
                      >

                      <!-- <van-button
                        size="small"
                        type="default"
                        @click="deleteOrder(item.id)"
                        v-if="item.status == '3' || item.status == '4'"
                        >删除订单</van-button
                      > -->
                    </div>
                  </div>
                </section>
              </div>
            </div>

            <!--失效订单-->
            <div v-if="currentTabpt === 1">
              <div class="container-body">
                <!-- <div class=""> -->
                <section v-for="(item, index) in groupOrderLists" :key="index">
                  <div
                    class="order-list"
                    v-if="item.group_status == '2' && item.is_alone == '0'"
                  >
                    <!-- is_alone 单独1  团购0 -->
                    <div class="goods" @click="ptOrderDetailTap(item.id)">
                      <div class="goodsdetail">
                        <div>
                          <img :src="item.goods_thumb" alt="" />
                        </div>
                        <div class="goodstitle">
                          <p>
                            {{ item.goods_name }}
                          </p>
                          <p>订单号：{{ item.id }}</p>
                          <p>
                            当前状态：<span>{{
                              item.status == "0" && item.pay_status == "0"
                                ? "未支付"
                                : item.status == "0" && item.pay_status == "1"
                                ? "待处理"
                                : item.status == "1"
                                ? "已发货"
                                : item.status == "2"
                                ? "已收货"
                                : item.status == "3"
                                ? "已完成"
                                : "已取消"
                            }}</span>
                          </p>
                          <p v-if="item.is_alone == '0'">
                            团购状态：<span>{{
                              item.group_status == "0"
                                ? "进行中"
                                : item.group_status == "1"
                                ? "已结束"
                                : "已失败"
                            }}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <!-- <div class="goodsintros">
                      <div>
                        <p>{{item.name}}</p>
                        <span>x{{item.num}}</span>
                      </div>
                      <div>
                        <p>￥<span>{{item.price}}</span></p>
                      </div>
                    </div> -->
                    <div class="feedetail">
                      <div>
                        <p>付款金额</p>
                        <p>￥{{ item.money }}</p>
                      </div>
                      <!-- <div>
                        <p>领券</p>
                        <p>￥{{ item.coupon_amount }}</p>
                      </div> -->
                      <div>
                        <p>积分补贴</p>
                        <p>{{ item.profit }}</p>
                      </div>
                    </div>
                    <div class="addtime">
                      <p>{{ item.create_time }} 创建</p>
                    </div>
                    <!-- <div class="orderBtn">
                      <van-button
                        size="small"
                        type="default"
                        @click="evaluateTap(item.id)"
                        >发表评价</van-button
                      >
                      <van-button
                        size="small"
                        type="default"
                        @click="confirmTap(item.id)"
                        >确认收货</van-button
                      >
                    </div> -->
                  </div>
                </section>

                <!-- </div> -->
              </div>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="微店">
        <div class="sloter" slot="">
          <div class="header"></div>

          <div class="container">
            <!--导航条-->
            <!-- <div class="navbar">
              <p
                v-for="(item, index) in navbar"
                :key="index"
                @click="navbarTapwd(index)"
                :class="['item', currentTabwd == index ? 'active' : '']"
              >
                {{ item }}
              </p>
            </div> -->

            <!--有效订单-->
            <!-- <div v-if="currentTabwd === 0"> @click="ptOrderDetailTap(item.id)" -->
            <div class="container-body">
              <div class="">
                <div
                  class="order-list"
                  v-for="(item, index) in myorderlist"
                  :key="index"
                >
                  <div class="goods">
                    <div class="goodsdetail" @click="wdOrderDetailTap(item.id)">
                      <div>
                        <img :src="item.store_icon" alt="" />
                      </div>
                      <div class="goodstitle">
                        <p>{{ item.store_name }}</p>
                        <p>订单号：{{ item.out_trade_no }}</p>
                        <p>
                          <!-- 0未处理 1已发货 2已完成 3已取消 -->
                          当前状态：
                          <!-- <span>{{
                            item.status == 0
                              ? "未处理"
                              : item.status == 1
                              ? "已发货"
                              : item.status == 2
                              ? "已完成"
                              : "已取消"
                          }}</span> -->

                          <span>{{
                            item.status == "0" && item.pay_status == "0"
                              ? "未支付"
                              : item.status == "0" && item.pay_status == "1"
                              ? "待处理"
                              : item.status == "1"
                              ? "已发货"
                              : item.status == "2"
                              ? "已收货"
                              : item.status == "3"
                              ? "已完成"
                              : "已取消"
                          }}</span>
                        </p>
                        <p>
                          配送方式：{{
                            item.shipping_type == "1" ? "外卖配送" : "到店自取"
                          }}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="goodsintros">
                    <div>
                      <p>{{ item.goods_name }}</p>
                      <span>x{{ item.total_quantity }}</span>
                    </div>
                    <div>
                      <p>
                        ￥<span>{{ item.total_price }}</span>
                      </p>
                    </div>
                  </div>
                  <div class="feedetail">
                    <div>
                      <p>付款金额</p>
                      <p>￥{{ item.order_price }}</p>
                    </div>
                    <!-- <div>
                      <p>领券</p>
                      <p>￥{{ item.coupon_id }}</p>
                    </div> -->
                    <div>
                      <p>积分补贴</p>
                      <p>{{ item.total_profit }}</p>
                    </div>
                  </div>
                  <div class="addtime">
                    <p>{{ item.create_time }} 创建</p>
                  </div>
                  <div class="orderBtn">
                    <van-button
                      size="small"
                      type="default"
                      @click="wdPay(item.out_trade_no, item.point)"
                      v-if="item.status == '0' && item.pay_status == '0'"
                      >立即支付</van-button
                    >
                    <van-button
                      size="small"
                      type="default"
                      @click="wdCancelOrder(item.id)"
                      v-if="item.status == '0'"
                      >取消订单</van-button
                    >
                    <van-button
                      size="small"
                      type="default"
                      @click="wdConfirmTap(item.id)"
                      v-if="item.status == '1'"
                      >确认收货</van-button
                    >

                    <!-- <van-button
                      size="small"
                      type="default"
                      @click="deleteOrder(item.id)"
                      v-if="item.status == '3' || item.status == '4'"
                      >删除订单</van-button
                    > -->
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!--失效订单-->
          <!-- <div v-else-if="currentTabwd === 1">
              <div class="container-body">
                <div class="">
                  <div
                    class="order-list"
                    @click="ptOrderDetailTap(item.id)"
                    v-for="(item, index) in myinvalidorderlist"
                    :key="index"
                  >
                    <div class="goods">
                      <div class="goodsdetail">
                        <div>
                          <img :src="item.src" alt="" />
                        </div>
                        <div class="goodstitle">
                          <p>
                            {{ item.name }}
                          </p>
                          <p>订单号：{{ item.orderid }}</p>
                          <p>
                            当前状态：<span>{{ item.status }}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="goodsintros">
                      <div>
                        <p>{{ item.name }}</p>
                        <span>x{{ item.num }}</span>
                      </div>
                      <div>
                        <p>
                          ￥<span>{{ item.price }}</span>
                        </p>
                      </div>
                    </div>
                    <div class="feedetail">
                      <div>
                        <p>付款金额</p>
                        <p>￥{{ item.payprice }}</p>
                      </div>
                      <div>
                        <p>领券</p>
                        <p>￥{{ item.coupon }}</p>
                      </div>
                      <div>
                        <p>预估补贴</p>
                        <p>￥{{ item.subsidy }}</p>
                      </div>
                    </div>
                    <div class="addtime">
                      <p>{{ item.pay_time }} 创建</p>
                    </div>
                  </div>
                </div>
              </div>
            </div> -->
          <!-- </div> -->
        </div>
      </van-tab>
    </van-tabs>

    <!-- 底部信息 -->
    <!-- <div class="bottom">
      <p>累计领优惠券<span>156.24</span>元，累计提现<span>98.14</span>元</p>
    </div> -->
    <van-popup
      v-model="show"
      closeable
      close-icon-position="top-right"
      position="bottom"
      :style="{ height: '90%' }"
    >
      <div class="expressbox">
        <div class="expresstop">
          <div>
            <img :src="expressLists.logo" alt="" />
          </div>
          <div>
            <p>
              {{
                expressLists.deliverystatus == "0"
                  ? "已发货"
                  : expressLists.deliverystatus == "1"
                  ? "运输中"
                  : expressLists.deliverystatus == "2"
                  ? "派件中"
                  : "已签收"
              }}
            </p>
            <p>{{ expressLists.expName + "：" + expressLists.number }}</p>
          </div>
          <!-- <p>{{ (expressLists.issign = "1" ? "已签收" : "") }}</p> -->
        </div>
        <div class="expresslist">
          <ul>
            <li v-for="(item, index) in expressLists.list" :key="index">
              <div>{{ item.time }}</div>
              <div><i></i></div>
              <div>{{ item.status }}</div>
            </li>
          </ul>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import "../../../static/css/vantresetorder.css";
import wx from "weixin-jsapi";
import GroupMall from "../../config/GroupMall";
import MicroShop from "../../config/MicroShop";
import { Toast, Dialog } from "vant";
export default {
  components: {
    [Toast.name]: Toast,
    [Dialog.Component.name]: Dialog.Component
  },
  name: "my-order",
  data() {
    return {
      title: "我的订单",
      condition: 0,
      navbar: ["有效订单", "失效订单"],
      activeIndex: 0,
      currentTab: 0,
      currentTabwg: 0,
      currentTabpt: 0,
      currentTabwd: 0,
      groupOrderLists: "",
      myorderlist: [],
      myinvalidorderlist: [],
      show: false,
      expressLists: ""
    };
  },
  methods: {
    wdOrderDetailTap(id) {
      this.$router.push({ name: "OrderDetail", query: { id: id } });
    },
    ptOrderDetailTap(id) {
      this.$router.push({ name: "Orderdetails", query: { id: id } });
    },
    onClick(index) {
      localStorage.setItem("activeIndex", index);
      if (index == 0) {
        this.groupOrderList();
      } else {
        this.getMicroShopOrder();
      }
      // this.$toast(index);
    },
    navbarTapwg: function(index) {
      this.condition = index;
      this.currentTabwg = index;
      // this.myvoice();
    },
    navbarTappt: function(index) {
      this.currentTabpt = index;
      this.groupOrderList();
    },
    navbarTapwd: function(index) {
      this.condition = index;
      this.currentTabwd = index;
      // this.myvoice();
    },
    deleteOrder() {
      this.$toast("当前订单无法删除！");
    },
    async cancelOrder(id) {
      try {
        let data = {
          user_id: this.$cookies.get("userid"),
          id: id
        };
        const response = await GroupMall.groupOrderCancel(data); // 订单状态查看：0未处理 1已发货 2已完成 3已取消
        //团购状态 0进行中 1结束 2失败
        window.console.log(response.data);
        if (response.data.err_code == 0) {
          this.groupOrderList();
          Dialog.alert({
            message: "订单已取消"
          }).then(() => {
            // on close
          });
        }
      } catch (error) {
        window.console.log(error.response);
      }
    },
    async wdCancelOrder(id) {
      try {
        let data = {
          user_id: this.$cookies.get("userid"),
          id: id
        };
        const response = await MicroShop.microOrderCancel(data); // 订单状态查看：0未处理 1已发货 2已完成 3已取消
        //团购状态 0进行中 1结束 2失败
        window.console.log(response.data);
        if (response.data.err_code == 0) {
          this.getMicroShopOrder();
          Dialog.alert({
            message: "订单已取消"
          }).then(() => {
            // on close
          });
        }
      } catch (error) {
        window.console.log(error.response);
      }
    },
    async wdConfirmTap(id) {
      try {
        let data = {
          user_id: this.$cookies.get("userid"),
          id: id
        };
        const response = await MicroShop.microOrderConfirm(data); //订单状态查看：0未处理 1已发货 2已完成 3已取消
        //团购状态 0进行中 1结束 2失败
        window.console.log(response.data);
        if (response.data.data.length > 0) {
          this.getMicroShopOrder();
        }
      } catch (error) {
        window.console.log(error.response);
      }
    },
    evaluateTap(id) {
      this.$router.push({ name: "appraise", query: { id: id } });
    },
    async confirmTap(id) {
      let data = {
        id: id
      };
      try {
        const response = await GroupMall.groupOrderFinishe(data);
        window.console.log(response.data);
        if (response.data.err_code == 0) {
          this.groupOrderList();

          Dialog.alert({
            message: "已确认收货"
          }).then(() => {
            // on close
          });
        }
      } catch (error) {
        window.console.log(error.response);
      }
    },
    async viewLogisticsTap(no) {
      let data = {
        no: no
      };
      try {
        const response = await MicroShop.expressInfo(data);
        window.console.log(response.data);
        if (response.data.err_code == 0) {
          this.expressLists = response.data.data;
          this.show = true;
        }
      } catch (error) {
        window.console.log(error.response);
      }
    },
    async getMicroShopOrder() {
      // let status;
      // if (this.currentTabpt == 0) {
      //   status = 0;
      // } else {
      //   status = 2;
      // }
      let data = {
        user_id: this.$cookies.get("userid")
        // status: status
      };
      try {
        const response = await MicroShop.microShopOrder(data);
        window.console.log(response.data);
        if (response.data.data.rows.length > 0) {
          this.myorderlist = response.data.data.rows;
        }
      } catch (error) {
        window.console.log(error.response);
      }
    },
    async groupOrderList() {
      let data = {
        user_id: this.$cookies.get("userid")
      };
      try {
        const response = await GroupMall.groupOrder(data); // 0未处理 1已发货 2已收货 3已完成 4取消
        //团购状态 0进行中 1结束 2失败
        window.console.log(response.data);
        if (response.data.data.length > 0) {
          this.groupOrderLists = response.data.data;
        } else {
          this.groupOrderLists = "";
        }
      } catch (error) {
        window.console.log(error.response);
      }
    },
    async groupOrderListsec() {
      // let status;
      // if (this.currentTabpt == 0) {
      //   status = 0;
      // } else {
      //   status = 2;
      // }
      let data = {
        user_id: this.$cookies.get("userid")
      };
      try {
        const response = await GroupMall.groupOrder(data); // 0未处理 1已发货 2已收货 3已完成 4取消
        //团购状态 0进行中 1结束 2失败
        window.console.log(response.data);
        if (response.data.data.length > 0) {
          this.groupOrderLists = response.data.data;
        } else {
          this.groupOrderLists = "";
        }
      } catch (error) {
        window.console.log(error.response);
      }
    },
    async Pay(out_trade_no, point) {
      // var that = this;
      try {
        let data = {
          user_id: this.$cookies.get("userid"),
          out_trade_no: out_trade_no,
          point: point,
          repay: 1
        };

        const response = await GroupMall.pay(data);
        window.console.log(response.data);
        // this.$router.push({ name: "PaySucceed" });
        if (response.data.err_code == 0) {
          wx.chooseWXPay({
            appId: response.data.data.appid, //公众号名称，由商户传入
            timestamp: response.data.data.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
            nonceStr: response.data.data.nonceStr, // 支付签名随机串，不长于 32 位
            package: "prepay_id=" + response.data.data.prepayid, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
            signType: response.data.data.sign, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
            paySign: response.data.data.paySign, // 支付签名
            success: function(res) {
              window.console.log(res);
              setTimeout(function() {
                this.groupOrderListsec(0);
              }, 2000);

              // that.$router.push({ name: "PaySucceed" });
            }
          });
          // this.$router.push({ name: "ShopDetail", params: { id: id } });
        } else {
          this.$toast(response.data.err_msg);
        }
      } catch (error) {
        window.console.log(error.response);
      }
    },
    async wdPay(out_trade_no, point) {
      // var that = this;
      // try {
      //   let data = {
      //     user_id: this.$cookies.get("userid"),
      //     out_trade_no: out_trade_no,
      //     point: point,
      //     repay: 1
      //   };

      //   const response = await GroupMall.pay(data);
      //   window.console.log(response.data);
      //   // this.$router.push({ name: "PaySucceed" });
      //   if (response.data.err_code == 0) {
      //     wx.chooseWXPay({
      //       appId: response.data.data.appid, //公众号名称，由商户传入
      //       timestamp: response.data.data.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
      //       nonceStr: response.data.data.nonceStr, // 支付签名随机串，不长于 32 位
      //       package: "prepay_id=" + response.data.data.prepayid, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
      //       signType: response.data.data.sign, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
      //       paySign: response.data.data.paySign, // 支付签名
      //       success: function(res) {
      //         setTimeout(function() {
      //           this.groupOrderListsec(0);
      //         }, 2000);

      //         // that.$router.push({ name: "PaySucceed" });
      //       }
      //     });
      //     // this.$router.push({ name: "ShopDetail", params: { id: id } });
      //   } else {
      //     this.$toast(response.data.err_msg);
      //   }
      // } catch (error) {
      //   window.console.log(error.response);
      // }

      var that = this;
      try {
        let data = {
          user_id: this.$cookies.get("userid"),
          out_trade_no: out_trade_no,
          point: point
        };

        const response = await MicroShop.microOrderPay(data);
        window.console.log(response.data);
        // this.$router.push({ name: "PaySucceed" });
        if (response.data.err_code == 0) {
          wx.chooseWXPay({
            appId: response.data.data.appid, //公众号名称，由商户传入
            timestamp: response.data.data.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
            nonceStr: response.data.data.nonceStr, // 支付签名随机串，不长于 32 位
            package: "prepay_id=" + response.data.data.prepayid, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
            signType: response.data.data.sign, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
            paySign: response.data.data.paySign, // 支付签名
            success: function(res) {
              window.console.log(res);
              that.getMicroShopOrder();
            }
          });
          // this.$router.push({ name: "ShopDetail", params: { id: id } });
        }
      } catch (error) {
        window.console.log(error.response);
      }
    }
  },
  mounted() {
    this.groupOrderList();
    this.getMicroShopOrder();
    this.common.login();
    if (this.$route.params.activeIndex != undefined) {
      localStorage.setItem("activeIndex", this.$route.params.activeIndex);
      this.activeIndex = this.$route.params.activeIndex;
    } else {
      this.activeIndex = parseInt(localStorage.getItem("activeIndex"));
    }
  }
};
</script>

<style lang="less" scoped>
.expressbox {
  padding: 0.1rem 0.1rem;
  .expresstop {
    display: flex;
    margin-bottom: 0.15rem;
    p {
      line-height: 0.3rem;
      font-size: 0.14rem;
      color: #666;
      margin-left: 0.1rem;
    }
  }
  .expresslist {
    ul {
      li {
        display: flex;
        font-size: 0.13rem;
        line-height: 0.2rem;
        // height: 0.45rem;
        div {
          word-wrap: word-break;
          word-break: normal;
          text-align: left;
        }
        div:nth-child(1) {
          width: 0.9rem;
          text-align: center;
        }
        div:nth-child(2) {
          position: relative;
          width: 0.2rem;
          // margin: 0 0.05rem;
          margin-left: 0.05rem;
          line-height: 0.2rem;
          border-left: 4px solid #ccc;
          i {
            display: block;
            width: 0.16rem;
            height: 0.16rem;
            border-radius: 100%;
            background-color: #ccc;
            position: absolute;
            left: -0.1rem;
            // top: 0.2rem;
          }
        }
        div:nth-child(3) {
          width: 2.6rem;
        }
      }
      li:nth-child(1) {
        i {
          background-color: #37e0bf !important;
        }
      }
      li:last-child {
        div {
          border: none;
        }
        i {
          left: -0.06rem !important;
        }
      }
    }
  }
}

.sloter {
  margin-top: 0.1rem;
}

.header {
  width: 100%;
  height: 0.49rem;
  position: absolute;
  top: -0.1rem;
  background: #fc5d65;
  z-index: -1;
}

.reset {
  top: 0.1rem;
  padding-top: 0;
}

.bottom {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 0.5rem;
  line-height: 0.5rem;
  padding: 0 0.15rem;
  z-index: 999;
  background: #fff;
  font-size: 0.14rem;
  text-align: center;
}

.bottom p span {
  font-size: 0.15rem;
  color: #f92d36;
}

.goods {
  width: 100%;
  background: #fff;
  padding: 0.15rem 0.15rem;
}

.goods img {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  margin-right: 0.15rem;
}

.goodsdetail {
  display: flex;
}

.goodstitle p:nth-child(1) {
  font-size: 0.13rem;
  font-weight: 600;
  color: #333;
  max-width: 2.75rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  line-height: 0.18rem;
}

.goodstitle p:nth-child(2) {
  font-size: 0.12rem;
  color: #666;
  line-height: 0.18rem;
  /* margin-top: 0.3rem; */
}

.goodstitle p:nth-child(3),
.goodstitle p:nth-child(4) {
  font-size: 0.12rem;
  color: #666;
  line-height: 0.18rem;
  /* margin-top: 0.3rem; */
}

.goodstitle p:nth-child(3) span,
.goodstitle p:nth-child(4) span {
  color: #f92d36;
  /* margin-top: 0.3rem; */
}

.goodstitle p:nth-child(2) span:nth-child(1) {
  font-size: 0.12rem;
  color: #999;
  margin: 0 0.04rem;
}

.goodstitle p:nth-child(2) span:nth-child(2) {
  font-size: 0.12rem;
  color: #333;
}

.navbar {
  flex: none;
  display: flex;
  background: #fff;
  margin-top: 1px;
}

.navbar .item {
  position: relative;
  flex: auto;
  text-align: center;
  line-height: 0.44rem;
  font-size: 0.14rem;
}

.navbar .item.active {
  color: #fc5d65;
}

.navbar .item.active:after {
  content: "";
  display: block;
  position: absolute;
  bottom: 0;
  left: 0.6125rem;
  right: 0;
  height: 0.01rem;
  width: 0.65rem;
  background: #fc5d65;
}

.container-body {
  background: #fff;
  padding-bottom: 0.5rem;
}

.order-list {
  border-bottom: 0.1rem solid #f2f2f2;
}

.feedetail {
  display: flex;
  justify-content: space-around;
}

.feedetail div p:nth-child(1) {
  font-size: 0.12rem;
  color: #333;
  line-height: 0.25rem;
  text-align: center;
}

.feedetail div p:nth-child(2) {
  font-size: 0.13rem;
  font-weight: 600;
  color: #333;
  line-height: 0.25rem;
  text-align: center;
}

.addtime p {
  font-size: 0.12rem;
  color: #666;
  text-align: right;
  padding: 0.1rem 0.15rem;
}

.goodsintros {
  display: flex;
  justify-content: space-around;
  margin-bottom: 0.1rem;
}

.goodsintros div:nth-child(1) p {
  display: inline-block;
  max-width: 1.6rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-size: 0.12rem;
  color: #333;
  font-weight: 600;
}

.goodsintros div:nth-child(1) span {
  font-size: 0.13rem;
  color: #333;
}

.goodsintros div:nth-child(2) p {
  font-size: 0.12rem;
  color: #fc5d65;
}

.orderBtn {
  max-height: 0.4rem;
  padding: 0.05rem;
  overflow: hidden;
}
.orderBtn > .van-button {
  display: inline-block;
  float: right;
  margin: 0 0.05rem;
}
</style>
