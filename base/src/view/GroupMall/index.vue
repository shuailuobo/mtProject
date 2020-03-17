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
            <router-link to="/spike">
              <img src="../../assets/GroupMall/xmiaosha@3x.png" alt />
              <h3>限时秒杀</h3>
            </router-link>
          </li>
          <li>
            <router-link to="/advancesale">
              <img src="../../assets/GroupMall/xyushou@3x.png" alt />
              <h3>限时预售</h3>
            </router-link>
          </li>
          <li>
            <router-link to="/discount">
              <img src="../../assets/GroupMall/xzhekou@3x.png" alt />
              <h3>限时折扣</h3>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'FruitBlending' }">
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
            <span>{{ message.title }}</span>
          </van-swipe-item>
        </van-swipe>
      </div>
    </section>
    <!-- 预售开始 -->
    <section>
      <van-cell value="查看更多" is-link to="/advancesale">
        <!-- 使用 title 插槽来自定义标题 -->
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
        <!-- <header class="rexiao_header">
          <img src="../../assets/GroupMall/rexiao@3x.png" alt />
          <h3>限时预售</h3>
          <p style="float:right;">查看更多</p>
        </header> -->
        <div
          class="rexiao_main"
          v-for="(ysGood, index) in ysGoods"
          :key="index"
        >
          <div
            class="rexiao_mainBox"
            @click="
              $router.push({
                name: 'CommodityDetails',
                params: { id: ysGood.id }
              })
            "
          >
            <div class="rexiao_main_left">
              <img :src="ysGood.thumb" :alt="ysGood.name" />
            </div>
            <div class="rexiao_main_right">
              <h3>{{ ysGood.name }}</h3>
              <div class="jiage">
                <span>￥{{ ysGood.price }}</span>
                <i>原价￥{{ ysGood.market_price }}</i>
              </div>
              <div class="zigoujiage">
                自购预估提成<span>￥{{ ysGood.user_profit }}</span>
              </div>
              <h4>
                <span
                  >代理购预估提成<i>￥{{ ysGood.agent_profit }}</i></span
                >
                <div>已拼{{ ysGood.buy_times }}</div>
              </h4>
            </div>
          </div>
          <div class="rexiao_flooter">
            <h3>距离活动结束</h3>
            <van-count-down format="DD天HH:mm:ss" :time="ysGood.expire_time" />
            <!-- <div>{{ysGood.period_hour}}</div> -->
            <!-- <div><span>24</span><i>:</i><span>54</span><i>:</i><span>36</span></div> -->
          </div>
        </div>
      </div>
    </section>
    <!-- 爆款开始 bkGoods -->
    <section>
      <div class="baokuan">
        <header class="baokuan_header">
          <div></div>
          <h3>热销爆款</h3>
        </header>
        <div
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
              <!-- <div class="baokuanzigoujiage">已拼{{ bkGood.buy_times }}</div> -->
              <div class="baokuanzigoujiage">
                自购预估提成<span>￥{{ bkGood.user_profit }}</span>
              </div>
              <h4>
                <span
                  >代理购预估提成<i>￥{{ bkGood.agent_profit }}</i></span
                >
                <div>已拼{{ bkGood.buy_times }}</div>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- 推荐开始 remGoods -->
    <section>
      <div class="baokuan">
        <header class="baokuan_header">
          <div></div>
          <h3>为您推荐</h3>
        </header>
        <div
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
              <!-- <div class="baokuanzigoujiage">已拼{{ remGood.buy_times }}</div> -->
              <div class="baokuanzigoujiage">
                自购预估提成<span>￥{{ remGood.user_profit }}</span>
              </div>
              <h4>
                <span
                  >代理购预估提成<i>￥{{ remGood.agent_profit }}</i></span
                >
                <div>已拼{{ remGood.buy_times }}</div>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import GroupMall from "../../config/GroupMall";
import publish from "../../config/publish";
export default {
  name: "GroupMall",
  components: {},
  data() {
    return {
      categorys: {},
      banners: {},
      messages: {},
      bkGoods: {},
      ysGoods: {},
      djsgoods: {},
      remGoods: {},
      head_img_url: "",
      nickname: ""
    };
  },
  async created() {
    //linshi tag
    publish.firstRes(this);
    // this.$cookies.set("userid", "582");
    // var code = this.getUrlParam("code");
    // window.console.log(code);
    // var local = encodeURIComponent(window.location.href);
    // if (code == null || code == "") {
    //   let scope = "snsapi_userinfo"; //snsapi_userinfo   //获取微信信息
    //   let appid = "wxd2dabcb848f0aa1a";
    //   window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${local}&response_type=code&scope=${scope}&state=state#wechat_redirect`;
    // } else {
    //   this.code = code;
    //   this.getopenid_data(this.code);
    // }

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
      this.messages = response.data.data;
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
      const response = await GroupMall.getGroupMallbkGoods();
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
    // getCategory() {
    //   this.$router.push({ path: "/search" });
    // },
    async getGroupMallysGoodsList() {
      try {
        const response = await GroupMall.getGroupMallysGoods();
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
    // // 请求openid的方法，需要后端写法
    // getopenid_data(data) {
    //   this.$http
    //     .get("/member/open_id?code=" + data, {})
    //     .then(res => {
    //       window.console.log(res.data);
    //       if (res.data.err_code == 0) {
    //         this.user_info(res.data.data.open_id);
    //         this.head_img_url = res.data.data.head_img_url;
    //         this.nickname = res.data.data.nickname;
    //       } else {
    //         window.console.log(res.data.err_msg);
    //       }
    //     })
    //     .catch(err => {
    //       window.console.log(err);
    //       // alert("请求失败");
    //     });
    // },
    // // 注册 open_id,phone,username,email
    // register(open_id) {
    //   this.$http
    //     .post("/member/register", {
    //       open_id: open_id,
    //       head_img_url: this.head_img_url,
    //       nickname: this.nickname
    //     })
    //     .then(res => {
    //       window.console.log(res);
    //       if (res.data.err_code == 0) {
    //         this.$cookies.set("userid", res.data.data.id); //return this
    //         localStorage.setItem("head_img_url", res.data.data.head_img_url);
    //         localStorage.setItem("nickname", res.data.data.nickname);
    //       }
    //     })
    //     .catch(err => {
    //       window.console.log(err);
    //       // alert("请求失败");
    //     });
    // },
    // //查询是否注册
    // user_info(open_id) {
    //   this.$http
    //     .post("/member/info", {
    //       open_id: open_id
    //     })
    //     .then(res => {
    //       window.console.log(res.data);
    //       if (res.data.err_code == 1) {
    //         this.register(open_id);
    //       } else if (res.data.err_code == 0) {
    //         this.$cookies.set("userid", res.data.data.id); //return this
    //         localStorage.setItem("head_img_url", res.data.data.head_img_url);
    //         localStorage.setItem("nickname", res.data.data.nickname);
    //       }
    //     })
    //     .catch(err => {
    //       window.console.log(err);
    //       // alert("请求失败");
    //     });
    // },
    // getUrlParam(name) {
    //   var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    //   let url = window.location.href.split("#")[0];
    //   let search = url.split("?")[1];
    //   if (search) {
    //     var r = search.substr(0).match(reg);
    //     if (r !== null) return unescape(r[2]);
    //     return null;
    //   } else {
    //     return null;
    //   }
    // }
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
    padding: 0.1rem 0;
    position: relative;
    border-bottom: 1px solid #eee;
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
    height: 0.6rem;
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
