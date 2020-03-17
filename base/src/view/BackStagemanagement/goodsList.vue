<template>
  <div class="container">
    <section v-for="(item, index) in goodsList" :key="index">
      <van-card
        :num="item.sale_amount"
        :price="item.price"
        :desc="'分类：' + item.cat_name"
        :title="item.name"
        :thumb="item.thumb"
        :origin-price="item.market_price"
      />
    </section>
  </div>
</template>

<script>
import BackStagemanagement from "../../config/BackStagemanagement";
export default {
  data() {
    return {
      cat_id: this.$route.query.cat_id,
      store_id: this.$route.query.store_id,
      goodsList: []
    };
  },
  methods: {
    async StoreGoodsLists() {
      try {
        let data = {
          user_id: this.$cookies.get("userid"),
          store_id: this.store_id,
          cat_id: this.cat_id
        };
        const response = await BackStagemanagement.getStoreGoods(data);
        window.console.log(response.data);
        if (response.data.err_code == 0) {
          this.goodsList = response.data.data;
        }
      } catch (error) {
        window.console.log(error.response);
      }
    }
  },
  mounted() {
    this.StoreGoodsLists();
  }
};
</script>

<style lang="less" scoped></style>
