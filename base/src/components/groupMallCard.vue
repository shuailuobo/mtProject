<template>
  <div>
    <section
      class="rexiao_main"
      v-for="(ysGood, index) in ysGoods"
      :key="index"
    >
      <van-card
        @click="
          $router.push({
            name: 'CommodityDetails',
            params: { id: ysGood.id }
          })
        "
        :price="ysGood.price"
        :origin-price="ysGood.market_price"
        :title="ysGood.name"
        :thumb="ysGood.thumb"
      >
        <div slot="price-top">
          <div>
            自购预估积分<span style="color:red;">{{ ysGood.user_profit }}</span>
          </div>
          <div style="display:flex;justify-content: space-between;">
            <p>
              代理购预估提成<i style="color:red;font-style: normal;"
                >￥{{ ysGood.agent_profit }}</i
              >
            </p>
            <p>已拼{{ ysGood.buy_times }}</p>
          </div>
        </div>
        <div slot="bottom" style="display:flex;">
          <p>距离活动结束：</p>
          <van-count-down
            style="font-size:0.13rem;"
            format="DD天HH:mm:ss"
            :time="ysGood.expire_time"
          />
        </div>
      </van-card>
    </section>
  </div>
</template>

<script>
export default {
  name: "groupMallCard",
  components: {},
  data() {
    return {};
  },
  props: ["ysGoods"],
  created() {}
};
</script>

<style lang="less" scoped></style>
