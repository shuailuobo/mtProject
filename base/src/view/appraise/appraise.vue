<template>
  <div class="container">
    <van-field
      type="textarea"
      v-model="content"
      placeholder="想说什么。。"
      @blur="onBlur"
    />
    <div class="addimgs">
      <img
        class="adds"
        src="../../assets/addimg.png"
        alt=""
        @click="ChooseDetailImage"
      />
      <img
        v-for="(DetailImages, index) in DetailImage"
        :key="index"
        class="adds"
        @click="deleteImgDetail"
        :src="DetailImages"
        alt=""
      />
    </div>
    <!-- <div>{{images}}</div> -->
    <div class="appraisetap">
      <p>商品评分</p>
      <van-rate
        v-model="value"
        allow-half
        void-icon="star"
        touchable
        void-color="#eee"
      />
      <span>{{ value }}分</span>
    </div>
    <div style="margin-top:0.15rem;">
      <van-button
        type="info"
        size="large"
        @click="submit"
        style="background:#FC5D65;border:none;"
        >提交</van-button
      >
      <!-- <van-button type="info">提交</van-button> -->
    </div>
    <!-- <div>{{$route.query.id}}</div> -->
  </div>
</template>
<script>
// import HeaderTop from "@/components/HeaderTop/index";
import wx from "weixin-jsapi";
import GroupMall from "../../config/GroupMall";
export default {
  components: {
    // HeaderTop
    // [Button.name]: Button
  },
  data() {
    return {
      title: "",
      DetailImage: "",
      content: "",
      images: "",
      value: 5
    };
  },
  methods: {
    onBlur(event) {
      // console.log(event.target.value);
      this.content = event.target.value;
    },
    async submit() {
      let data = {
        user_id: this.$cookies.get("userid"),
        content: this.content,
        order_id: this.$route.query.id,
        star: this.value,
        images: this.images ? this.images.join(",") : this.images
      };
      try {
        const response = await GroupMall.commentPublish(data);
        window.console.log(response.data);
        if (response.data.err_code == 0) {
          this.$toast("提交成功");
          // alert("提交成功");
          this.$router.go(-1);
        }
        // this.responsedetail = response.data;
      } catch (error) {
        window.console.log(error.response);
      }
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
              that.images = imgArr;
            }
          }
        });
      };
    },
    // 删除图片 deleteImgDetail
    deleteImgDetail: function(e) {
      var that = this;
      var pics = this.data.DetailImage;
      var index = e.currentTarget.dataset.idx;
      wx.showModal({
        title: "提示",
        content: "确认删除？",
        success: function(res) {
          if (res.confirm) {
            pics.splice(index, 1);
            that.setData({
              DetailImage: pics
            });
          }
        }
      });
    }
  },
  mounted() {
    this.common.login();
  }
};
</script>
<style lang="less" scoped>
.adds {
  width: 0.7rem;
  height: 0.7rem;
  margin: 0.05rem;
}

.addimgs {
  height: 300rpx;
  background: #fff;
  padding: 0.1rem;
}

.appraisetap {
  padding: 0.15rem 0.15rem;
  margin-bottom: 0.2rem;
  background: #fff;
  p {
    line-height: 0.45rem;
  }
  span {
    color: #666;
    display: inline-block;
    margin-left: 0.1rem;
    vertical-align: top;
    margin-top: 0.03rem;
  }
}
</style>
