<template>
  <div
    class="foot"
    v-if="flag"
  >
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
        微店
      </van-tabbar-item>
      <van-tabbar-item to="/amoyindex">
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? icon.active_2 : icon.normal_2"
        >
        淘客</van-tabbar-item>
      <van-tabbar-item to="/groupmall">
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? icon.active_3 : icon.normal_3"
        >
        拼团商城</van-tabbar-item>
      <van-tabbar-item to="/environmental">
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? icon.active_5 : icon.normal_5"
        >
        环保</van-tabbar-item>
      <van-tabbar-item to="/user">
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? icon.active_4 : icon.normal_4"
        >个人中心</van-tabbar-item>
    </van-tabbar>
  </div>

</template>

<script>
import { Tabbar, TabbarItem } from "vant";
export default {
  name: "FooterNav",
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },
  data() {
    return {
      active: 0,
      icon: {
        normal_1: require("../../assets/FootNav/p5.png"),
        active_1: require("../../assets/FootNav/p5-1.png"),
        normal_2: require("../../assets/FootNav/p3.png"),
        active_2: require("../../assets/FootNav/p3-1.png"),
        normal_3: require("../../assets/FootNav/p2.png"),
        active_3: require("../../assets/FootNav/p2-1.png"),
        normal_4: require("../../assets/FootNav/p4.png"),
        active_4: require("../../assets/FootNav/p4-1.png"),
        normal_5: require("../../assets/FootNav/p6.png"),
        active_5: require("../../assets/FootNav/p6-1.png")
      },
      flag: false
    };
  },
  created() {
    if (
      this.$route.path === "/MicroShop" ||
      this.$route.path === "/groupmall" ||
      this.$route.path === "/amoyindex" ||
      this.$route.path === "/user" ||
      this.$route.path === "/environmental"
    ) {
      this.flag = true;
    } else {
      this.flag = false;
    }
  },
  watch: {
    "$route.path": function(newVal) {
      switch (this.$route.path) {
        case "/MicroShop":
          this.active = 0;
          break;
        case "/amoyindex":
          this.active = 1;
          break;
        case "/groupmall":
          this.active = 2;
          break;
        case "/environmental":
          this.active = 3;
          break;
        case "/user":
          this.active = 4;
      }
      if (
        newVal === "/MicroShop" || //微店
        newVal === "/groupmall" || //拼团
        newVal === "/amoyindex" || //淘客
        newVal === "/user" || //个人中心
        newVal === "/environmental" //环保
      ) {
        this.flag = true;
      } else {
        this.flag = false;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.foot {
  background-color: #fff;
  z-index: 666;
}

// #app {
//   padding-top: 0.44rem;
//   padding-bottom: 0.5rem;
// }
</style>
