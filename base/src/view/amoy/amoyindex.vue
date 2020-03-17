<template>
  <!-- 淘客首页 -->
  <div class="container">
    <!-- <HeaderTop :title="title"></HeaderTop> -->
    <div id="allmap"></div>
    <!-- banner -->
    <van-swipe :autoplay="3000" indicator-color="white" :height="150">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image" />
      </van-swipe-item>
    </van-swipe>

    <!-- search -->
    <div class="search" @click="searchTap()">
      <input type="text" placeholder="搜索商品关键字或标题" disabled />
      <img src="../../assets/amoy/search.png" alt="" />
    </div>
    <!-- 合作平台logos -->
    <div class="cooperation">
      <ul>
        <li class="tq">
          <img src="../../assets/amoy/tq.png" alt="" />
          <p>淘券</p>
        </li>
        <li class="jd">
          <img src="../../assets/amoy/jd.png" alt="" />
          <p>京东</p>
        </li>
        <li class="wph">
          <img src="../../assets/amoy/wph.png" alt="" />
          <p>唯品会</p>
        </li>
        <li class="pdd">
          <img src="../../assets/amoy/pdd.png" alt="" />
          <p>拼多多</p>
        </li>
      </ul>
    </div>
    <!-- 教程指南 -->
    <div class="course">
      <img src="../../assets/amoy/xsjc.png" alt="" />
      <img src="../../assets/amoy/tgzn.png" alt="" />
    </div>
    <!--导航条-->
    <div>
      <div class="navbar">
        <p
          v-for="(item, index) in navbar"
          :key="index"
          @click="navbarTap(index)"
          :class="['item', currentTab == index ? 'active' : '']"
        >
          {{ item }}
        </p>
        <img src="../../assets/amoy/more.png" alt="" />
      </div>

      <div class="screenconditions">
        <ul
          v-for="(item, index) in screen"
          :key="index"
          @click="screenTap(index, item.sctype)"
          :class="['item', sccurrentTab == index ? 'scactive' : '']"
        >
          <li>{{ item.screenconditions }}</li>
        </ul>
      </div>
    </div>
    <!--全部-->
    <div v-if="currentTab === 0">
      <div class="container-body">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div
            class="order-list"
            v-for="(item, index) in myorderlist"
            :key="index"
            @click="shopdetail(item.id)"
          >
            <div class="goods">
              <div class="goodsdetail">
                <div class="r_goods_div ">
                  <img :src="item.src" alt="" />
                  <div class="r_goods_coupon">{{ item.coupon }}</div>
                </div>
                <div class="goodstitle">
                  <p>
                    <img :src="item.fromsrc" alt="" />
                    {{ item.name }}
                  </p>
                  <p>
                    券后￥{{ item.price }} <i>原价￥{{ item.oldprice }}</i>
                  </p>
                  <p>
                    自购预估补贴：<span>￥{{ item.subsidy }}</span>
                  </p>
                  <p>
                    代理预估提成：<span>￥{{ item.royalty }}</span>
                  </p>
                  <div class="goodsbtn">
                    <span>销量：{{ item.sales }}</span>
                    <button>点击领券</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </van-list>
      </div>
    </div>

    <!--美妆-->
    <div v-if="currentTab === 1">
      <div class="container-body">
        <div class="">
          <div
            class="order-list"
            @click="orderDetailTap(item.id)"
            v-for="(item, index) in myinvalidorderlist"
            :key="index"
          >
            <div class="goods">
              <div class="goodsdetail">
                <div>
                  <img :src="item.src" alt="" />
                </div>
                <div class="goodstitle">
                  <p>{{ item.name }}</p>
                  <p>订单号：{{ item.orderid }}</p>
                  <p>
                    当前状态：<span>{{ item.status }}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import HeaderTop from "../../components/HeaderTop/index";
