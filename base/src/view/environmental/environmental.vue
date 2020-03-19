<template>
  <div class="">
    <!-- <HeaderTop :title="title"></HeaderTop> -->
    <div id="allmap"></div>
    <div class="cityposition">
      <img src="../../assets/address.png" alt="" />
      {{ city }}
    </div>
    <!-- banner -->
    <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img :src="image" />
      </van-swipe-item>
    </van-swipe>

    <!-- 合作平台logos -->
    <div class="cooperation">
      <ul>
        <li>
          <img
            @click="nearbypoint()"
            src="../../assets/environmental/becycle-bin.png"
            alt=""
          />
          <p>附近回收箱</p>
        </li>
        <li @click="nearbypoint()">
          <img src="../../assets/environmental/becyce-point.png" alt="" />
          <p>附近回收点</p>
        </li>
        <li @click="$router.push({ name: 'MicroShop' })">
          <img src="../../assets/environmental/cp-store.png" alt="" />
          <p>附近合作店</p>
        </li>
        <li @click="nearbypublicToilets()">
          <img src="../../assets/environmental/public-toilets.png" alt="" />
          <p>附近公厕</p>
        </li>
      </ul>
    </div>

    <!-- 教程指南 -->
    <div class="course">
      <img
        v-for="(item, index) in course"
        :key="index"
        @click="guideTap(item.id)"
        :src="item.src"
        alt=""
      />
    </div>
    <!-- 标题栏 -->
    <van-cell is-link arrow-direction="down" value="更多" to="/MicroShop">
      <template slot="title">
        <span class="border-left"></span>
        <span class="custom-title">积分商城</span>
        <span class="custom-title custom-title_1">
          兑换大额优惠券
        </span>
      </template>
    </van-cell>
    <!--积分商城  -->
    <div class="container-body">
      <div
        class="order-list"
        v-for="(item, index) in myorderlist"
        :key="index"
        @click="shopdetail(item.id)"
      >
        <div class="goods">
          <div class="goodsdetail">
            <div class="r_goods_div ">
              <img :src="item.src" alt="" class="goodsimg" />
            </div>
            <div class="goodstitle">
              <p>{{ item.name }}</p>
              <p>
                券后￥{{ item.price }} <i>￥{{ item.oldprice }}</i
                ><button class="Couponbtn">立即抢券</button>
              </p>
              <p>
                <span>{{ item.subsidy }}</span
                ><span>{{ item.royalty }}</span
                ><span>已抢：{{ item.sales }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 标题栏 -->
    <van-cell is-link arrow-direction="down" value="更多" to="/newslists">
      <template slot="title">
        <span class="border-left"></span>
        <span class="custom-title">新闻动态</span>
      </template>
    </van-cell>
    <!--新闻动态  -->
    <div class="container-body">
      <div
        class="order-list"
        v-for="(item, index) in newslist"
        :key="index"
        @click="newsdetailTap(item.id)"
      >
        <div class="goods">
          <div class="goodsdetail">
            <div class="r_goods_div ">
              <img class="newsimg" :src="item.thumb" alt="" />
            </div>
            <div class="newstitle">
              <p>{{ item.title }}</p>
              <p class="newsdetail">
                <span>{{ item.create_time }}</span>
                <span>{{ item.views }}阅读</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { MP } from "../../config/map.js";
import publish from "../../config/publish";
export default {
  components: {},
  name: "environmental",
  data() {
    return {
      longitude: "",
      latitude: "",
      city: "",
      address_detail: null, //详细地址
      condition: 0,
      code: "",
      token: "",
      title: "垃圾分类",
      current: 0,
      images: [require("../../assets/environmental/ljflbanner.png")],
      myorderlist: [
        // {
        //   id: "1",
        //   src: require("../../assets/amoy/img1.png"),
        //   name: "德国碧然德Brita滤水壶M3.5L家用厨房自来水净水器1壶7芯净水壶",
        //   price: "99",
        //   oldprice: "199",
        //   subsidy: "1积分兑换",
        //   royalty: "72元券",
        //   coupon: "50元优惠券",
        //   sales: "159"
        // },
        // {
        //   id: "2",
        //   src: require("../../assets/amoy/img2.png"),
        //   name: "比瑞吉狗粮1.5kg小型犬幼犬粮泰迪比熊博美贵宾专用天热狗粮特价",
        //   price: "79",
        //   oldprice: "189",
        //   subsidy: "1积分兑换",
        //   royalty: "27元券",
        //   coupon: "40元优惠券",
        //   sales: "159"
        // },
        // {
        //   id: "3",
        //   src: require("../../assets/amoy/img3.png"),
        //   name: "水晶球旋转木马八音盒音乐盒天空之城儿童小女孩公主生日礼物女生",
        //   price: "259",
        //   oldprice: "499",
        //   subsidy: "1积分兑换",
        //   royalty: "487元券",
        //   coupon: "40元优惠券",
        //   sales: "159"
        // }
      ],
      course: [
        {
          id: "1",
          src: require("../../assets/environmental/novice.png"),
          title: "新手指南"
        },
        {
          id: "2",
          src: require("../../assets/environmental/garbage-class.png"),
          title: "垃圾分类"
        },
        {
          id: "3",
          src: require("../../assets/environmental/recovery.png"),
          title: "回收指南"
        },
        {
          id: "4",
          src: require("../../assets/environmental/points.png"),
          title: "积分用途"
        }
      ],
      newslist: [],
      loading: false,
      finished: false
    };
  },
  methods: {
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
    newsdetailTap(id) {
      this.$router.push({ name: "newsdetail", params: { id: id } });
    },
    // 跳转附近回收点
    nearbypoint() {
      this.$router.push({
        name: "nearbypoint",
        query: { longitude: this.longitude, latitude: this.latitude }
      });
    },
    nearbypublicToilets() {
      this.$router.push({
        name: "publicToilets",
        query: { longitude: this.longitude, latitude: this.latitude }
      });
    },
    // 跳转指南介绍
    guideTap(id) {
      // this.$router.push({
      //   name: "guide",
      //   params: { id: id, mytitle: mytitle }
      // });

      this.$router.push({
        name: "guide",
        query: {
          id: id
        }
      });
    },
    news() {
      //新闻列表
      this.$http
        .get("/news")
        .then(res => {
          window.console.log(res);
          if (res.data.err_code == 0) {
            if (res.data.data.total_size <= 3) {
              this.newslist = res.data.data.data;
            } else {
              this.newslist = res.data.data.data.slice(0, 3);
            }
          }
        })
        .catch(err => {
          window.console.log(err);
          // alert("请求失败");
        });
    }
  },
  mounted() {
    this.$nextTick(function() {
      var that = this;
      MP("1zLEOK6KTgudgCZcbabqxdsjCk2Pt4sV").then(BMap => {
        // var th = this;
        var map = new BMap.Map("allmap"); // 创建Map实例
        var point = new BMap.Point(116.404, 39.915); // 创建点坐标
        map.centerAndZoom(point, 12);
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(
          function(r) {
            if (this.getStatus() == BMAP_STATUS_SUCCESS) {
              var mk = new BMap.Marker(r.point);
              map.addOverlay(mk);
              map.panTo(r.point);
              that.longitude = r.point.lng.toFixed(6);
              that.latitude = r.point.lat.toFixed(6);
              // window.console.log(r.point.lng + "," + r.point.lat);
              map.centerAndZoom(
                new BMap.Point(that.longitude, that.latitude),
                11
              );
              // 创建地理编码实例
              var myGeo = new BMap.Geocoder();
              // 根据坐标得到地址描述
              myGeo.getLocation(
                new BMap.Point(that.longitude, that.latitude),
                function(result) {
                  if (result) {
                    // window.console.log(result);
                    that.city = result.addressComponents.city;
                  }
                }
              );
            } else {
              alert("failed" + that.getStatus());
            }
          },
          { enableHighAccuracy: true }
        );
      });
    });

    this.common.login();
    this.common.Share(
      this.title,
      location.href,
      "http://tbk.maitomweb.com/img/ljflbanner.5ef04e5d.png",
      "举手之劳，让生活更美好！"
    );

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
  async created() {
    this.news();
    // publish.firstRes(this);
  }
};
</script>

<style lang="less" scoped>
// 列表详情
.goods {
  width: 100%;
  background: #fff;
  padding: 0.15rem 0.15rem;
}

.goodsimg {
  width: 0.8rem;
  height: 0.8rem;
  margin-right: 0.1rem;
}

.goodsdetail {
  display: flex;
}

.goodstitle {
  min-width: 2.5rem;
}

.goodstitle p:nth-child(1) {
  font-size: 0.13rem;
  font-weight: 600;
  color: #333;
  max-width: 2.5rem;
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
  // margin: 0.1rem 0;
  // line-height: 0.3rem;
  /* margin-top: 0.3rem; */
  height: 0.3rem;
  line-height: 0.3rem;
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

.goodstitle p:nth-child(3) {
  span {
    font-size: 0.11rem;
  }
  span:nth-child(1) {
    padding: 0 0.1rem;
    color: #f92d36;
    border: 1px solid #ffcf89;
    margin-right: 0.1rem;
  }
  span:nth-child(2) {
    color: #f92d36;
    padding: 0 0.1rem;
    border: 1px solid #ff9c9c;
  }
  span:nth-child(3) {
    display: inline-block;
    float: right;
    color: #666;
  }
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

.Couponbtn {
  width: 0.7rem;
  height: 0.22rem;
  line-height: 0.22rem;
  color: #fff;
  border-radius: 0.11rem;
  background: #ff3a3a;
  border: none;
  font-size: 0.11rem;
  display: inline-block;
  float: right;
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

// 教程
.course {
  padding: 0.1rem 0.15rem;
  background: #fff;
  img {
    display: inline-block;
    width: 1.7rem;
    height: 1.1rem;
  }
  img:nth-child(1) {
    margin-right: 0.05rem;
    margin-bottom: 0.05rem;
  }
  img:nth-child(2) {
    margin-bottom: 0.05rem;
  }
  img:nth-child(3) {
    margin-right: 0.05rem;
  }
}
// 合作平台
.cooperation {
  padding: 0.1rem 0.15rem;
}

.cooperation ul {
  display: flex;
  justify-content: space-around;
  padding: 0.1rem 0.15rem;
  background: #fff;
  margin-top: -0.16rem;
  border-radius: 0.04rem;
  li img {
    width: 0.4rem;
    height: 0.4rem;
    display: block;
    margin: 0 auto;
  }
  li p {
    font-size: 0.12rem;
    font-weight: 600;
    text-align: center;
    margin-top: 0.1rem;
    color: #333;
    text-align: center;
  }
}

// 轮播
.van-swipe {
  z-index: -1;
}

.van-swipe-item img {
  width: 100%;
  height: 100%;
}

// 积分商城
.custom-title {
  font-size: 0.14rem;
  font-weight: 600;
}

.custom-title_1 {
  font-size: 0.12rem;
  font-weight: normal;
  color: #666;
}

.border-left {
  display: inline-block;
  line-height: 0.24rem;
  background: #51e400;
  width: 0.02rem;
  height: 0.13rem;
  margin-right: 0.05rem;
  margin-bottom: -0.02rem;
  // line-height: 0.44rem;
}

// 新闻列表
.newsimg {
  width: 1.2rem;
  height: 0.8rem;
  margin-right: 0.1rem;
}

.newstitle {
  min-width: 2.1rem;
  position: relative;
}

.newstitle p:nth-child(1) {
  font-size: 0.13rem;
  font-weight: 600;
  color: #333;
  max-width: 2.1rem;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 0.18rem;
}

.newstitle p:nth-child(2) {
  font-size: 0.12rem;
  color: #999;
  position: absolute;
  bottom: 0rem;
  width: 100%;
  span:nth-child(2) {
    float: right;
  }
}

// 城市定位
.cityposition {
  position: absolute;
  top: 0.1rem;
  left: 0rem;
  background: rgba(0, 0, 0, 0.3);
  color: #fff;
  padding: 0.05rem 0.1rem;
  font-size: 0.12rem;
  line-height: 0.2rem;
  img {
    width: 0.11rem;
    height: auto;
    vertical-align: middle;
    margin-bottom: 0.02rem;
  }
}
</style>
