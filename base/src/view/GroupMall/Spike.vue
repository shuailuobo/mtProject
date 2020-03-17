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
      <div
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
                <!-- <h3>倒计时</h3>
                <span>23</span><i>:</i><span>12</span><i>:</i><span>22</span> -->
              </div>
            </div>
            <div class="baokuan_main_right">
              <h3>{{ msGood.name }}</h3>
              <div class="baokuanjiage">
                <span>￥{{ msGood.price }}</span
                ><i>原价￥{{ msGood.market_price }}</i>
              </div>
              <div class="baokuanzigoujiage">
                自购预估提成<span>￥{{ msGood.user_profit }}</span>
              </div>
              <h4>
                <span
                  >代理购预估提成<i>￥{{ msGood.agent_profit }}</i></span
                >
                <!-- <div>已拼{{ msGood.buy_times }}</div> -->
              </h4>
              <!-- <div class="baokuanzigoujiage">自购预估积分<span>1222</span></div> -->
              <!-- <h4>
                <span>代购预估提成<i>￥6.99</i></span>
                <div>已拼{{msGood.buy_times}}</div>
              </h4> -->
              <h4>
                <span>已拼{{ msGood.buy_times }}</span>
                <div>
                  <van-button type="default" class="mybtn">立刻抢</van-button>
                </div>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import HeaderTop from "@/components/HeaderTop/index";
import GroupMall from "../../config/GroupMall";
export default {
  components: {
    HeaderTop
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
        const response = await GroupMall.getGroupMallmsGoods();
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
.xiangqin_main {
  padding: 0 0.15rem;
}
.baokuan_main {
  height: 1.4rem;
  padding: 0.05rem 0;
  position: relative;
  border-bottom: 1px solid #eee;
  // @include bottom-border-1px(#eee);
  .baokuan_mainBox {
    height: 1.2rem;
    // display: flex;
    overflow: hidden;
    .baokuan_main_left {
      float: left;
      width: 1.2rem;
      height: 1.2rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .baokuan_main_right {
      float: left;
      padding-left: 0.155rem;
      > h3 {
        line-height: 0.2rem;
        max-width: 2.085rem;
        font-size: 0.13rem;
        font-weight: 700;
        color: #333;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .baokuanjiage {
        // margin-top: 0.125rem;
        // line-height: 0.3rem;
        span {
          font-size: 0.16rem;
          color: #f92d36;
          margin-right: 0.15rem;
        }
        i {
          font-style: normal;
          font-size: 0.1rem;
          color: #999999;
          position: relative;
          &::before {
            content: "";
            width: 100%;
            height: 0.005rem;
            background-color: #999999;
            position: absolute;
            top: 0.06rem;
            left: 0;
            transform: rotate(7deg);
            -ms-transform: rotate(7deg);
            -webkit-transform: rotate(7deg);
            -o-transform: rotate(7deg);
          }
        }
      }
      .baokuanzigoujiage {
        margin-top: 0.05rem;
        font-style: normal;
        font-size: 0.11rem;
        color: #999999;
        display: flex;
        align-items: center;

        div {
          width: 0.75rem;
          height: 0.05rem;
          border: 1px solid #fc5d65;
          border-radius: 5px;
          margin-right: 0.1rem;
          h3 {
            width: 30%;
            height: 100%;
            border-radius: 5px;
            background-color: #fc5d65;
          }
        }
        span {
          // margin-left: 0.1rem;
          color: #999999;
          font-size: 0.1rem;
        }
      }
      h4 {
        // margin-top: 0.05rem;
        font-size: 0.11rem;
        color: #666;
        line-height: 0.2rem;
        position: relative;
        span {
          i {
            font-style: normal;
            margin-left: 0.05rem;
            color: #f92d36;
          }
        }
        div {
          font-style: normal;
          position: absolute;
          top: 0;
          right: 0;
        }
      }
    }
  }
}
.daojishi {
  box-sizing: border-box;
  line-height: 0.24rem;
  padding-left: 0.15rem;
  position: absolute;
  bottom: 0.15rem;
  left: 0;
  height: 0.24rem;
  text-align: center;
  display: flex;
  width: 1.2rem;
  background-color: #fc5d65;
  font-size: 0.12rem;
  color: #fff;
  h3 {
    margin-right: 0.05rem;
  }
  i {
    font-style: normal;
    margin: 0 0.01rem;
  }
}
.mybtn {
  display: inline-block;
  position: relative;
  padding: 0;
  width: 0.6rem;
  height: 0.24rem;
  font-size: 0.12rem;
  font-weight: normal;
  line-height: 0.18rem;
  background-color: #fc5d65;
  border-radius: 4px;
  text-align: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-appearance: none;
  -webkit-text-size-adjust: 100%;
  color: #fff;
}

.van-count-down,
.van-divider {
  color: #fff;
}
</style>
