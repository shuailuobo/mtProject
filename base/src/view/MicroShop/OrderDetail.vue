<template>
  <div class="container">
    <!-- <HeaderTop :title="title"></HeaderTop> -->
    <div class="orderstatus">
      <!-- {{
        status == "0"
          ? "未处理"
          : status == "1"
          ? "已发货"
          : status == "2"
          ? "已完成"
          : "已取消"
      }} -->
      {{
        status == "0" && pay_status == "0"
          ? "未支付"
          : status == "0" && pay_status == "1"
          ? "待处理"
          : status == "1"
          ? "已发货"
          : status == "2"
          ? "已收货"
          : status == "3"
          ? "已完成"
          : "已取消"
      }}
    </div>
    <div class="goods">
      <div class="goodsname">{{ store_name }}</div>

      <div
        class="goodsdetail"
        v-for="(item, index) in selectFoods"
        :key="index"
      >
        <div>
          <img :src="item.goods_thumb" alt="" />
        </div>
        <div class="goodstitle">
          <p>{{ item.goods_name }}</p>
          <p>
            ￥{{ item.price }}<span>x</span><span>{{ item.quantity }}</span>
          </p>
        </div>
      </div>
      <div class="gooddetails">
        <ul>
          <li>
            <p>商品总额</p>
            <p>¥{{ totalPrice }}</p>
          </li>
          <li>
            <p>账户积分抵扣</p>
            <span>-{{ point }}</span>
          </li>
          <li>
            <p>账户余额抵扣</p>
            <span>-¥{{ money }}</span>
          </li>
          <li v-if="shipping_type == 1">
            <p>运费</p>
            <p>¥{{ shipping_fee }}</p>
          </li>
        </ul>
      </div>
      <div class="totalprice">
        <p>
          合计<span>￥{{ order_price }}</span>
        </p>
      </div>
    </div>

    <div class="orders">
      <ul>
        <li>
          <p>订单编号：</p>
          <p>{{ out_trade_no }}</p>
        </li>
        <li>
          <p>下单时间：</p>
          <p>{{ create_time }}</p>
        </li>
        <li>
          <p>配送方式：</p>
          <p>{{ shipping_type == "1" ? "外卖配送" : "到店自取" }}</p>
        </li>
        <li>
          <p>店铺电话：</p>
          <p>{{ store_phone }}</p>
        </li>
        <li>
          <p>店铺地址：</p>
          <p>{{ store_address }}</p>
        </li>

        <li v-if="shipping_type == '1'">
          <p>联系方式：</p>
          <p>{{ contact + " " + phone }}</p>
        </li>
        <li v-if="shipping_type == '1'">
          <p>配送地址：</p>
          <p>{{ address }}</p>
        </li>

        <li v-if="shipping_type == '2'">
          <p>预留信息：</p>
          <p>{{ valid_phone }}</p>
        </li>
        <li v-if="shipping_type == '2'">
          <p>预定时间：</p>
          <p>{{ pick_time }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import MicroShop from "../../config/MicroShop";
import areaList from "../../config/area";
export default {
  name: "order-detail",
  components: {},
  data() {
    return {
      areaList,
      title: "订单详情",
      create_time: "",
      status: "",
      pay_status: "",
      order_price: "",
      total_price: "",
      shipping_fee: "",
      out_trade_no: "",
      coupon_id: "",
      shipping_type: "",
      selectFoods: [],
      store_name: "",
      // coupon_amount: "",
      address: "",
      contact: "",
      phone: "",
      pick_time: "",
      valid_phone: "",
      store_address: "",
      store_phone: "",
      point: "",
      money: ""
    };
  },
  async created() {
    let data = {
      id: this.$route.query.id
    };
    try {
      const response = await MicroShop.microOrderInfo(data);
      window.console.log(response.data);
      this.create_time = response.data.data.create_time;
      this.status = response.data.data.status;
      this.pay_status = response.data.data.pay_status;
      this.order_price = response.data.data.order_price;
      this.total_price = response.data.data.total_price;
      this.shipping_fee = response.data.data.shipping_fee;
      this.out_trade_no = response.data.data.out_trade_no;
      this.shipping_type = response.data.data.shipping_type;
      this.selectFoods = response.data.data.goods_detail;
      this.coupon_id = response.data.data.coupon_id;
      this.store_name = response.data.data.store_name;

      this.contact = response.data.data.contact;
      this.phone = response.data.data.phone;

      this.pick_time = response.data.data.pick_time;
      this.valid_phone = response.data.data.valid_phone;

      this.store_address =
        response.data.data.store_region + response.data.data.store_address;
      this.store_phone = response.data.data.store_phone;

      this.address = response.data.data.address;
      this.point = response.data.data.point;
      this.money = response.data.data.money;
    } catch (error) {
      window.console.log(error.response);
    }
  },
  computed: {
    totalPrice() {
      let total = 0;
      // console.log(this.selectFoods);
      this.selectFoods.forEach(food => {
        total += Math.round(food.price * food.quantity * 100) / 100;
      });
      return total;
    }
  }
};
</script>

<style scoped>
.orderstatus {
  font-size: 0.16rem;
  color: #333;
  font-weight: 600;
  padding: 0.15rem;
}

.goods {
  width: 3.45rem;
  margin: 0 auto;
  border-radius: 0.04rem;
  background: #fff;
  padding: 0 0.15rem 0.15rem 0.15rem;
}

.goods img {
  width: 0.6rem;
  height: 0.6rem;
  margin-right: 0.1rem;
}

.goodsname {
  font-size: 0.14rem;
  font-weight: 600;
  line-height: 0.4rem;
}

.goodsdetail {
  display: flex;
}

.goodstitle p:nth-child(1) {
  font-size: 0.14rem;
  font-weight: 600;
  color: #333;
  max-width: 2.5rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.goodstitle p:nth-child(2) {
  font-size: 0.13rem;
  font-weight: 600;
  color: #f92d36;
  margin-top: 0.3rem;
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

.orders {
  width: 3.45rem;
  margin: 0.1rem auto;
  border-radius: 0.04rem;
  background: #fff;
  padding: 0.1rem 0.15rem;
}

.orders ul li {
  display: flex;
  line-height: 0.4rem;
}

.orders ul li p:nth-child(1) {
  color: #999;
  font-size: 0.13rem;
}

.orders ul li p:nth-child(2) {
  color: #333;
  font-size: 0.13rem;
  font-weight: 600;
}

.gooddetails {
  background: #fff;
  padding: 0.1rem 0rem;
}

.gooddetails ul li {
  display: flex;
  justify-content: space-between;
  line-height: 0.3rem;
}

.gooddetails ul li p:nth-child(1) {
  color: #999;
  font-size: 0.13rem;
}

.gooddetails ul li p:nth-child(2) {
  color: #333;
  font-size: 0.13rem;
  font-weight: 600;
}

.totalprice {
  height: 0.1rem;
}

.totalprice p {
  display: inline-block;
  float: right;
  color: #333;
  font-size: 0.12rem;
}

.totalprice p:nth-child(2) {
  margin-right: 0.1rem;
}

.totalprice p span {
  color: #f92d36;
  font-size: 0.14rem;
  font-weight: 600;
}
</style>
