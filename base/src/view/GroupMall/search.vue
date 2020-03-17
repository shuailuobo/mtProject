<template>
  <div class="container">
    <!-- <HeaderTop :title="title"></HeaderTop> -->
    <!-- 搜索开始 -->
    <section>
      <div class="search">
        <van-search
          placeholder="请输入搜索关键词"
          v-model="value"
          show-action
          @search="onSearch"
        />
      </div>

      <div>
        <section v-for="(searchlist, index) in searchlists" :key="index">
          <van-card
            :num="searchlist.buy_times"
            :price="searchlist.price"
            :desc="searchlist.description"
            :title="searchlist.name"
            :thumb="searchlist.thumb"
            :origin-price="searchlist.market_price"
            @click="goodsDetails(searchlist.id)"
          >
            <div slot="num">已拼{{ searchlist.buy_times }}</div>
          </van-card>
        </section>
      </div>
    </section>
  </div>
</template>
<script>
import GroupMall from "../../config/GroupMall";
import HeaderTop from "@/components/HeaderTop/index";
export default {
  components: {
    HeaderTop
  },
  data() {
    return {
      title: "搜索",
      value: "",
      searchlists: ""
    };
  },
  methods: {
    async onSearch() {
      // window.console.log(this.value);
      try {
        let data = {
          module: 1,
          user_id: this.$cookies.get("userid"),
          q: this.value
        };
        const response = await GroupMall.GoodSearch(data);
        window.console.log(response.data);
        if (response.data.err_code == 0) {
          this.searchlists = response.data.data;
        } else {
          window.console.log("暂无");
        }
      } catch (error) {
        window.console.log(error.response);
      }
    },
    goodsDetails(id) {
      this.$router.push({
        name: "CommodityDetails",
        params: { id: id }
      });
    }
  },
  async created() {
    // try {
    //   let data = {
    //     module: 1,
    //     user_id: this.$cookies.get("userid")
    //   };
    //   const response = await GroupMall.getGoodSearch(data);
    //   window.console.log(response.data);
    //   this.categorys = response.data.data;
    // } catch (error) {
    //   window.console.log(error.response);
    // }
  }
};
</script>
<style lang="less" scoped>
.search {
  background-color: #fff;
}
</style>
