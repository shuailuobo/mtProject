<template>
  <div class="container">
    <van-cell-group>
      <van-field v-model="name" label="商品名称" placeholder="请输入" />

      <!-- <van-field
        v-model="spec"
        label="商品规格"
        placeholder="请输入"
      /> -->

      <van-field
        v-model="description"
        type="textarea"
        label="商品描述"
        placeholder="请输入"
      />
      <!-- <van-field
        v-model="content"
        type="textarea"
        label="商品详情"
        placeholder="请输入"
      /> -->
      <!-- <van-field
        v-model="cat_id"
        type="number"
        label="商品id"
        placeholder="请输入"
      /> -->

      <!-- <van-field
        v-model="market_price"
        type="number"
        label="原价"
        placeholder="请输入"
      />
      <van-field
        v-model="price"
        type="number"
        label="单买价格"
        placeholder="请输入"
      /> -->

      <van-field
        readonly
        clickable
        label="团购有效期"
        :value="period_hour"
        placeholder="选择团购有效期"
        @click="teamshow = true"
      />

      <van-field
        readonly
        clickable
        label="有效期"
        :value="expire_time"
        placeholder="选择有效期"
        @click="show = true"
      />

      <van-field
        readonly
        clickable
        label="活动分类"
        :value="goodstypeValue"
        placeholder="选择活动分类"
        @click="goodstypeshow = true"
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

      <div style="height:300rpx;" class="ide1">
        <p class="supbtn">点击添加商品封面</p>
        <img class="adds" :src="CoverImage" alt="" @click="ChooseCoverImage" />
        <!-- <div>{{ alsartss }}</div> -->
        <!-- <img
          class="adds"
          :src="CoverImage"
          alt=""
        > -->
      </div>

      <div style="height:300rpx;" class="ide1">
        <p class="supbtn">点击添加商品详情</p>
        <img
          class="adds"
          src="../../assets/adds.png"
          alt=""
          @click="ChooseDetailImage"
        />
        <img
          v-for="(DetailImages, index) in DetailImage"
          :key="index"
          class="adds"
          :src="DetailImages"
          alt=""
        />
      </div>
      <!-- 上拉弹窗 -->
      <van-popup v-model="show" position="bottom">
        <van-datetime-picker
          v-model="currentDate"
          type="datetime"
          :min-date="minDate"
          :formatter="formatter"
          @confirm="onTimeConfirm"
          @cancel="show = false"
        />
      </van-popup>

      <van-popup v-model="Commodityshow" position="bottom">
        <van-picker
          show-toolbar
          :columns="Commoditycolumns"
          @cancel="Commodityshow = false"
          @confirm="onCommodityConfirm"
        />
      </van-popup>

      <van-popup v-model="teamshow" position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          @cancel="teamshow = false"
          @confirm="onTeamConfirm"
        />
      </van-popup>

      <van-popup v-model="goodstypeshow" position="bottom">
        <van-picker
          show-toolbar
          :columns="goodstypecolumns"
          @cancel="goodstypeshow = false"
          @confirm="onGoodsTypeConfirm"
        />
      </van-popup>
    </van-cell-group>
    <!-- 团购设置 -->
    <div v-if="specs.length != 0">
      <el-button type="primary" size="mini" @click="addType" class="mar-t"
        >添加规格</el-button
      >
      <div v-for="(item, index) in specs" :key="index">
        <div>
          <el-input v-model="item.name" placeholder="请输入商品规格"></el-input>
          <el-input
            v-model="item.price"
            placeholder="请输入商品售价"
          ></el-input>
          <el-input
            v-model="item.market_price"
            placeholder="请输入商品原价"
          ></el-input>
          <el-input
            v-model="item.profit"
            placeholder="请输入商品利润"
          ></el-input>
          <el-input v-model="item.stock" placeholder="请输入库存"></el-input>
        </div>

        <van-cell-group>
          <van-switch-cell v-model="item.ischecked" title="开启拼团" />
        </van-cell-group>
        <el-form ref="ruleForm" class="demo-ruleForm" v-if="item.ischecked">
          <el-form-item label="商品规格属性：" required>
            <el-button @click="addSku(index)" type="primary" size="mini"
              >设置团购人数</el-button
            >
          </el-form-item>
          <el-form-item>
            <el-table :data="item.sku" :fit="true">
              <!-- 固定写死的部分 -->
              <el-table-column prop="cost_price" label="拼团人数">
                <template slot-scope="scope">
                  <el-input
                    size="mini"
                    v-model="scope.row['number']"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="price" label="拼团价格">
                <template slot-scope="scope">
                  <el-input size="mini" v-model="scope.row['price']"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="no" label="商品利润">
                <template slot-scope="scope">
                  <el-input
                    size="mini"
                    v-model="scope.row['profit']"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="80">
                <template slot-scope="scope">
                  <el-button
                    @click.native.prevent="deleteRow(scope.$index, item.sku)"
                    type="text"
                    size="small"
                  >
                    移除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
        </el-form>
        <div>
          <el-button
            class="mar-t"
            type="primary"
            @click="deleteSpec(index, specs)"
            size="mini"
            v-if="specs.length > 1"
            >删除规格</el-button
          >
        </div>
      </div>
    </div>
    <!-- <div>
      <el-button
        @click="logData"
        type="primary"
      >打印sku数据</el-button>
    </div> -->
    <div>
      <van-button
        type="info"
        :disabled="isDisabled"
        size="large"
        @click="submit"
        >提交</van-button
      >
      <!-- <van-button type="info">提交</van-button> -->
    </div>
    <!-- <div>{{ responsedetail }}</div> -->
  </div>
