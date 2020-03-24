<template>
  <div class="container">
    <!-- header -->
    <div class="header">
      <div>
        <img src="../../assets/sucesspay.png" alt="" />
      </div>
      <div class="headtext">
        <p>付款成功</p>
        <p>等待商品发货</p>
      </div>
    </div>
    <!-- address -->
    <div class="address">
      <ul>
        <li>
          <p>店铺：</p>
          <p>{{ store_name }}</p>
        </li>
        <li v-if="shipping_type == '2'">
          <p>店铺电话：：</p>
          <p>
            {{ store_phone }}
          </p>
        </li>
        <li v-if="shipping_type == '2'">
          <p>店铺地址：</p>
          <p>{{ storeAddress }}</p>
        </li>
        <li v-if="shipping_type == '1'">
          <p>收货人：</p>
          <p>
            {{ contact }} <span>{{ phone }}</span>
          </p>
        </li>
        <li v-if="shipping_type == '1'">
          <p>收货地址：</p>
          <p>{{ address }}</p>
        </li>
      </ul>
    </div>
    <!-- order -->
    <div class="order">
      <ul>
        <li>
          <p>订单号：</p>
          <p>{{ out_trade_no }}</p>
        </li>
        <li>
          <p>商品：</p>
          <div>
            <p v-for="(item, index) in selectFoods" :key="index">
              {{ item.goods_name }} x{{ item.quantity }}
            </p>
          </div>
        </li>
        <li>
          <p>合计：</p>
          <p class="totalprice">¥{{ order_price }}</p>
        </li>
      </ul>
    </div>
    <van-button @click="linkMyorder" size="large"
      >去个人中心查看订单</van-button
    >
  </div>
</template>
<script>
import MicroShop from "../../config/MicroShop";
export default {
  name: "success-pay",
  components: {},
  data() {
    return {
      title: "支付成功",
      contact: "",
      status: "",
      order_price: "",
      address: "",
      shipping_fee: "",
      out_trade_no: "",
      phone: "",
      shipping_type: "",
      selectFoods: [],
      store_name: "",
      storeAddress: "",
      store_phone: ""
    };
  },
  methods: {
    linkMyorder() {
      this.$router.replace({ name: "MyOrder", params: { activeIndex: 1 } });
    }
  },
  async created() {
    let data = {
      out_trade_no: this.$route.query.out_trade_no
    };
    try {
      const response = await MicroShop.microOrderInfo(data);
      window.console.log(response.data);
      this.status = response.data.data.status;
      this.order_price = response.data.data.order_price;
      this.out_trade_no = response.data.data.out_trade_no;
      this.shipping_type = response.data.data.shipping_type;
      this.selectFoods = response.data.data.goods_detail;
      this.store_name = response.data.data.store_name;
      this.contact = response.data.data.contact;
      this.address = response.data.data.address;
      this.phone = response.data.data.phone;

      this.storeAddress =
        response.data.data.store_region + response.data.data.store_address;
      this.store_phone = response.data.data.store_phone;
    } catch (error) {
      window.console.log(error.response);
    }
  }
};
</script>

<style scoped>
.header {
  width: 100%;
  height: 1rem;
  background: linear-gradient(left, #ff8635, #ff6735);
  display: flex;
}

.header img {
  width: 0.51rem;
  height: 0.51rem;
  margin-top: 0.24rem;
  margin-left: 0.4rem;
  margin-right: 0.2rem;
}

.headtext {
  margin-top: 0.24rem;
}

.headtext p:nth-child(1) {
  font-size: 0.16rem;
  font-weight: 600;
  color: #fff;
}

.headtext p:nth-child(2) {
  font-size: 0.12rem;
  color: #fff;
  margin-top: 0.2rem;
}

.address {
  background: #fff;
  padding: 0.1rem 0.15rem;
}

.address ul li {
  display: flex;
  line-height: 0.3rem;
}

.address ul li p:nth-child(1) {
  color: #999;
  font-size: 0.13rem;
}

.address ul li p:nth-child(2) {
  color: #333;
  font-size: 0.13rem;
  font-weight: 600;
}

.order {
  background: #fff;
  padding: 0.1rem 0.15rem;
  margin-top: 0.1rem;
  margin-bottom: 0.2rem;
}

.order ul li {
  display: flex;
  line-height: 0.3rem;
}

.totalprice {
  font-size: 0.14rem !important;
  color: #f92d36 !important;
}

.order ul li p {
  color: #666;
  font-size: 0.13rem;
}

/* .order ul li p:nth-child(2) {
  color: #333;
  font-size: 0.13rem;
  font-weight: 600;
} */

.order ul li p:nth-child(2) span {
  display: block;
}
</style>
