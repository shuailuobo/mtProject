<template>
  <div>
    <section class="rexiao_main" v-for="(ysGood, index) in Good" :key="index">
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
      </van-card>
    </section>
  </div>
</template>

<script>
export default {
  name: "groupMallCard",
  props: {
    Good: Array
  }
};
</script>

<style lang="less" scoped>
.van-card__price {
  color: red;
  font-size: 0.14rem;
  font-weight: 600;
}

.van-card__title {
  color: #333;
  font-size: 0.13rem;
  font-weight: 600;
}

.rexiao {
  box-sizing: border-box;
  padding: 0 0.155rem;
}

.rexiao_main {
  margin-bottom: 0.1rem;
}
</style>
