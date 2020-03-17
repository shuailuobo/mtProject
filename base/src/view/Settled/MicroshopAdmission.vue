<template>
  <div class="container">
    <!-- <HeaderTop :title="title"></HeaderTop> -->
    <div>
      <div class="cdetail">公司信息</div>
      <!-- <van-cell-group> -->
      <van-field
        v-model="company"
        label="公司名称"
        placeholder="待填写"
        required
        clearable
        right-icon="arrow"
        input-align="right"
      />
      <!-- </van-cell-group> -->
      <div class="cphotos">
        <span>*</span>营业执照
        <p>(请上传公司营业执照)</p>
      </div>
      <div class="puploader">
        <img class="imgPreview" :src="biz_cert" alt="" @click="ChooseBizCert" />
      </div>

      <div class="cdetail">店铺信息</div>
      <!-- <van-cell-group> -->
      <van-field
        v-model="store_name"
        label="店铺名称"
        placeholder="待填写"
        required
        clearable
        right-icon="arrow"
        input-align="right"
      />
      <van-field
        readonly
        v-model="store_region"
        label="店铺区域"
        placeholder="待填写"
        required
        clearable
        right-icon="arrow"
        input-align="right"
        @click="showPicker = true"
      />
      <van-popup v-model="showPicker" position="bottom">
        <van-area
          :area-list="areaList"
          @cancel="showPicker = false"
          @confirm="onConfirm"
        />
      </van-popup>

      <van-field
        v-model="store_address"
        label="详细地址"
        placeholder="待填写"
        required
        clearable
        right-icon="arrow"
        input-align="right"
      />
      <!-- </van-cell-group> -->

      <div class="cphotos">
        <span>*</span>上传证件
        <p>(产品许可证等相关证件)</p>
      </div>
      <div class="puploader">
        <img
          class="imgPreview"
          src="../../assets/user/a11.png"
          alt=""
          @click="ChooseStoreCert"
        />
        <img
          v-for="(storeCertImages, index) in storeCertImage"
          :key="index"
          class="imgPreview"
          :src="storeCertImages"
          alt=""
        />
      </div>

      <div class="cdetail">联系人信息</div>
      <!-- <van-cell-group> -->
      <van-field
        v-model="fullname"
        label="联系人姓名"
        placeholder="待填写"
        required
        clearable
        right-icon="arrow"
        input-align="right"
      />
      <van-field
        v-model="phone"
        label="联系人电话"
        placeholder="待填写"
        required
        clearable
        right-icon="arrow"
        type="number"
        input-align="right"
      />
      <van-field
        v-model="wechat"
        label="联系人微信"
        placeholder="待填写"
        required
        clearable
        right-icon="arrow"
        input-align="right"
      />
      <!-- </van-cell-group> -->

      <div class="cphotos">
        <span>*</span>上传证件
        <p>(请上传身份证正反面)</p>
      </div>
      <div class="puploader">
        <img
          class="imgPreview"
          src="../../assets/user/a11.png"
          alt=""
          @click="ChooseIdCard"
        />
        <img
          v-for="(idCardImages, index) in idCardImage"
          :key="index"
          class="imgPreview"
          :src="idCardImages"
          alt=""
        />
      </div>
      <div class="mycheck">
        <van-checkbox v-model="checked" checked-color="#FC5D65"
          >我已阅读并同意<a @click="Agreement()"
            >《微店入驻说明和协议》</a
          ></van-checkbox
        >
      </div>
      <div class="subtn"><button @click="submit">提交申请</button></div>
      <div class="explain">
        <p>
          提交申请前请务必仔细阅读商家入驻说明和协议，内附增值收入和操作说明。
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import areaList from "../../config/area";
import wx from "weixin-jsapi";
import { Dialog } from "vant";
import MicroShop from "../../config/MicroShop";
export default {
  name: "MicroshopAdmission",
  components: {},
  data() {
    return {
      areaList,
      title: "微店入驻",
      // license: require("../../assets/user/a11.png"),
      fileList: [],
      checked: true,
      area: "",
      showPicker: false,
      biz_cert: require("../../assets/user/a11.png"),
      company: "",
      store_name: "",
      store_region: "",
      store_address: "",
      store_cert: "",
      id_card_pic: "",
      wechat: "",
      phone: "",
      fullname: "",
      thumb1: [],
      thumb2: "",
      thumb3: [],
      storeCertImage: "",
      idCardImage: ""
    };
  },
  mounted() {
    this.common.login();
  },
  methods: {
    async submit() {
      //拼团申请user_id, company_name, biz_license(多个media_id逗号拼接), contact, phone, wechat, personal_license(多个逗号接)
      let data = {
        user_id: this.$cookies.get("userid"),
        type: "store",
        fullname: this.fullname,
        phone: this.phone,
        wechat: this.wechat,
        id_card_pic: this.thumb3.join(","),
        company: this.company,
        biz_cert: this.thumb2,
        store_name: this.store_name,
        store_region: this.store_region,
        store_address: this.store_address,
        store_cert: this.thumb1.join(",")
      };
      try {
        const response = await MicroShop.memberApply(data);
        window.console.log(response.data);
        // this.htmls =
        //   JSON.stringify(response.data) + "|||" + JSON.stringify(data);
        if (response.data.err_code == 0) {
          Dialog.alert({
            title: "提示",
            message: "提交成功"
          }).then(() => {
            this.$router.go(-1); //返回上一层
          });
          // this.$router.push({ name: "user" });
        } else {
          Dialog.alert({
            title: "提示",
            message: response.data.err_msg
          }).then(() => {
            this.$router.go(-1); //返回上一层
          });
        }
      } catch (error) {
        window.console.log(error.response);
      }
    },
    // onRead(file) {
    //   // window.console.log(file);
    //   this.license = file.content;
    // },
    // afterRead(file) {
    //   // window.console.log(file);
    //   if (file && file.length) {
    //     // 判断是否是多图上传 多图则循环添加进去
    //     file.forEach(item => {
    //       this.fileList.push(item.content); //第一个参数字符串可以填任意命名，第二个根据对象属性来找到file
    //     });
    //   } else {
    //     this.fileList.push(file.content);
    //   }
    //   window.console.log(this.fileList);
    // },
    // del_img(index) {
    //   // 删除指定下标的图片对象
    //   if (isNaN(index) || index >= this.fileList.length) {
    //     return false;
    //   }
    //   let tmp = [];
    //   for (let i = 0, len = this.fileList.length; i < len; i++) {
    //     if (this.fileList[i] !== this.fileList[index]) {
    //       tmp.push(this.fileList[i]);
    //     }
    //   }
    //   this.fileList = tmp;
    //   window.console.log(this.fileList);
    // },
    Agreement() {
      // this.$router.push({ name: "ShopDetail" });
    },
    onConfirm(values) {
      window.console.log(values);
      this.store_region = values.map(item => item.name).join(",");
      // this.store_region = value[0].name + value[1].name + value[2].name;
      this.showPicker = false;
    },
    ChooseBizCert: function() {
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
        that.biz_cert = localId;
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
    },
    ChooseStoreCert: function() {
      var that = this;
      var i = 0;
      var imgArr = [];
      var localIdArr = [];
      wx.chooseImage({
        count: 2 - i,
        sizeType: ["compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album"], // 可以指定来源是相册还是相机，默认二者都有
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
              that.storeCertImage = localIdArr;
              that.thumb1 = imgArr;
            }
          }
        });
      };
    },
    ChooseIdCard: function() {
      var that = this;
      var i = 0;
      var imgArr = [];
      var localIdArr = [];
      // var html = $('#wxpics').html();
      wx.chooseImage({
        count: 9 - i,
        sizeType: ["compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album"], // 可以指定来源是相册还是相机，默认二者都有
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
              that.idCardImage = localIdArr;
              that.thumb3 = imgArr;
            }
          }
        });
      };
    }
  }
};
</script>

