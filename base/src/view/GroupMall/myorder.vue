<template>
  <div class="container">
    <!-- <HeaderTop title="我的订单"></HeaderTop> -->
    <!-- 订单头部tab -->
    <div class="top-tab">
      <div class="Tap">
        <ul>
          <li>网购返利</li>
          <li class="white">拼团商城</li>
          <li>微店</li>
        </ul>
      </div>
    </div>
    <!-- 订单列表 -->
    <div class="bg">
      <div>
        <van-tabs @click="onClick">
          <van-tab title="有效订单">
            <!-- 列表内容 -->
            <div class="shopList">
              <div class="listA">
                <div class="img fl"></div>
                <div class="fl">
                  <p class="list-title">
                    哒哒哒哒哒哒滴滴滴滴咯咯咯咯咯过萨芬付付付付付付付付付付发放弃无法阿嘎嘎
                  </p>
                  <p>订单号：<span class="orderNum">2516132156165</span></p>
                  <p>当前状态：<span class="state">商品配送中</span></p>
                </div>
              </div>
              <div class="listB">
                <ul>
                  <li>
                    <p>付款金额</p>
                    <p class="large">¥55.00</p>
                  </li>
                  <li>
                    <p>领劵</p>
                    <p class="large">¥0.00</p>
                  </li>
                  <li>
                    <p>预估补贴</p>
                    <p class="large">¥1.73</p>
                  </li>
                  <p id="dataTime">2018-11-09 15-26-14 创建</p>
                </ul>
              </div>
              <div class="xian"></div>
              <div class="listC">
                <div class="button">申请退款</div>
                <div class="button">确认收货</div>
              </div>
            </div>
            <div class="shopList">
              <div class="listA">
                <div class="img fl"></div>
                <div class="fl">
                  <p class="list-title">
                    哒哒哒哒哒哒滴滴滴滴咯咯咯咯咯过萨芬付付付付付付付付付付发放弃无法阿嘎嘎
                  </p>
                  <p>订单号：<span class="orderNum">2516132156165</span></p>
                  <p>当前状态：<span class="state">已完成</span></p>
                </div>
              </div>
              <div class="listB">
                <ul>
                  <li>
                    <p>付款金额</p>
                    <p class="large">¥55.00</p>
                  </li>
                  <li>
                    <p>领劵</p>
                    <p class="large">¥0.00</p>
                  </li>
                  <li>
                    <p>预估补贴</p>
                    <p class="large">¥1.73</p>
                  </li>
                  <p id="dataTime">2018-11-09 15-26-14 创建</p>
                </ul>
              </div>
              <div class="xian"></div>
              <div class="listC">
                <div class="button" @click="pinglun">发表评价</div>
                <!-- <div class="button">确认收货</div> -->
              </div>
            </div>
          </van-tab>
          <van-tab title="失效订单">
            2<br />
            2<br />
            2<br />
          </van-tab>
        </van-tabs>
      </div>
    </div>
    <!-- 底部固定 -->
    <div class="footer">
      <p>
        累计领优惠券<span class="red">156.24</span>元，累计提现<span class="red"
          >98.14</span
        >元
      </p>
    </div>
  </div>
</template>

<script>
import HeaderTop from "@/components/HeaderTop/index";
import { Tab, Tabs } from "vant";

export default {
  name: "MyOrder",
  components: {
    HeaderTop,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs
  },
  data() {
    return {};
  },
  methods: {
    onClick(index, title) {
      //   this.$toast(title)
    },
    pinglun() {
      this.$router.push({ path: "/evaluation" });
    }
  }
};
</script>

<style lang="less" scoped>
.fl {
  float: left;
}
.top-tab {
  width: 3.75rem;
  height: 0.49rem;
  overflow: hidden;
  background-color: #fc5d65;
  .Tap {
    width: 2.25rem;
    height: 0.3rem;
    border: 0.01rem solid #fff;
    border-radius: 0.15rem;
    box-sizing: border-box;
    margin: 0.095rem auto;
    ul {
      display: flex;
      justify-content: space-around;
      li {
        text-align: center;
        width: 0.75rem;
        height: 0.3rem;
        line-height: 0.3rem;
        color: #fff;
        font-family: PingFangSC-Regular;
      }
      .white {
        background-color: #fff;
        color: #fc5d65;
      }
    }
  }
}
.shopList {
  width: 3.75rem;
  height: 1.9rem;
  padding: 0.095rem 0.15rem 0.07rem;
  background-color: #fff;
  margin-bottom: 0.1rem;
  box-sizing: border-box;
  .listA {
    height: 0.5rem;
    .img {
      width: 0.5rem;
      height: 0.5rem;
      margin-right: 0.115rem;
      background: url("../../assets/MyOrder/ping@2x.png");
      // @include bg-image("../../assets/MyOrder/ping");
      background-size: cover;
    }
    p {
      color: #666;
      font-size: 0.1rem;
      margin-bottom: 0.03rem;
    }
    .list-title {
      width: 2.825rem;
      height: 0.15rem;
      font-size: 0.13rem;
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
      line-height: 0.11rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  .listB {
    height: 0.75rem;
    li {
      float: left;
      width: 1.15rem;
      text-align: center;
      p {
        color: #333;
        font-size: 0.12rem;
        font-weight: 600;
        line-height: 0.3rem;
      }
      .large {
        font-size: 0.16rem;
      }
    }
  }
  .xian {
    width: 3.6rem;
    height: 0.01rem;
    background-color: #f2f2f2;
    margin-top: 0.14rem;
  }
  .listC {
    height: 0.4rem;
    .button {
      width: 0.69rem;
      height: 0.26rem;
      line-height: 0.24rem;
      text-align: center;
      float: right;
      font-size: 0.12rem;
      margin: 0.07rem 0 0 0.095rem;
      border: 1px solid rgba(203, 203, 203, 1);
      border-radius: 0.04rem;
    }
  }
}
.orderNum {
  color: #333;
}
.state {
  color: #fc5d65;
}
#dataTime {
  color: #666;
  font-size: 0.1rem;
  text-align: right;
}
.bg {
  background-color: #f8f8f8;
}
.footer {
  position: fixed;
  bottom: 0;
  width: 3.75rem;
  height: 0.5rem;
  line-height: 0.5rem;
  background-color: #fff;
  p {
    color: #333;
    font-size: 0.12rem;
    text-align: center;
    .red {
      color: #f92d36;
      font-size: 0.14rem;
    }
  }
}
</style>
