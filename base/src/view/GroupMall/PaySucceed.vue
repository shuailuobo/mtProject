<template>
  <div class="container">
    <!-- <HeaderTop title="付款成功"></HeaderTop> -->
    <div class="succeed"></div>
    <div class="title">可前往个人中心-我的订单查看物流信息</div>
    <div class="lookList" @click="looklist">查看订单</div>
  </div>
</template>
<script>
import HeaderTop from "@/components/HeaderTop/index";

export default {
  name: "Evaluation",
  components: {
    HeaderTop
  },
  methods: {
    looklist() {
      this.$router.replace({ name: "MyOrder" });
    }
  }
};
</script>
<style lang="less" scoped>
.succeed {
  width: 0.75rem;
  height: 0.75rem;
  background: url("../../assets/paysucceed/succeed@2x.png");
  // @include bg-image("../../assets/paysucceed/succeed");
  background-size: cover;
  background-repeat: no-repeat;
  margin: 0.585rem 1.54rem 0.32rem;
}
.title {
  width: 100%;
  height: 0.13rem;
  color: #333;
  font-size: 0.13rem;
  text-align: center;
  margin-bottom: 0.33rem;
}
.lookList {
  width: 2.4rem;
  height: 0.45rem;
  border: 1px solid rgba(153, 153, 153, 1);
  border-radius: 0.04rem;
  margin: 0 0.675rem;
  text-align: center;
  line-height: 0.45rem;
  color: #333;
  font-size: 0.14rem;
}
</style>
