<template>
  <div class="container">
    <!-- <HeaderTop :title="title"></HeaderTop> -->

    <baidu-map
      class="map"
      :center="center"
      :zoom="zoom"
    >
      <bm-view class="map">
      </bm-view>
      <bm-transit
        :start="{lng: li1.lng, lat: li1.lat}"
        :end="{lng: li2.lng, lat: li2.lat}"
        :auto-viewport="true"
        location="南京"
      ></bm-transit>
      <!-- <bm-transit
        start="百度大厦"
        end="北京邮电大学西门"
        :auto-viewport="true"
        location="北京"
      ></bm-transit> -->
      <bm-geolocation
        anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
        :showAddressBar="true"
        :autoLocation="true"
      ></bm-geolocation>
    </baidu-map>

  </div>
</template>
<script>
import HeaderTop from "../../components/HeaderTop/index";
export default {
  components: {
    HeaderTop
  },
  name: "areasroute",
  data() {
    return {
      title: "导航",
      center: { lng: 118.795202, lat: 32.02611 },
      zoom: 17,
      li1: { lng: 118.795943, lat: 32.026232 },
      li2: { lng: 118.796549, lat: 32.027162 }
    };
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.map {
  width: 100%;
  height: 3rem;
}
</style>