</template>
<script>
import wx from "weixin-jsapi";
import { Dialog } from "vant";
import publish from "../../config/publish";

export default {
  components: {
    [Dialog.Component.name]: Dialog.Component
  },
  data() {
    return {
      isDisabled: false,
      show: false,
      teamshow: false,
      goodstypeshow: false,
      Commodityshow: false,
      minDate: new Date(),
      currentDate: new Date(),
      columns: [12, 24, 48],
      Commoditycolumns: [],
      goodstypecolumns: [
        "限时秒杀",
        "限时预售",
        "限时折扣",
        "水果拼团"
        // "热销"
      ],
      checked: true,
      name: "",
      spec: "",
      description: "",
      content: [],
      thumb: [],
      cat_id: "",
      market_price: "",
      price: "",
      expire_time: "",
      period_hour: "",
      goodstype: "",
      goodstypeValue: "",
      CommodityValue: "",
      for_sale: 1,
      CoverImage: require("../../assets/adds.png"),
      DetailImage: "",
      responsedetail: "是最新的13",
      issku: false,
      ischecked: false,
      Commodity: "",
      // 添加规格参数
      specs: [
        {
          name: "", // 名称
          price: "", //售价
          market_price: "", //原价
          profit: "", //利润
          stock: "", //库存
          ischecked: false,
          sku: [
            {
              number: "", //团购人数
              price: " ", //售价
              profit: "" //利润
            }
          ]
        }
      ]
    };
  },
  methods: {
    async submit() {
      this.isDisable = true; //开始可以点击
      let data = {
        user_id: this.$cookies.get("userid"),
        name: this.name,
        description: this.description,
        type: this.goodstype,
        period_hour: this.period_hour,
        expire_time: this.expire_time,
        for_sale: this.for_sale,
        cat_id: this.cat_id,
        thumb: this.thumb.join(","),
        content: this.content.join(","),
        spec: JSON.stringify(this.specs)
      };
      // window.console.log(data);
      this.responsedetail = JSON.stringify(data);
      try {
        const response = await publish.GoodsPublish(data);
        window.console.log(response.data);
        // this.isDisable = false;
        if (response.data.err_code == 0) {
          Dialog.alert({
            title: "提示",
            message: "提交成功"
          }).then(() => {
            this.$router.go(-1); //返回上一层
          });
          // this.$router.push({ name: "GroupMall" });
        } else {
          alert(response.data.err_msg);
        }
        // this.responsedetail = response.data;
      } catch (error) {
        window.console.log(error.response);
      }
    },
    formatter(type, value) {
      if (type === "year") {
        return `${value}年`;
      } else if (type === "month") {
        return `${value}月`;
      } else if (type === "day") {
        return `${value}日`;
      } else if (type === "hour") {
        return `${value}时`;
      } else if (type === "minute") {
        return `${value}分`;
      }
      return value;
    },
    onTeamConfirm(value) {
      //团购
      this.period_hour = value;
      this.teamshow = false;
    },
    onCommodityConfirm(value, index) {
      //团购
      this.cat_id = this.Commodity[index].id;
      this.CommodityValue = value;
      this.Commodityshow = false;
    },
    onTimeConfirm(value) {
      //有效期1
      this.expire_time = this.formateDateTime(value);
      this.show = false;
    },
    formateDateTime(date) {
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      var h = date.getHours();
      h = h < 10 ? "0" + h : h;
      var minute = date.getMinutes();
      minute = minute < 10 ? "0" + minute : minute;
      var second = "00";
      var dateTime =
        y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second;
      return dateTime;
    },
    onGoodsTypeConfirm(value, index) {
      window.console.log(index);
      this.goodstype = index + 1;
      this.goodstypeValue = value;
      this.goodstypeshow = false;
    },
    OnSaleChange(value) {
      window.console.log(value);
      if (value) {
        this.for_sale = 1;
      } else {
        this.for_sale = 0;
      }
    },
    ChooseCoverImage: function() {
      var imgArr = [];
      var that = this;
      wx.chooseImage({
        count: 1,
        sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
          var localIds = res.localIds;
          syncUpload(localIds);
          // var localId = res.localIds[0];
          // if (window.__wxjs_is_wkwebview) {
          //   wx.getLocalImgData({
          //     localId: localId,
          //     success: function(res) {
          //       that.alsartss = res;
          //       var localData = res.localData;
          //       localData = localData.replace("jgp", "jpeg");
          //       that.CoverImage = localData;
          //     },
          //     fail: function(res) {
          //       alert(res.errMsg);
          //     }
          //   });
          // } else {
          //   that.CoverImage = localId;
          // }
          // syncUpload(localId);
        }
      });
      var syncUpload = function(localIds) {
        var localId = localIds.pop();
        that.CoverImage = localId;
        wx.uploadImage({
          localId: localId,
          isShowProgressTips: 1,
          success: function(res) {
            // that.thumb = res.serverId;
            imgArr.push(res.serverId);
            // window.console.log(imgArr)
            if (localIds.length > 0) {
              syncUpload(localIds);
            } else {
              that.thumb = imgArr;
              // return localId;
            }
          }
        });
      };
    },
    ChooseDetailImage: function() {
      var that = this;
      var i = 0;
      var imgArr = [];
      var localIdArr = [];
      // var html = $('#wxpics').html();
      wx.chooseImage({
        count: 9 - i,
        sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
          var localIds = res.localIds;
          syncUpload(localIds);
        }
      });

      var syncUpload = function(localIds) {
        var localId = localIds.pop();
        wx.uploadImage({
          localId: localId,
          isShowProgressTips: 1,
          success: function(res) {
            i++;
            window.console.log(res.serverId);
            imgArr.push(res.serverId);
            localIdArr.push(localId);

            //其他对serverId做处理的代码
            if (localIds.length > 0) {
              syncUpload(localIds);
            } else {
              that.DetailImage = localIdArr;
              that.content = imgArr;
            }
          }
        });
      };
    },
    // 删除图片 deleteImgDetail
    // deleteImgDetail: function(e) {
    //   var that = this;
    //   var pics = this.data.intro_image_url;
    //   var index = e.currentTarget.dataset.idx;
    //   wx.showModal({
    //     title: "提示",
    //     content: "确认删除？",
    //     success: function(res) {
    //       if (res.confirm) {
    //         pics.splice(index, 1);
    //         that.setData({
    //           intro_image_url: pics
    //         });
    //       }
    //     }
    //   });
    // },
    // 删除规格
    deleteSpec(index, spec) {
      // window.console.log(spec);
      Dialog.confirm({
        title: "提示",
        message: "确认删除次规格！"
      })
        .then(() => {
          // on confirm
          spec.splice(index, 1);
        })
        .catch(() => {
          // on cancel
        });
    },
    // 是否添加规格
    addType() {
      // alert()
      var obj = {};
      obj.name = "";
      obj.price = "";
      obj.market_price = "";
      obj.profit = "";
      obj.stock = "";
      obj.ischecked = false;
      obj.sku = [
        {
          number: "", //团购人数
          price: " ", //售价
          profit: "" //利润
        }
      ];
      this.specs.push(obj);
    },
    // 增加商品SKU
    addSku(index) {
      let data = this.specs[index].sku[0];
      let keys = [];
      for (var key in data) {
        keys.push(key);
      }
      let obj = {};
      for (let i = 0; i < keys.length; i++) {
        obj[keys[i]] = "";
      }
      this.specs[index].sku.push(obj);
    },
    //删除一排  sku  ARR
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    // 调试代码信息用
    logData() {
      // window.console.log("this.attr_names", this.attr_names);
      window.console.log(this.specs);
    }
  },
  mounted() {
    this.common.login();
  },
  async created() {
    try {
      const response = await publish.GetCategory();
      window.console.log(response.data);
      for (var i in response.data.data) {
        this.Commoditycolumns.push(response.data.data[i].name);
      }
      this.Commodity = response.data.data;
    } catch (error) {
      window.console.log(error.response);
    }
  }
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
