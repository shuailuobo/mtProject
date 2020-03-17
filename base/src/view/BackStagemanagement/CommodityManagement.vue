<template>
  <div class="container">
    <div>
      <van-tabs v-model="for_sale" @click="onClick">
        <van-tab name="1" title="出售中">
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
        </van-tab>
        <van-tab name="0" title="已下架">
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
        </van-tab>
      </van-tabs>
    </div>

    <div class="bottom">
      <p
        @click="
          $router.push({ name: 'goodspublish', query: { store_id: store_id } })
        "
      >
        添加商品
      </p>
      <p
        @click="
          $router.push({
            name: 'BatchManagement',
            query: { store_id: store_id }
          })
        "
      >
        批量管理
      </p>
    </div>
  </div>
</template>

<script>
import BackStagemanagement from "../../config/BackStagemanagement";

export default {
  data() {
    return {
      for_sale: "1",
      store_id: this.$route.query.store_id,
      goodsList: []
    };
  },
  methods: {
    onClick() {
      this.StoreGoodsLists(this.for_sale);
    },
    async StoreGoodsLists(for_sale) {
      try {
        let data = {
          user_id: this.$cookies.get("userid"),
          store_id: this.store_id,
          for_sale: for_sale
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
    this.StoreGoodsLists(this.for_sale);
  }
};
</script>

<style lang="less" scoped>
.bottom {
  position: fixed;
  bottom: 0;
  padding: 0.15rem 0.1rem;
  background: #fff;
  width: 100%;
  display: flex;
  justify-content: space-around;
}
</style>
