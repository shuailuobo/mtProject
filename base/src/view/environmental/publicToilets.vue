<template>
  <div class="container">
    <!-- <HeaderTop :title="title"></HeaderTop> -->
    <baidu-map class="map" :center="center" :zoom="zoom">
      <div v-for="(item, index) in areaslists" :key="index">
        <bm-marker
          @click="infoWindowOpen"
          :position="{ lng: item.lng, lat: item.lat }"
          animation="BMAP_ANIMATION_BOUNCE"
        >
          <bm-label
            content=""
            :labelStyle="{ color: 'red', fontSize: '24px' }"
            :offset="{ width: -35, height: 30 }"
          />
          <bm-info-window :show="item.show" @close="infoWindowClose">{{
            item.name
          }}</bm-info-window>
        </bm-marker>
      </div>

      <bm-geolocation
        anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
        :showAddressBar="true"
        :autoLocation="true"
      ></bm-geolocation>
    </baidu-map>
    <div class="allnums">
      <p>共找到“附近公厕”相关{{ areaslists.length }}个结果</p>
    </div>
    <div class="areasbox">
      <div class="areas-list" v-for="(item, index) in areaslists" :key="index">
        <div class="areas" @click="areasdetail(item.id)">
          <p>{{ item.name }}</p>
          <p class="areassdetail">
            {{ item.intro }}
          </p>
        </div>
        <div
          class="areasdis"
          @click="routedetail(item.longitude, item.latitude, item.name)"
        >
          <img
            class="newsimg"
            src="../../assets/environmental/distance_map@2x.png"
            alt=""
          />
          <p>{{ Math.round(item.distance / 1000) }}km</p>
        </div>
      </div>
    </div>
    <van-popup v-model="show" position="top" :style="{ height: '16%' }">
      <section v-for="(item, index) in actions" :key="index">
        <div @click="onSelected(index)" class="selectBtn">
          {{ item.name }}
        </div>
      </section>
    </van-popup>
  </div>
</template>

<script>
import BackStagemanagement from "../../config/BackStagemanagement";

export default {
  components: {},
  name: "nearbypoint",
  data() {
    return {
      title: "附近公厕",
      longitude: this.$route.query.longitude,
      latitude: this.$route.query.latitude,
      center: {
        lng: this.$route.query.longitude,
        lat: this.$route.query.latitude
      },
      zoom: 17,
      areaslists: [],
      actions: [{ name: "高德地图" }, { name: "百度地图" }],
      show: false,
      routename: "",
      routelng: "",
      routelat: ""
    };
  },
  methods: {
    onSelected(index) {
      if (index == 0) {
        this.getGaodeHref();
      } else {
        this.getBaiduHref();
      }
      this.show = false;
    },
    areasdetail(id) {
      this.areaslists.some((item, i) => {
        if (item.id == id) {
          this.areaslists[i].show = true;
          return true;
        }
      });
    },
    routedetail(lng, lat, name) {
      this.show = true;
      this.routename = name;
      this.routelng = lng;
      this.routelat = lat;
    },
    getBaiduHref() {
      window.location.href =
        "http://api.map.baidu.com/marker?location=" +
        this.routelat +
        "," +
        this.routelng +
        "&title=" +
        this.routename +
        "&output=html";
      // return (
      //   "http://api.map.baidu.com/marker?location=" +
      //   this.routelat +
      //   "," +
      //   this.routelng +
      //   "&title=" +
      //   this.routename +
      //   "&output=html"
      // );
    },
    getGaodeHref() {
      window.location.href =
        "https://uri.amap.com/marker?position=" +
        this.routelng +
        "," +
        this.routelat +
        "&name=" +
        this.routename;
    },
    infoWindowClose(e) {
      this.areaslists.some((item, i) => {
        if (item.lat == e.point.lat) {
          this.areaslists[i].show = false;
          return true;
        }
      });
    },
    infoWindowOpen(e) {
      this.areaslists.some((item, i) => {
        if (item.lat == e.target.point.lat) {
          this.areaslists[i].show = true;
          return true;
        }
      });
    }
  },
  async created() {
    try {
      let data = {
        type: 2,
        longitude: this.longitude,
        latitude: this.latitude
      };
      const response = await BackStagemanagement.getPlace(data);
      window.console.log(response.data);
      if (response.data.err_code == 0) {
        this.areaslists = response.data.data;
      }
    } catch (error) {
      window.console.log(error.response);
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  background: #fff;
  height: 100%;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
}

.map {
  width: 100%;
  height: 3rem;
}

.allnums {
  p {
    text-align: center;
    font-size: 0.12rem;
    color: #999;
    margin: 0.1rem 0;
  }
}

.areasbox {
  padding: 0 0.15rem;
  .areas-list {
    display: flex;
    justify-content: space-between;
  }
  .areas {
    font-size: 0.14rem;
    color: #333;
    line-height: 0.3rem;
  }
  .areassdetail {
    font-size: 0.12rem;
    color: #999;
  }
  .areasdis {
    margin-top: 0.15rem;
    .newsimg {
      width: 0.135rem;
      height: auto;
      float: right;
    }
    p {
      font-size: 0.12rem;
      color: #999;
    }
  }
}

// 地图弹窗
.selectBtn {
  padding: 0rem 0.15rem;
  line-height: 0.45rem;
  height: 0.45rem;
  font-size: 0.16rem;
  text-align: center;
}
</style>
