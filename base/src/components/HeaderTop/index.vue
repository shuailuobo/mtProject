<template>
  <div class="fix">
    <header class="header">
      <span
        class="goback"
        @click="$router.go(-1)"
        v-if="falg"
      >
        <van-icon
          size="0.19rem"
          name="arrow-left"
        />
      </span>
      <span class="header_title">
        <span class="header_title_text ellipsis headerTitle">{{title}}</span>
      </span>
      <span class="quanbox">
        <ul class="quan">
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </span>
    </header>
  </div>
</template>
<script>
import { Icon } from "vant";

export default {
  components: {
    [Icon.name]: Icon
  },
  props: {
    title: String
  },
  data() {
    return {
      falg: false
    };
  },
  created() {
    // console.log(this.$route.path)
    if (
      this.$route.path === "/home" ||
      this.$route.path === "/groupmall" ||
      this.$route.path === "/microshop" ||
      this.$route.path === "/personalcenter" ||
      this.$route.path === "/MicroShop" ||
      this.$route.path === "/amoyindex" ||
      this.$route.path === "/user" ||
      this.$route.path === "/environmental"
    ) {
      this.falg = false;
    } else {
      this.falg = true;
    }
  },
  watch: {
    "$route.path": function(newVal) {
      window.console.log(newVal);
      if (
        newVal === "/home" ||
        newVal === "/groupmall" ||
        newVal === "/microshop" ||
        newVal === "/personalcenter" ||
        newVal === "/MicroShop" ||
        newVal === "/amoyindex" ||
        newVal === "/user" ||
        newVal === "/environmental"
      ) {
        this.falg = false;
      } else {
        this.falg = true;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
// .header{
//   // position: relative;
//   position: fixed;
//   top: 0;
//   left: 0;
//    @include bottom-border-1px(#eee);
// }
.fix {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
}
.header_title {
  display: inline-block;
  height: 100%;
}
.header {
  border-bottom: 1px solid #eee;
  //  @include bottom-border-1px(#eee);
  height: 0.44rem;
  background-color: #fff;
  width: 100%;
  color: #333;
  text-align: center;
}

.headerTitle {
  display: inline-block;
  height: 100%;
  font-weight: bold;
  font-size: 0.18rem;
  line-height: 0.44rem;
}
.quanbox {
  display: block;
  position: absolute;
  right: 0.1rem;
  top: 50%;
}
.quan {
  width: 0.24rem;
  height: 0.04rem;
  display: flex;
  justify-content: space-between;
}

.quan > li {
  height: 0.04rem;
  width: 0.04rem;
  border-radius: 50%;
  background-color: #333;
}
.goback {
  display: inline-block;
  position: absolute;
  left: 0.15rem;
  top: 50%;
  transform: translateY(-50%);
}
</style>
