<template>
  <!-- 微店首页 -->
  <div class="">
    <!-- <HeaderTop :title="title"></HeaderTop> -->
    <div id="allmap"></div>
    <!-- banner -->
    <img class="swipeimage" src="../../assets/banner.png" />
    <!-- <van-swipe :autoplay="3000" indicator-color="white" :height="160">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        
      </van-swipe-item>
    </van-swipe> -->
    <!-- list -->
    <div class="dividerbar">
      <img src="../../assets/location.png" alt="" />
      <p>附近商家</p>
    </div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div
        class="commodities"
        v-for="(item, index) in list"
        :key="index"
        @click="shopdetail(item.id, item.distance)"
      >
        <div class="commoditieslist">
          <div>
            <img class="headimg" :src="item.icon" alt="" />
          </div>
          <div class="storebox">
            <div class="storetitle">
              <p>{{ item.name }}</p>
              <p>{{ (item.distance / 1000).toFixed(1) }}km</p>
            </div>
            <div class="storetags">
              <p v-if="item.is_delivery == '1'">
                {{ item.is_delivery == "1" ? "支持配送" : "" }}
              </p>
              <p v-if="item.is_self == '1'">
                {{ item.is_self == "1" ? "支持自取" : "" }}
              </p>
              <!-- <p v-if="item.coupon_name != ''">
                {{ item.coupon_name }}
              </p> -->
            </div>
          </div>
          <div class="storeprice">
            <p>起送￥{{ item.delivery_threshold }}</p>
            <p>配送￥{{ item.delivery_fee }}</p>
          </div>
        </div>
        <div class="storeintro">{{ item.intro }}</div>
        <div class="goodslist">
          <ul v-for="(item2, index) in item.goods_list" :key="index">
            <li>
              <div>
                <img class="goodsimg" :src="item2.thumb" alt="" />
              </div>
              <div class="goodsmain">
                <div class="sale_amount">销量：{{ item2.sale_amount }}</div>
                <div>
                  <p class="goodsname">{{ item2.goods_name }}</p>
                </div>
                <div class="goodsprice">
                  <p>￥{{ item2.price }}</p>
                  <p>
                    <strike>￥{{ item2.market_price }}</strike>
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </van-list>
  </div>
</template>
<script>
import { MP } from "../../config/map.js";
import MicroShop from "../../config/MicroShop";
import publish from "../../config/publish";
// import HeaderTop from "../../components/HeaderTop/index";
export default {
  components: {
    // HeaderTop,
  },
  name: "micro-shop",
  data() {
    return {
      code: "",
      open_id: "",
      // title: "微店首页",
      // longitude: "",
      // latitude: "",
      address_detail: null, //详细地址
      // userlocation: { lng: "", lat: "" },
      current: 0,
      images: [require("../../assets/banner.png")],
      list: [],
      loading: false,
      finished: true
    };
  },
  methods: {
    onLoad() {
      // 异步更新数据
      // setTimeout(() => {
      //   // for (let i = 0; i < 10; i++) {
      //   //   this.list.push(this.list.length + 1);
      //   // }
      //   // 加载状态结束
      //   this.loading = false;
      //   // 数据全部加载完成
      //   if (this.list.length >= 1) {
      //     this.finished = true;
      //   }
      // }, 500);
    },
    shopdetail(id, distance) {
      this.$router.push({
        name: "ShopDetail",
        query: { id: id, distance: distance }
      });
    },
    async getStoreList(longitude, latitude) {
      try {
        let data = {
          longitude: longitude,
          latitude: latitude
        };
        const response = await MicroShop.getStore(data);
        window.console.log(response.data);
        if (response.data.err_code == 0) {
          this.list = response.data.data.filter(item => item.icon != "");
          // this.list = response.data.data;
        }
      } catch (error) {
        window.console.log(error.response);
      }
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
              // that.longitude = r.point.lng.toFixed(6);
              // that.latitude = r.point.lat.toFixed(6);
              that.getStoreList(r.point.lng.toFixed(6), r.point.lat.toFixed(6));
              // window.console.log(r.point.lng + "," + r.point.lat);
              map.centerAndZoom(
                new BMap.Point(this.longitude, this.latitude),
                11
              );
              // 创建地理编码实例
              var myGeo = new BMap.Geocoder();
              // 根据坐标得到地址描述
              myGeo.getLocation(
                new BMap.Point(this.longitude, this.latitude),
                function(result) {
                  if (result) {
                    // window.console.log(result);
                    that.address_detail = result.address;
                  }
                }
              );
            } else {
              window.console.log("failed" + that.getStatus());
            }
          },
          { enableHighAccuracy: true }
        );
      });
    });
  },
  async created() {
    publish.firstRes(this);
  }
};
</script>

