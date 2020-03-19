<template>
  <div class="container">
    <div class="order-list" v-for="(item, index) in OrderLists" :key="index">
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
              当前状态：<span>{{
                item.status == 0
                  ? "未处理"
                  : item.status == 1
                  ? "已发货"
                  : item.status == 2
                  ? "已完成"
                  : "已取消"
              }}</span>
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
            ￥<span>{{ item.order_price }}</span>
          </p>
        </div>
      </div>
      <div class="feedetail">
        <div>
          <p>付款金额</p>
          <p>￥{{ item.total_price }}</p>
        </div>
        <!-- <div>
          <p>领券</p>
          <p>￥{{ item.coupon_id }}</p>
        </div> -->
        <div>
          <p>预估积分补贴</p>
          <p>{{ item.profit }}</p>
        </div>
      </div>
      <div class="addtime">
        <p>{{ item.create_time }} 创建</p>
      </div>
      <div class="orderBtn">
        <van-button
          size="small"
          type="default"
          @click="orderDeliveryTap(item.id)"
          v-if="item.status == '0' && item.pay_status == '1'"
          >发货</van-button
        >
      </div>
    </div>

    <!-- <van-tabbar active-color="#C61720" v-model="active">
      <van-tabbar-item>进行中</van-tabbar-item>
      <van-tabbar-item>已完成</van-tabbar-item>
      <van-tabbar-item>已关闭</van-tabbar-item>
    </van-tabbar> -->
  </div>
</template>

<script>
import BackStagemanagement from "../../config/BackStagemanagement";
import { Dialog } from "vant";
export default {
  components: {
    [Dialog.Component.name]: Dialog.Component
  },
  data() {
    return {
      store_id: this.$route.query.store_id,
      OrderLists: []
    };
  },
  methods: {
    wdOrderDetailTap(id) {
      this.$router.push({ name: "OrderDetail", query: { id: id } });
    },
    async getOrderList() {
      try {
        let data = {
          store_id: this.store_id
        };
        const response = await BackStagemanagement.orderList(data);
        window.console.log(response.data);
        if (response.data.err_code == 0) {
          if (response.data.data.rows.length > 0) {
            this.OrderLists = response.data.data.rows;
          }
        }
      } catch (error) {
        window.console.log(error.response);
      }
    },
    async orderDeliveryTap(id) {
      try {
        let data = {
          id: id
        };
        const response = await BackStagemanagement.orderDelivery(data);
        window.console.log(response.data);
        if (response.data.err_code == 0) {
          Dialog.alert({
            title: "提示",
            message: "已发货"
          }).then(() => {
            this.getOrderList();
          });
        }
      } catch (error) {
        window.console.log(error.response);
      }
    }
  },
  mounted() {
    this.getOrderList();
  }
};
</script>

<style lang="less" scoped>
.order-list {
  background: #fff;
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
  height: 0.4rem;
  overflow: hidden;
}
.orderBtn > .van-button {
  display: inline-block;
  float: right;
  margin: 0 0.05rem;
}
</style>