import { Swipe, SwipeItem, List, Cell } from "vant";
export default {
  components: {
    HeaderTop,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [List.name]: List,
    [Cell.name]: Cell
  },
  name: "micro-shop",
  data() {
    return {
      condition: 0,
      navbar: ["全部", "美妆", "居家", "办公", "零食"],
      currentTab: 0,
      sccurrentTab: 0,
      sctype: 0,
      screen: [
        {
          screenconditions: "默认",
          sctype: "a"
        },
        {
          screenconditions: "销量",
          sctype: "b"
        },
        {
          screenconditions: "最热",
          sctype: "c"
        },
        {
          screenconditions: "价格",
          sctype: "d"
        }
      ],
      code: "",
      token: "",
      title: "蓝鲸生活优惠返券",
      current: 0,
      images: [require("../../assets/amoy/banner.png")],
      myorderlist: [
        {
          id: "1",
          src: require("../../assets/amoy/img1.png"),
          fromsrc: require("../../assets/amoy/xjd.png"),
          name: "2018秋冬新款半高领修身显瘦连衣裙女腰带针织中长款网纱裙...",
          price: "1599",
          oldprice: "1899",
          subsidy: "15",
          royalty: "1.5",
          coupon: "50元优惠券",
          sales: "159"
        },
        {
          id: "2",
          src: require("../../assets/amoy/img2.png"),
          fromsrc: require("../../assets/amoy/xtb.png"),
          name:
            "宜兴紫砂水缸饮水机大号无釉储水缸 过滤内胆净水机双层水缸双层水缸.",
          price: "1599",
          oldprice: "1899",
          subsidy: "15",
          royalty: "1.5",
          coupon: "40元优惠券",
          sales: "159"
        },
        {
          id: "3",
          src: require("../../assets/amoy/img1.png"),
          fromsrc: require("../../assets/amoy/xjd.png"),
          name: "纯进口",
          price: "1599",
          oldprice: "1899",
          subsidy: "15",
          royalty: "1.5",
          coupon: "40元优惠券",
          sales: "159"
        }
      ],
      loading: false,
      finished: false
    };
  },
  methods: {
    navbarTap: function(index) {
      this.condition = index;
      this.currentTab = index;
      this.$toast(this.currentTab);
      // this.myvoice();
    },
    screenTap: function(index, type) {
      this.sctype = type;
      window.console.log(this.sctype);
      // this.condition = index;
      this.sccurrentTab = index;
      // this.$toast(this.currentTab);
      // this.myvoice();
    },
    searchTap() {
      this.$router.push({ name: "amoysearch" });
    },
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        // for (let i = 0; i < 10; i++) {
        //   this.list.push(this.list.length + 1);
        // }
        // 加载状态结束
        this.loading = false;
        // 数据全部加载完成
        if (this.myorderlist.length >= 1) {
          this.finished = true;
        }
      }, 500);
    },
    shopdetail(id) {
      this.$router.push({ name: "Coupondetails", params: { id: id } });
    },
    // 请求openid的方法，需要后端写法
    getopenid_data(data) {
      this.$http
        .get("wx/v1/codeCallBack?code=" + data, {})
        .then(res => {
          window.console.log(res.data.result);
          // this.list = res.data.result;
        })
        .catch(err => {
          window.console.log(err);
          // alert("请求失败");
        });
      // getOpenid(data)
      //   .then(response => {
      //     const data = response.data;
      //     console.log(data);
      //     // alert(JSON.stringify(response))
      //     this.token = data.token;
      //     setsession(this.token);
      //     store.state.token = this.token;
      //     if (this.$route.path == "/toship") {
      //       this.$router.push({ name: "myship" });
      //     } else {
      //       this.$router.push({ name: "myorder" });
      //     }
      //   })
      //   .catch(error => {
      //     alert(error);
      //   });
    },
    getUrlParam(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      let url = window.location.href.split("#")[0];
      let search = url.split("?")[1];
      if (search) {
        var r = search.substr(0).match(reg);
        if (r !== null) return unescape(r[2]);
        return null;
      } else {
        return null;
      }
    }
  },
  mounted() {
    this.$nextTick(function() {});

    //post
    // this.$http
    //   .post("nearMerChants", {
    //     longitude: 118.851184,
    //     latitude: 32.029477,
    //     type: 5,
    //     dis: 10000
    //   })
    //   .then(res => {
    //     window.console.log(res.data.result);
    //     this.list = res.data.result;
    //   })
    //   .catch(err => {
    //     window.console.log(err);
    //     // alert("请求失败");
    //   });
  },
  created() {
    // var code = this.getUrlParam("code");
    // window.console.log(code);
    // var local = encodeURIComponent(window.location.href);
    // if (code == null || code == "") {
    //   let scope = "snsapi_base"; //snsapi_userinfo   //静默授权 用户无感知
    //   let appid = "wxd2dabcb848f0aa1a";
    //   window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${local}&response_type=code&scope=${scope}&state=state#wechat_redirect`;
    // } else {
    //   this.code = code;
    //   // var data = {
    //   //   code: this.code
    //   // };
    //   this.getopenid_data(this.code);
    // }
  }
};
</script>

<style lang="less" scoped>
// 分栏
.navbar {
  flex: none;
  display: flex;
  background: #fff;
  margin-top: 1px;
}

.navbar img {
  width: 0.16rem;
  height: 0.16rem;
  margin-top: 0.14rem;
  margin-right: 0.23rem;
}

