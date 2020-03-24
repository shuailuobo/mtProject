<template>
  <div class="container">
    <div id="allmap"></div>
    <van-cell-group title="基本信息"></van-cell-group>
    <van-form @submit="onSubmit">
      <van-field
        v-model="name"
        name="name"
        label="店铺名称"
        placeholder="店铺名称"
        :rules="[{ required: true, message: '请填写店铺名称' }]"
      />

      <van-field
        v-model="intro"
        name="intro"
        label="店铺简介"
        placeholder="店铺简介"
        :rules="[{ required: true, message: '请填写店铺简介' }]"
      />

      <van-field name="icon" label="店铺logo">
        <template #input>
          <div style="height:300rpx;" class="ide1">
            <img class="adds" :src="icon" alt="" @click="ChooseIconImage" />
          </div>
        </template>
      </van-field>

      <van-field name="bg_url" label="店铺背景">
        <template #input>
          <div style="height:300rpx;" class="ide1">
            <img class="adds" :src="bg_url" alt="" @click="ChooseBgUrl" />
          </div>
        </template>
      </van-field>

      <van-field
        readonly
        clickable
        name="region"
        :value="region"
        label="地区选择"
        placeholder="点击选择省市区"
        @click="showArea = true"
      />
      <van-popup v-model="showArea" position="bottom">
        <van-area
          :area-list="areaList"
          @confirm="onConfirmArea"
          @cancel="showArea = false"
        />
      </van-popup>

      <van-field
        v-model="address"
        name="address"
        label="店铺地址"
        placeholder="店铺地址"
        :rules="[{ required: true, message: '请填写店铺地址' }]"
      />

      <van-field name="is_delivery" label="支持配送">
        <template #input>
          <van-switch v-model="is_delivery" size="20" />
        </template>
      </van-field>

      <van-field
        v-model="delivery_threshold"
        type="number"
        name="delivery_threshold"
        label="起送价"
        placeholder="起送价"
        :rules="[{ required: true, message: '请填写起送价' }]"
      />

      <van-field
        v-model="delivery_fee"
        type="number"
        name="delivery_fee"
        label="配送费"
        placeholder="配送费"
        :rules="[{ required: true, message: '请填写配送费' }]"
      />

      <van-field name="is_self" label="支持自取">
        <template #input>
          <van-switch v-model="is_self" size="20" />
        </template>
      </van-field>

      <van-field
        v-model="phone"
        type="tel"
        name="phone"
        label="联系电话"
        placeholder="联系电话"
        :rules="[{ required: true, message: '请填写联系电话' }]"
      />

      <van-field
        readonly
        clickable
        name="startTime"
        :value="startTime"
        label="开始时间"
        placeholder="点击选择时间"
        @click="showPickerStartTime = true"
      />
      <van-popup v-model="showPickerStartTime" position="bottom">
        <van-datetime-picker
          type="time"
          @confirm="onConfirmStartTime"
          @cancel="showPickerStartTime = false"
        />
      </van-popup>

      <van-field
        readonly
        clickable
        name="endTime"
        :value="endTime"
        label="结束时间"
        placeholder="点击选择时间"
        @click="showPickerEndTime = true"
      />
      <van-popup v-model="showPickerEndTime" position="bottom">
        <van-datetime-picker
          type="time"
          @confirm="onConfirmEndTime"
          @cancel="showPickerEndTime = false"
        />
      </van-popup>

      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>

    <!-- <div style="width:100%;overflow:scroll;">{{ responsedetail }}</div> -->
  </div>
</template>

<script>
import { MP } from "../../config/map.js";
import BackStagemanagement from "../../config/BackStagemanagement";
import wx from "weixin-jsapi";
import areaList from "../../config/area";
import { Dialog } from "vant";

