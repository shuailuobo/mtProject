<template>
  <div class="container">
    <!-- <HeaderTop :title="title"></HeaderTop> -->
    <!-- 搜索开始 -->
    <section>
      <div class="search">
        <van-search placeholder="请输入搜索关键词" v-model="value" />
      </div>
    </section>
  </div>
</template>
<script>
import HeaderTop from "@/components/HeaderTop/index";
import { Search } from "vant";
export default {
  name: "amoysearch",
  components: {
    HeaderTop,
    [Search.name]: Search
  },
  data() {
    return {
      title: "搜索"
    };
  }
};
</script>
<style lang="less" scoped>
.search {
  background-color: #fff;
}
</style>
