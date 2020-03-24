<template>
  <div class="miaosha container">
    <!-- <HeaderTop :title="title"></HeaderTop> -->
    <section>
      <div v-if="nogoods">暂无商品</div>
      <!-- <div class="xiangqin_main">
        <div class="baokuan_main">
          <div class='baokuan_mainBox'>
            <div class="baokuan_main_left">
              <img
                :src=""
                alt=""
              > 
              <div class="daojishi">
                <h3>倒计时</h3>
                <span>23</span><i>:</i><span>12</span><i>:</i><span>22</span>
              </div>
            </div>
            <div class="baokuan_main_right">
              <h3>麻辣多拿红油面皮网红方便面盒装非油炸陕西干拌面宽泡面速食凉皮</h3>
              <div class="baokuanjiage"><span>￥1099</span><i>原价￥1599.00</i></div>
              <div class="baokuanzigoujiage">
                <div>
                  <h3></h3>
                </div><span>已抢1222</span>
              </div>
              <h4><span>满500减90</span>
                <div>
                  <van-button
                    type="default"
                    class="mybtn"
                  >立刻抢</van-button>
                </div>
              </h4>
            </div>
          </div>
        </div>
      </div> -->

      <groupMallCardThird :Good="msGoods" />
      <!-- <div
        class="xiangqin_main"
        v-for="(msGood, index) in msGoods"
        :key="index"
      >
        <div
          class="baokuan_main"
          @click="
            $router.push({
              name: 'CommodityDetails',
              params: { id: msGood.id }
            })
          "
        >
          <div class="baokuan_mainBox">
            <div class="baokuan_main_left">
              <img :src="msGood.thumb" alt="" />
              <div class="daojishi">
                <van-count-down
                  format="DD天HH:mm:ss"
                  :time="msGood.expire_time"
                />
              </div>
            </div>
            <div class="baokuan_main_right">
              <h3>{{ msGood.name }}</h3>
              <div class="baokuanjiage">
                <span>￥{{ msGood.price }}</span
                ><i>原价￥{{ msGood.market_price }}</i>
              </div>
              <div class="baokuanzigoujiage">
                自购预估积分<span>{{ msGood.user_profit }}</span>
              </div>
              <h4>
                <span
                  >代理购预估提成<i>￥{{ msGood.agent_profit }}</i></span
                >
              </h4>
              <h4>
                <span>已拼{{ msGood.buy_times }}</span>
                <div>
                  <van-button type="default" class="mybtn">立刻抢</van-button>
                </div>
              </h4>
            </div>
          </div>
        </div>
      </div> -->
    </section>
  </div>
</template>
<script>
// import HeaderTop from "@/components/HeaderTop/index";
import groupMallCardThird from "../../components/groupMallCardThird";
import GroupMall from "../../config/GroupMall";
export default {
  components: {
    groupMallCardThird
  },
  data() {
    return {
      title: "限时秒杀",
      msGoods: "",
      djsgoods: "",
      nogoods: false
    };
  },
  mounted() {
    this.getGroupMallmsGoodsList();
  },
  methods: {
    async getGroupMallmsGoodsList() {
      try {
        const response = await GroupMall.getGroupMallysGoods(
          this.$route.query.type
        );
        window.console.log(response.data.data);
        // this.djsgoods = response.data.data;
        if (response.data.data.length > 0) {
          this.djsgoods = response.data.data;
        } else {
          this.nogoods = true;
        }

        for (var key in response.data.data) {
          this.getdjsTimes(response.data.data[key].expire_time, key);
        }
      } catch (error) {
        // window.console.log(error.response);
      }
    },
    getdjsTimes(time, key) {
      const nowDate = new Date().getTime();
      const oldTime = new Date(time.replace(/-/g, "/")).getTime();
      this.djsgoods[key].expire_time = oldTime - nowDate;
      window.console.log(this.djsgoods);
      this.msGoods = this.djsgoods;
      // this.$refs.countDown.start();
    }
  }
};
</script>

<style lang="less" scoped>
.miaosha {
  background-color: #fff;
}
</style>
