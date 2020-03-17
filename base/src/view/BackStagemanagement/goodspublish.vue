<template>
  <div class="container">
    <van-cell-group>
      <div style="height:300rpx;" class="ide1">
        <p class="supbtn">点击添加商品封面</p>
        <img class="adds" :src="CoverImage" alt="" @click="ChooseCoverImage" />
      </div>
      <van-field v-model="name" label="商品名称" placeholder="请输入" />
      <van-field
        v-model="market_price"
        type="number"
        label="原价"
        placeholder="请输入"
      />
      <van-field
        v-model="price"
        type="number"
        label="现价"
        placeholder="请输入"
      />
      <van-field
        readonly
        clickable
        label="商品分类"
        :value="CommodityValue"
        placeholder="选择商品分类"
        @click="Commodityshow = true"
      />

      <van-cell-group>
        <van-switch-cell
          v-model="checked"
          title="是否上架"
          @change="OnSaleChange"
        />
      </van-cell-group>

      <!-- 上拉弹窗 -->
      <van-popup v-model="Commodityshow" position="bottom">
        <van-picker
          show-toolbar
          :columns="Commoditycolumns"
          @cancel="Commodityshow = false"
          @confirm="onCommodityConfirm"
        />
      </van-popup>
    </van-cell-group>

    <div>
      <van-button type="info" size="large" @click="submit">提交</van-button>
    </div>
    <!-- <div style="width:100%;overflow:scroll;">{{ responsedetail }}</div> -->
  </div>
</template>
<script>
import wx from "weixin-jsapi";
import { Dialog } from "vant";
import BackStagemanagement from "../../config/BackStagemanagement";

export default {
  components: {
    [Dialog.Component.name]: Dialog.Component
  },
  data() {
    return {
      // responsedetail: "",
      CommodityValue: "",
      Commodityshow: false,
      Commoditycolumns: [],
      checked: true,
      name: "",
      thumb: [],
      market_price: "",
      price: "",
      for_sale: "1",
      CoverImage: require("../../assets/adds.png"),
      cat_id: "",
      spec: "",
      store_id: this.$route.query.store_id
    };
  },
  methods: {
    async submit() {
      let data = {
        user_id: this.$cookies.get("userid"),
        name: this.name,
        cat_id: this.cat_id,
        spec: this.name,
        store_id: this.store_id,
        for_sale: this.for_sale,
        thumb: this.thumb,
        // for_sale: this.for_sale,
        market_price: this.market_price,
        price: this.price
      };
      // window.console.log(data);
      // this.responsedetail = JSON.stringify(data);
      try {
        const response = await BackStagemanagement.goodsSave(data);
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
        } else {
          Dialog.alert({
            title: "提示",
            message: response.data.err_msg
          }).then(() => {});
        }
      } catch (error) {
        window.console.log(error.response);
      }
    },
    onCommodityConfirm(value, index) {
      this.cat_id = this.Commodity[index].id;
      this.CommodityValue = value;
      this.Commodityshow = false;
    },
    OnSaleChange(value) {
      if (value) {
        this.for_sale = 1;
      } else {
        this.for_sale = 0;
      }
    },
    ChooseCoverImage: function() {
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
        that.CoverImage = localId;
        wx.uploadImage({
          localId: localId,
          isShowProgressTips: 1,
          success: function(res) {
            that.thumb = res.serverId;
            // imgArr.push(res.serverId);
            // // window.console.log(imgArr)
            // if (localIds.length > 0) {
            //   syncUpload(localIds);
            // } else {
            //   that.thumb = imgArr;
            //   // return localId;
            // }
          }
        });
      };
    },
    async categoryLists() {
      try {
        let data = {
          store_id: this.store_id
        };
        const response = await BackStagemanagement.categoryList(data);
        window.console.log(response.data);
        if (response.data.err_code == 0) {
          for (var i in response.data.data) {
            this.Commoditycolumns.push(response.data.data[i].name);
          }
          this.Commodity = response.data.data;
        }
      } catch (error) {
        window.console.log(error.response);
      }
    }
  },
  mounted() {
    this.common.login();
    this.categoryLists();
  },
  async created() {}
};
</script>
<style lang="less" scoped>
.adds {
  width: 0.7rem;
  height: 0.7rem;
  margin: 0.05rem;
}

.ide1 {
  padding: 0.1rem;
  font-size: 14px;
  color: #323232;
  p {
    line-height: 0.3rem;
  }
}

.del {
  cursor: pointer;
  display: none;
  background: red;
  color: #fff;
  font-size: 10px;
  padding: 2px 5px;
  position: absolute;
  top: 7px;
  right: 0px;
  z-index: 9;
  border-radius: 3px;
}
.cell:hover .del {
  display: inline;
}

.el-form-item__label {
  width: 100%;
  display: block;
  text-align: left;
  float: none !important;
}

.mar-t {
  margin: 0.1rem 0;
}

.el-input {
  margin: 0.05rem 0;
}

.el-form-item {
  margin-bottom: 0;
}
</style>
