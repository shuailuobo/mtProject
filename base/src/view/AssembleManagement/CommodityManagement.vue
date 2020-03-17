<template>
  <div class="container">
    <div>
      <section v-for="(item, index) in goodsList" :key="index">
        <!-- type=1 秒杀：type=2 预售  type=3 折扣：type=5 热销爆款：type=4 水果 -->
        <van-card
          :price="item.price"
          :desc="
            '分类：' +
              (item.type == '1'
                ? ' 秒杀'
                : item.type == '2'
                ? '预售'
                : item.type == '3'
                ? '限时折扣'
                : item.type == '4'
                ? '水果拼团'
                : item.type == '5'
                ? '热销爆款'
                : item.type)
          "
          :title="item.name"
          :thumb="item.thumb"
          :origin-price="item.market_price"
        >
          <div slot="price-top">
            <p>状态：{{ item.for_sale == "1" ? "出售中" : "已下架" }}</p>
            <p>分配利润：￥{{ item.profit }}</p>
          </div>
          <div slot="footer">创建时间：{{ item.create_time }}</div>
        </van-card>
      </section>
    </div>

    <div class="bottom">
      <p @click="$router.push({ name: 'publish' })">
        添加商品
      </p>
      <p @click="$router.push({ name: 'AssembleBatchManagement' })">
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
      goodsList: []
    };
  },
  methods: {
    async StoreGoodsLists() {
      try {
        let data = {
          user_id: this.$cookies.get("userid")
        };
        const response = await BackStagemanagement.groupGoods(data);
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
