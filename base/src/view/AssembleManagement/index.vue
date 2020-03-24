<template>
  <div class="container">
    <van-grid style="margin-bottom: 0.1rem;" :column-num="2">
      <van-grid-item>
        <div class="state">
          <p>营业额</p>
          <p>￥{{ sale_amount }}</p>
          <!-- <p>昨日￥888</p> -->
        </div>
      </van-grid-item>
      <van-grid-item>
        <div class="state">
          <p>订单数</p>
          <p>{{ order_total }}</p>
          <!-- <p>昨日86单</p> -->
        </div>
      </van-grid-item>
    </van-grid>

    <van-grid :column-num="3">
      <van-grid-item
        v-for="(item, index) in gridlist"
        :key="index"
        @click="$router.push({ name: item.url })"
      >
        <van-image width="28" height="28" :src="item.src" />
        <p class="textstyle">{{ item.text }}</p>
      </van-grid-item>
    </van-grid>

    <van-cell
      style="margin-top:0.1rem;"
      title="我的资产"
      is-link
      value="收入资产"
      to="IncomeAssets"
    />

    <div class="myassets">
      <div>
        <p>{{ balance }}</p>
        <p @click="$router.push({ name: 'AssembleIncomeAssets' })">余额></p>
      </div>
      <div>
        <p>{{ withdrawal_total }}</p>
        <p @click="$router.push({ name: 'AssembleIncomeAssets' })">已提现></p>
      </div>
    </div>
  </div>
</template>

<script>
import BackStagemanagement from "../../config/BackStagemanagement";

export default {
  components: {},
  data() {
    return {
      sale_amount: "",
      order_total: "",
      balance: "",
      withdrawal_total: "",
      store_id: "",
      gridlist: [
        {
          text: "商品管理",
          src: require("../../assets/bg/4.png"),
          url: "AssembleCommodityManagement"
        },
        {
          text: "订单管理",
          src: require("../../assets/bg/5.png"),
          url: "AssembleOrderManagement"
        },
        {
          text: "收入资产",
          src: require("../../assets/bg/7.png"),
          url: "AssembleIncomeAssets"
        }
      ]
    };
  },
  methods: {},
  async created() {
    // this.$cookies.set("userid", "582");
    try {
      let data = {
        user_id: this.$cookies.get("userid")
      };
      const response = await BackStagemanagement.homeGroup(data);
      window.console.log(response.data);
      if (response.data.err_code == 0) {
        this.sale_amount = response.data.data.sale_amount;
        this.order_total = response.data.data.order_total;
        this.balance = response.data.data.balance;
        this.withdrawal_total = response.data.data.withdrawal_total;
      }
    } catch (error) {
      window.console.log(error.response);
    }
  }
};
</script>

<style lang="less" scoped>
.textstyle {
  font-size: 0.13rem;
  margin-top: 0.1rem;
  color: #666;
}

.state {
  line-height: 0.28rem;
  text-align: center;
  p:nth-child(1) {
    font-size: 0.14rem;
    font-weight: 600;
    color: #000;
  }
  p:nth-child(2) {
    font-size: 0.16rem;
    font-weight: 600;
    color: #fa6d41;
  }
  p:nth-child(3) {
    font-size: 0.14rem;
    color: #fa6d41;
  }
}

.myassets {
  background: #fff;
  padding: 0.1rem 0.15rem;
  display: flex;
  justify-content: space-around;

  div {
    background: #f2f2f2;
    width: 50%;
    text-align: center;
    line-height: 0.3rem;
    padding: 0.1rem 0;
    p:nth-child(1) {
      color: #000;
      font-size: 0.18rem;
      font-weight: 600;
    }
    p:nth-child(2) {
      color: #666;
      font-size: 0.14rem;
    }
  }
  div:nth-child(1) {
    border-right: 1px solid #ddd;
  }
}
</style>
