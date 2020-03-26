<template>
  <div class="shouye container">
    <!-- <HeaderTop title="拼团商城"></HeaderTop> -->
    <!-- 分类选择开始 -->
    <section>
      <ul class="classification">
        <li v-for="(category, index) in categorys" :key="index">
          <p
            @click="catGroupGoodsTap(category.id)"
            :class="category.id == 1 ? 'active' : ' '"
          >
            {{ category.name }}
          </p>
        </li>
        <li>
          <van-icon
            style="line-height: 0.4rem;"
            name="search"
            size="24px"
            color="#FC5D65"
            @click="goSearch"
          />
          <!-- <a href="javaScript:;" class="search" @click="goSearch"></a> -->
        </li>
      </ul>
    </section>
    <!-- 图片轮播  470.66  221  415.19 -->
    <section>
      <div class="scolls">
        <van-swipe
          :autoplay="3000"
          indicator-color="#FC5D65"
          show-indicators
          touchable
        >
          <van-swipe-item v-for="(banner, index) in banners" :key="index">
            <img :src="banner.image" :alt="banner.title" />
          </van-swipe-item>
        </van-swipe>
      </div>
    </section>
    <!-- 简介开始 -->
    <section>
      <div class="jieshao">
        <ul>
          <li>
            <span></span>
            <a href="#">生鲜健康</a>
          </li>
          <li>
            <span></span>
            <a href="#">品质保证</a>
          </li>
          <li>
            <span></span>
            <a href="#">产地直供</a>
          </li>
        </ul>
      </div>
    </section>
    <!-- 秒杀开始 -->
    <section>
      <div class="miaosha">
        <ul>
          <li>
            <!-- 预售：type=1 秒杀：type=2 预售  type=3 折扣：type=5 热销爆款：type=4 水果 -->
            <router-link :to="{ name: 'spike', query: { type: 1 } }">
              <img src="../../assets/GroupMall/xmiaosha@3x.png" alt />
              <h3>限时秒杀</h3>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'spike', query: { type: 2 } }">
              <img src="../../assets/GroupMall/xyushou@3x.png" alt />
              <h3>限时预售</h3>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'spike', query: { type: 3 } }">
              <img src="../../assets/GroupMall/xzhekou@3x.png" alt />
              <h3>限时折扣</h3>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'spike', query: { type: 4 } }">
              <img src="../../assets/GroupMall/shuiguo@3x.png" alt />
              <h3>水果拼团</h3>
            </router-link>
          </li>
        </ul>
      </div>
    </section>
    <!-- 公告开始 -->
    <section>
      <div class="gonggao">
        <img src="../../assets/GroupMall/gg@3x.png" alt />
        <van-swipe
          class="exchange_article"
          :vertical="true"
          :autoplay="3000"
          :duration="2000"
          indicator-color="transparent"
        >
          <van-swipe-item v-for="(message, index) in messages" :key="index">
            <span style="font-size:0.14rem;color:#666;">{{
              message.title
            }}</span>
          </van-swipe-item>
        </van-swipe>
      </div>
    </section>
    <!-- 预售开始 -->
    <section>
      <!-- <van-cell value="查看更多" is-link to="/advancesale" > -->
      <van-cell
        value="查看更多"
        is-link
        :to="{ name: 'spike', query: { type: 2 } }"
      >
        <template slot="title">
          <img
            style="width:0.15rem;height:auto;vertical-align:middle;margin-right:0.05rem;"
            src="../../assets/GroupMall/rexiao@3x.png"
            alt
          />
          <span class="custom-title">限时预售</span>
        </template>
      </van-cell>
      <div class="rexiao">
        <groupMallCard :Good="ysGoods" />
      </div>
    </section>
    <!-- 爆款开始 bkGoods -->
    <section>
      <div class="baokuan">
        <header class="baokuan_header">
          <div></div>
          <h3>热销爆款</h3>
        </header>
        <groupMallCardSecond :Good="bkGoods" />
        <!-- <div
          class="baokuan_main"
          v-for="(bkGood, index) in bkGoods"
          :key="index"
        >
          <div
            class="baokuan_mainBox"
            @click="
              $router.push({
                name: 'CommodityDetails',
                params: { id: bkGood.id }
              })
            "
          >
            <div class="baokuan_main_left">
              <img :src="bkGood.thumb" :alt="bkGood.name" />
            </div>
            <div class="baokuan_main_right">
              <h3>{{ bkGood.name }}</h3>
              <div class="baokuanjiage">
                <span>￥{{ bkGood.price }}</span>
                <i>原价￥{{ bkGood.market_price }}</i>
              </div>
              <div class="baokuanzigoujiage">
                自购预估积分<span>{{ bkGood.user_profit }}</span>
              </div>
              <h4>
                <span
                  >代理购预估提成<i>￥{{ bkGood.agent_profit }}</i></span
                >
                <div>已拼{{ bkGood.buy_times }}</div>
              </h4>
            </div>
          </div>
        </div> -->
      </div>
    </section>
    <!-- 推荐开始 remGoods -->
    <section>
      <div class="baokuan">
        <header class="baokuan_header">
          <div></div>
          <h3>为您推荐</h3>
        </header>
        <groupMallCardSecond :Good="remGoods" />
        <!-- <div
          class="baokuan_main"
          v-for="(remGood, index) in remGoods"
          :key="index"
        >
          <div
            class="baokuan_mainBox"
            @click="
              $router.push({
                name: 'CommodityDetails',
                params: { id: remGood.id }
              })
            "
          >
            <div class="baokuan_main_left">
              <img :src="remGood.thumb" :alt="remGood.name" />
            </div>
            <div class="baokuan_main_right">
              <h3>{{ remGood.name }}</h3>
              <div class="baokuanjiage">
                <span>￥{{ remGood.price }}</span>
                <i>原价￥{{ remGood.market_price }}</i>
              </div>
              <div class="baokuanzigoujiage">
                自购预估积分<span>{{ remGood.user_profit }}</span>
              </div>
              <h4>
                <span
                  >代理购预估提成<i>￥{{ remGood.agent_profit }}</i></span
                >
                <div>已拼{{ remGood.buy_times }}</div>
              </h4>
            </div>
          </div>
        </div> -->
      </div>
    </section>
  </div>