.navbar .item {
  position: relative;
  flex: auto;
  text-align: center;
  line-height: 0.44rem;
  font-size: 0.14rem;
}

.navbar .item.active {
  color: #fc5d65;
}

.navbar .item.active:after {
  content: "";
  display: block;
  position: absolute;
  bottom: 0;
  left: 0rem;
  right: 0;
  height: 0.01rem;
  width: 0.672rem;
  background: #fc5d65;
}
// 筛选
.screenconditions {
  display: flex;
  justify-content: space-around;
  font-size: 0.12rem;
  line-height: 0.4rem;
  padding: 0 0.15rem;
  background: #fff;
}

.screenconditions .scactive {
  color: #fc5d65;
}
// 列表详情
.goods {
  width: 100%;
  background: #fff;
  padding: 0.15rem 0.15rem;
}

.goods img {
  width: 1.3rem;
  height: 1.3rem;
  margin-right: 0.15rem;
}

.goodsdetail {
  display: flex;
}

.goodstitle {
  min-width: 2rem;
}

.goodstitle p:nth-child(1) {
  font-size: 0.13rem;
  font-weight: 600;
  color: #333;
  max-width: 2rem;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 0.18rem;
}

.goodstitle p:nth-child(1) img {
  width: 0.12rem;
  height: 0.12rem;
  margin-right: 0;
}

.goodstitle i {
  font-style: normal;
  font-size: 0.12rem;
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

.goodstitle p:nth-child(2) {
  font-size: 0.14rem;
  color: #f92d36;
  line-height: 0.3rem;
  /* margin-top: 0.3rem; */
}

.goodstitle p:nth-child(2) span:nth-child(1) {
  font-size: 0.12rem;
  color: #999;
  // margin: 0 0.04rem;
}

.goodstitle p:nth-child(3) {
  font-size: 0.12rem;
  color: #666;
  line-height: 0.18rem;
  /* margin-top: 0.3rem; */
}

.goodstitle p:nth-child(3) span {
  color: #f92d36;
  /* margin-top: 0.3rem; */
}

.goodstitle p:nth-child(4) {
  font-size: 0.12rem;
  color: #666;
  line-height: 0.18rem;
  /* margin-top: 0.3rem; */
}

.goodstitle p:nth-child(4) span {
  color: #f92d36;
  /* margin-top: 0.3rem; */
}

.goodsbtn {
  display: flex;
  justify-content: space-between;
}

.goodsbtn {
  margin-top: 0.1rem;
  span {
    color: #999;
    font-size: 0.12rem;
  }
  button {
    width: 0.8rem;
    height: 0.22rem;
    color: #fff;
    border-radius: 0.04rem;
    background: #fc5d65;
    border: none;
    font-size: 0.12rem;
  }
}

.container-body {
  background: #fff;
  // padding-bottom: 0.5rem;
}

.order-list {
  border-bottom: 1px solid #f2f2f2;
}

.r_goods_div {
  position: relative;
}

.r_goods_coupon {
  width: 1.3rem;
  height: 0.21rem;
  position: absolute;
  background: #fc5d65;
  margin-top: -0.21rem;
  color: #fff;
  text-align: center;
  font-size: 0.12rem;
  line-height: 0.21rem;
}
// 教程
.course {
  margin-top: 0.05rem;
  img {
    display: inline-block;
    width: 1.85rem;
    height: 0.9rem;
  }
  img:nth-child(1) {
    margin-right: 0.05rem;
  }
}
// 合作平台
.cooperation ul {
  display: flex;
  justify-content: space-around;
  padding: 0.1rem 0.15rem;
  background: #fff;
  li img {
    width: 0.43rem;
    height: 0.43rem;
    display: block;
  }
  li p {
    font-size: 0.12rem;
    font-weight: 600;
    text-align: center;
    margin-top: 0.1rem;
  }
  .tq p {
    color: #ff8500;
  }
  .jd p {
    color: #f10215;
  }
  .wph p {
    color: #e80088;
  }
  .pdd p {
    color: #e02e24;
  }
}

// 搜索
.search {
  padding: 0.1rem 0.15rem;
  margin-top: 0.1rem;
  background: #fff;
  position: relative;
  input {
    width: 3.25rem;
    height: 0.4rem;
    display: inline-block;
    // margin: 0 auto;
    color: #999;
    font-size: 0.12rem;
    border-radius: 0.2rem;
    background: #f8f8f8;
    border: none;
    outline: none;
    padding-left: 0.2rem;
  }
  img {
    position: absolute;
    right: 0.3rem;
    top: 0.23rem;
    width: 0.16rem;
    height: 0.16rem;
  }
}

.van-swipe-item img {
  width: 100%;
  height: 100%;
}
</style>