export default {
  components: {
    [Dialog.Component.name]: Dialog.Component
  },
  data() {
    return {
      // responsedetail: "",
      store_id: "",
      name: "",
      intro: "",
      biz_time: "",
      startTime: "",
      endTime: "",
      showPickerStartTime: false,
      showPickerEndTime: false,
      region: "",
      showArea: false,
      is_delivery: false,
      is_self: false,
      icon: require("../../assets/adds.png"),
      bg_url: require("../../assets/adds.png"),
      areaList,
      delivery_threshold: "",
      phone: "",
      delivery_fee: "",
      address: "",
      thumb1: "",
      thumb2: ""
    };
  },
  computed: {},
  methods: {
    onConfirmStartTime(time) {
      this.startTime = time;
      this.showPickerStartTime = false;
    },
    onConfirmEndTime(time) {
      this.endTime = time;
      this.showPickerEndTime = false;
    },
    onConfirmArea(values) {
      this.region = values.map(item => item.name).join(",");
      this.showArea = false;
    },
    onSubmit(values) {
      window.console.log(values);
      var that = this;
      var addressDetail = values.region + values.address;
      // this.getLng(values.region + values.address);
      MP("1zLEOK6KTgudgCZcbabqxdsjCk2Pt4sV").then(BMap => {
        var map = new BMap.Map("allmap"); // 创建Map实例
        var point = new BMap.Point(116.404, 39.915); // 创建点坐标
        map.centerAndZoom(point, 12);

        var myGeo = new BMap.Geocoder();
        myGeo.getPoint(addressDetail, function(point) {
          if (point) {
            // window.console.log(point);
            that.myStoreSave(values, point);
          } else {
            alert("您选择地址没有解析到结果!");
          }
        });
      });
    },
    async myStoreSave(values, point) {
      let is_delivery = "";
      let is_self = "";
      if (values.is_delivery == true) {
        is_delivery = 1;
      } else {
        is_delivery = 2;
      }

      if (values.is_self == true) {
        is_self = 1;
      } else {
        is_self = 2;
      }
      try {
        let data = {
          name: values.name,
          intro: values.intro,
          icon: this.thumb1,
          bg_url: this.thumb2,
          user_id: this.$cookies.get("userid"),
          region: values.region,
          address: values.address,
          longitude: point.lng,
          latitude: point.lat,
          is_delivery: is_delivery,
          delivery_threshold: values.delivery_threshold,
          delivery_fee: values.delivery_fee,
          is_self: is_self,
          phone: values.phone,
          biz_time: values.startTime + "~" + values.endTime,
          id: this.store_id
        };
        const response = await BackStagemanagement.storeSave(data);
        window.console.log(response.data);
        // this.responsedetail =
        //   JSON.stringify(data) + "|||" + JSON.stringify(response.data);
        if (response.data.err_code == 0) {
          Dialog.alert({
            title: "提示",
            message: "提交成功"
          }).then(() => {
            this.$router.go(-1); //返回上一层
          });
        }
      } catch (error) {
        window.console.log(error.response);
      }
    },
    ChooseIconImage: function() {
      // var imgArr = [];
      var that = this;
      wx.chooseImage({
        count: 1,
        sizeType: ["compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album"], // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
          var localIds = res.localIds;
          syncUpload(localIds);
        }
      });
      var syncUpload = function(localIds) {
        var localId = localIds.pop();
        that.icon = localId;
        wx.uploadImage({
          localId: localId,
          isShowProgressTips: 1,
          success: function(res) {
            that.thumb1 = res.serverId;
          }
        });
      };
    },
    ChooseBgUrl: function() {
      // var imgArr = [];
      var that = this;
      wx.chooseImage({
        count: 1,
        sizeType: ["compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album"], // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
          var localIds = res.localIds;
          syncUpload(localIds);
        }
      });
      var syncUpload = function(localIds) {
        var localId = localIds.pop();
        that.bg_url = localId;
        wx.uploadImage({
          localId: localId,
          isShowProgressTips: 1,
          success: function(res) {
            that.thumb2 = res.serverId;
            // imgArr.push(res.serverId);
            // // window.console.log(imgArr)
            // if (localIds.length > 0) {
            //   syncUpload(localIds);
            // } else {
            //   that.thumb2 = imgArr;
            //   // return localId;
            // }
          }
        });
      };
    }
  },
  mounted() {
    this.common.login();
  },
  async created() {
    try {
      let data = {
        user_id: this.$cookies.get("userid")
      };
      const response = await BackStagemanagement.getStoreInfo(data);
      window.console.log(response.data);
      if (response.data.err_code == 0) {
        this.store_id = response.data.data.id;
        this.name = response.data.data.name;

        if (response.data.data.icon != "") {
          this.icon = response.data.data.icon;
        }
        if (response.data.data.bg_url != "") {
          this.bg_url = response.data.data.bg_url;
        }
        this.intro = response.data.data.intro;

        this.thumb1 = response.data.data.icon;
        this.thumb2 = response.data.data.bg_url;
        if (
          response.data.data.province != "" &&
          response.data.data.province != null &&
          response.data.data.province != undefined
        ) {
          this.region =
            response.data.data.province +
            "," +
            response.data.data.city +
            "," +
            response.data.data.district;
        }
        // this.region =
        //   this.areaList.province_list[response.data.data.province_id] +
        //   "," +
        //   this.areaList.city_list[response.data.data.city_id] +
        //   "," +
        //   this.areaList.county_list[response.data.data.district_id];
        this.address = response.data.data.address;
        if (response.data.data.is_self == 1) {
          this.is_self = true;
        } else {
          this.is_self = false;
        }

        if (response.data.data.is_delivery == 1) {
          this.is_delivery = true;
        } else {
          this.is_delivery = false;
        }

        this.phone = response.data.data.phone;
        this.startTime = response.data.data.biz_time.split("~")[0];
        this.endTime = response.data.data.biz_time.split("~")[1];
        this.delivery_threshold = response.data.data.delivery_threshold;
        this.delivery_fee = response.data.data.delivery_fee;
      }
    } catch (error) {
      window.console.log(error.response);
    }
  }
};
</script>

<style lang="less" scoped>
.ide1 {
  padding: 0.1rem;
  font-size: 14px;
  color: #323232;
  p {
    line-height: 0.3rem;
  }
}

.adds {
  width: 0.7rem;
  height: 0.7rem;
  margin: 0.05rem;
}
</style>
