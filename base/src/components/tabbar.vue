<template>
  <van-tabbar
    v-model="active"
    active-color="#FC5D65"
  >
    <van-tabbar-item to="/MicroShop">
      <img
        slot="icon"
        slot-scope="props"
        :src="props.active ? icon.active_1 : icon.normal_1"
      >
      首页
    </van-tabbar-item>
    <van-tabbar-item to="/OrderDetail">
      <img
        slot="icon"
        slot-scope="props"
        :src="props.active ? icon.active_2 : icon.normal_2"
      >
      淘客</van-tabbar-item>
    <van-tabbar-item to="/Delivery">
      <img
        slot="icon"
        slot-scope="props"
        :src="props.active ? icon.active_3 : icon.normal_3"
      >
      拼团商城</van-tabbar-item>
    <van-tabbar-item to="/MyOrder">
      <img
        slot="icon"
        slot-scope="props"
        :src="props.active ? icon.active_4 : icon.normal_4"
      >个人中心</van-tabbar-item>
  </van-tabbar>
</template>
<script>
import { Tabbar, TabbarItem } from "vant";
export default {
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },
  data() {
    return {
      active: 0,
      icon: {
        normal_1: require("../assets/p5.png"),
        active_1: require("../assets/p5-1.png"),
        normal_2: require("../assets/p3.png"),
        active_2: require("../assets/p3-1.png"),
        normal_3: require("../assets/p2.png"),
        active_3: require("../assets/p2-1.png"),
        normal_4: require("../assets/p4.png"),
        active_4: require("../assets/p4-1.png")
      }
    };
  }
};
</script>

<style scoped>
.van-tabbar-item__icon img {
  height: 0.24rem;
}
</style>