<style lang="less" scoped>
.swipeimage {
  display: block;
  width: 100%;
  height: 100%;
}

.dividerbar {
  display: flex;
  padding: 0.1rem 0.15rem;
  background: #f8f8f8;
}

.dividerbar img {
  vertical-align: middle;
  width: 0.12rem;
  height: 0.14rem;
  margin-right: 0.1rem;
}

.dividerbar p {
  margin: 0;
  font-size: 0.14rem;
  font-weight: 600;
  color: #333;
  line-height: 0.14rem;
}

.commodities {
  background: #fff;
  padding: 0.1rem 0.05rem;
  margin-bottom: 0.1rem;
  /* border-bottom: 0.1rem solid #f2f2f2; */
}

.commoditieslist {
  display: flex;
}

.headimg {
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 50%;
  margin-right: 0.1rem;
}

.storebox {
  width: 2.1rem;
}

.storetitle p {
  display: inline-block;
  font-size: 0.12rem;
  color: #333;
  font-weight: 600;
  margin-right: 0.1rem;
  max-width: 1.2rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.storetitle p:nth-child(2) {
  color: #666;
  font-size: 0.12rem;
  font-weight: normal;
  -webkit-transform-origin-x: 0;
  -webkit-transform: scale(0.8);
  transform: scale(0.8);
}

.storetags p {
  margin-top: 0.05rem;
  display: inline-block;
  padding: 0.04rem 0.06rem;
  border: 1px solid #f92d36;
  color: #f92d36;
  font-size: 0.12rem;
  border-radius: 0.03rem;
  /* margin-right: 0.1rem; */
  -webkit-transform-origin-x: 0;
  -webkit-transform: scale(0.8);
  transform: scale(0.8);
}

.storeprice p {
  display: inline-block;
  color: #666;
  font-size: 0.12rem;
}

.storeintro {
  width: 3.55rem;
  margin: 0.1rem 0;
  padding: 0 0.1rem;
  color: #666;
  font-size: 0.12rem;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.goodsimg {
  width: 1.1rem;
  height: 1.1rem;
}

.goodslist {
  display: flex;
  /* justify-content: space-around; */
  /* padding: 0 0.1rem; */
  ul {
    padding: 0 0.05rem;
  }
}

.goodsname {
  font-size: 0.12rem;
  color: #333;
  font-weight: 600;
  margin-bottom: 0.05rem;
  max-width: 1.1rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.goodsprice p {
  display: inline-block;
  font-size: 0.12rem;
  color: #f92d36;
  font-weight: 600;
  margin-right: 0.02rem;
}

.goodsprice p:nth-child(2) {
  font-size: 0.12rem;
  color: #666;
  font-weight: normal;
  -webkit-transform-origin-x: 0;
  -webkit-transform: scale(0.8);
  transform: scale(0.8);
}

.goodsmain {
  margin-top: 0.1rem;
  .sale_amount {
    line-height: 0.25rem;
    font-size: 0.11rem;
    color: #666;
  }
}
</style>