</template>

<script>
import GroupMall from "../../config/GroupMall";
import publish from "../../config/publish";
import groupMallCard from "../../components/groupMallCard";
import groupMallCardSecond from "../../components/groupMallCardSecond";
export default {
  name: "GroupMall",
  components: {
    groupMallCard: groupMallCard,
    groupMallCardSecond: groupMallCardSecond
  },
  data() {
    return {
      categorys: {},
      banners: {},
      messages: [],
      bkGoods: {},
      ysGoods: {},
      djsgoods: {},
      remGoods: {},
      head_img_url: "",
      nickname: ""
    };
  },
  async created() {
    //获取userid
    publish.firstRes(this);

    try {
      const response = await GroupMall.getCategory();
      window.console.log(response.data);
      this.categorys = response.data.data.slice(1, 6);
      window.console.log(this.categorys);
    } catch (error) {
      window.console.log(error.response);
    }

    try {
      const response = await GroupMall.getGroupMallBanner();
      window.console.log(response.data);
      this.banners = response.data.data;
    } catch (error) {
      window.console.log(error.response);
    }

    try {
      const response = await GroupMall.getGroupMallMessage();
      window.console.log(response.data);
      this.messages = response.data.data.reverse();
    } catch (error) {
      window.console.log(error.response);
    }

    // 为你推荐
    try {
      let data = {
        cat_id: 1
      };
      const response = await GroupMall.catGroupGoods(data);
      window.console.log(response.data);
      this.remGoods = response.data.data;
    } catch (error) {
      window.console.log(error.response);
    }

    try {
      const response = await GroupMall.getGroupMallysGoods("5");
      window.console.log(response.data);
      this.bkGoods = response.data.data;
    } catch (error) {
      window.console.log(error.response);
    }
  },
  mounted() {
    this.getGroupMallysGoodsList();
  },
  methods: {
    catGroupGoodsTap(id) {
      this.$router.push({ name: "CategorizedGoods", query: { id: id } });
    },
    goSearch() {
      this.$router.push({ path: "/search" });
    },
    async getGroupMallysGoodsList() {
      try {
        const response = await GroupMall.getGroupMallysGoods("2");
        window.console.log(response.data);
        if (response.data.data.length > 0) {
          this.djsgoods = response.data.data.slice(0, 3);
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
      // window.console.log(this.djsgoods);
      this.ysGoods = this.djsgoods;
      // this.$refs.countDown.start();
    }
  }
};
</script>

<style lang="less" scoped>
.shouye {
  background-color: #fff;
}
.classification {
  height: 0.4rem;
  display: flex;
  justify-content: space-around;
  > li {
    line-height: 100%;
    .active {
      color: #fc5d65;
      position: relative;
      &::before {
        content: "";
        width: 0.3rem;
        height: 0.01rem;
        position: absolute;
        bottom: 6px;
        left: 8px;
        background-color: #fc5d65;
      }
    }
    .search {
      // transform: translate(-21%, 87%);
      width: 0.16rem;
      height: 0.16rem;
      background: url(../../assets/GroupMall/search@2x.png) no-repeat;
      background-size: 100% 100%;
      margin-top: 0.13rem;
    }
    > p {
      display: block;
      font-size: 0.12rem;
      height: 100%;
      line-height: 0.4rem;
      color: #333333;
      // &:last-child{
      //   width: 0.32rem;
      //   height: 0.32rem;
      // }
    }
  }
}
.scolls {
  height: 1.6rem;
  width: 100%;
  img {
    width: 100%;
    height: 100%;
  }
}
.jieshao {
  height: 0.2rem;
  width: 100%;
  > ul {
    display: flex;
    > li {
      text-align: center;
      width: 33.33%;
      > span {
        display: inline-block;
        width: 0.1rem;
        height: 0.1rem;
        background-size: cover;
        margin-right: 0.05rem;
        background: url("../../assets/GroupMall/gou.png");
        // @include bg-image("../../assets/GroupMall/gou");
      }
      > a {
        font-size: 0.1rem;
        color: #333;
      }
    }
  }
}
.miaosha {
  width: 100%;
  height: 1.1rem;
  border-top: 1px solid #eee;
  // @include top-border-1px(#eee);
  > ul {
    display: flex;
    height: 100%;
    justify-content: space-between;
    align-items: Center;
    > li {
      width: 25%;
      text-align: center;
      > a {
        display: block;
        // height: 100%;
        // line-height: 2.2rem;
        > img {
          width: 0.415rem;
          height: 0.405rem;
        }
        > h3 {
          font-weight: Regular;
          font-size: 0.14rem;
          margin-top: 0.05em;
          color: rgba(51, 51, 51, 1);
        }
      }
    }
  }
}
.gonggao {
  width: 100%;
  height: 0.4rem;
  background-color: #f8f8f8;
  display: flex;
  align-items: center;
  > img {
    width: 0.3rem;
    height: 0.185rem;
    margin-left: 0.155rem;
  }
  > a {
    margin-left: 0.3rem;
    font-size: 0.14rem;
    i {
      font-style: normal;
      margin-right: 0.05rem;
      color: #333;
    }
    span {
      color: #333;
    }
  }
}
.rexiao {
  box-sizing: border-box;
  padding: 0 0.155rem;
  .rexiao_header {
    height: 0.6rem;
    display: flex;
    align-items: center;
    > img {
      width: 0.15rem;
      height: 0.15rem;
    }
    h3 {
      margin-left: 0.05rem;
      font-weight: bold;
      font-size: 0.14rem;
      color: #333;
    }
  }
  .rexiao_main {
    // height: 1.7rem;
    padding: 0.05rem 0;
    position: relative;
    // border-bottom: 1px solid #eee;
    // @include bottom-border-1px(#eee);
    .rexiao_mainBox {
      height: 1.2rem;
      display: flex;
      justify-content: flex-start;
      overflow: hidden;
      .rexiao_main_left {
        // float: left;
        width: 1.2rem;
        height: 1.2rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .rexiao_main_right {
        // float: left;
        padding-left: 0.1rem;
        width: 2.3rem;
        > h3 {
          line-height: 0.3rem;
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
        .jiage {
          line-height: 0.2rem;
          // margin-top: 0.125rem;
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
        .zigoujiage {
          // margin-top: 0.05rem;
          line-height: 0.25rem;
          font-style: normal;
          font-size: 0.11rem;
          color: #999999;
          span {
            margin-left: 0.05rem;
            color: #f92d36;
          }
        }
        h4 {
          // margin-top: 0.05rem;
          line-height: 0.25rem;
          font-size: 0.11rem;
          color: #999999;
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
    .rexiao_flooter {
      display: flex;
      margin-left: 1.3rem;
      // position: absolute;
      // left: 1.35rem;
      // bottom: 0.11rem;
      h3 {
        font-size: 0.12rem;
        color: #999999;
        margin-right: 0.1rem;
        line-height: 0.2rem;
      }
      div {
        span {
          display: inline-block;
          width: 0.2rem;
          height: 0.2rem;
          background-color: #000;
          color: #fff;
          margin: 0 0.05rem;
          text-align: center;
        }
        i {
          font-style: normal;
        }
      }
    }
  }
}
.baokuan {
  box-sizing: border-box;
  padding: 0 0.155rem;
  .baokuan_header {
    height: 0.4rem;
    display: flex;
    align-items: center;
    div {
      width: 0.02rem;
      height: 0.14rem;
      background-color: #fc5d65;
      margin-right: 0.055rem;
      transform: translate(0, 0.01rem);
    }
    h3 {
      font-size: 0.14rem;
      font-weight: 700;
    }
  }
  .baokuan_main {
    height: 1.4rem;
    padding: 0.05rem 0;
    position: relative;
    border-bottom: 1px solid #eee;
    // @include bottom-border-1px(#eee);
    .baokuan_mainBox {
      height: 1.2rem;
      display: flex;
      justify-content: flex-start;
      overflow: hidden;
      .baokuan_main_left {
        // float: left;
        width: 1.2rem;
        height: 1.2rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .baokuan_main_right {
        // float: left;
        padding-left: 0.1rem;
        width: 2.3rem;
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
          margin-top: 0.125rem;
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
              height: 1px;
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
          span {
            margin-left: 0.05rem;
            color: #f92d36;
          }
        }
        h4 {
          margin-top: 0.05rem;
          font-size: 0.11rem;
          color: #999999;
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
}

.exchange_article {
  width: 3rem;
  height: 0.4rem;
  margin-left: 0.2rem;
  .van-swipe-item {
    width: 100%;
    height: 0.4rem;
    line-height: 0.4rem;
  }
}
</style>