<style lang="less" scoped>
.van-uploader {
  // background: #fff;
  display: inline-block;
}

.imgPreview {
  width: 0.8rem;
  height: 0.8rem;
}

.posting_uploader_item {
  display: inline-block;
}

.icon-po {
  position: relative;
  width: 0.8rem;
  height: 0.8rem;
  margin-right: 0.2rem;
  margin-top: 0.2rem;
  img {
    width: 0.8rem;
    height: 0.8rem;
  }
}
.icon-close {
  position: absolute;
  right: -8px;
  top: -8px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: #999;
  color: #fff;
  // font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cdetail {
  padding: 0 0.15rem;
  font-size: 0.14rem;
  font-weight: 600;
  color: #333;
  height: 0.4rem;
  line-height: 0.4rem;
}

.cphotos {
  background: #fff;
  padding: 0 0.1rem;
  height: 0.4rem;
  line-height: 0.4rem;
  font-size: 0.13rem;
  color: #333;
  span {
    color: red;
  }
  p {
    font-size: 0.12rem;
    display: inline-block;
  }
}

.puploader {
  background: #fff;
  padding: 0.1rem 0.15rem;
}

.subtn {
  button {
    display: block;
    width: 3.45rem;
    height: 0.45rem;
    margin: 0 auto;
    background: #fc5d65;
    font-size: 0.16rem;
    color: #fff;
    border: none;
    outline: none;
    border-radius: 0.04rem;
  }
}

.mycheck {
  padding: 0 0.15rem;
  margin: 0.1rem 0;
  font-size: 0.14rem;
  a {
    color: #196cea;
  }
}

.explain {
  p {
    padding: 0.1rem 0.15rem;
    color: #999;
    font-size: 0.12rem;
    line-height: 0.2rem;
  }
}
</style>
