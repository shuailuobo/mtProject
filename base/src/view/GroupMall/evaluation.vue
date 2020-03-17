<template>
  <div class="container">
    <!-- <HeaderTop title="发表评价"></HeaderTop> -->
    <div>
      <div class="kuang">
        <textarea class="text" v-model="text" placeholder="想说什么。。">
        </textarea>
        <van-uploader :after-read="onRead" class="upload">
          添加图片
        </van-uploader>
      </div>
      <div class="fabu" @click="fabu">发布</div>
    </div>
  </div>
</template>

<script>
import HeaderTop from "@/components/HeaderTop/index";
import { Uploader, Icon } from "vant";
export default {
  name: "Evaluation",
  components: {
    HeaderTop,
    [Uploader.name]: Uploader,
    [Icon.name]: Icon
  },
  data() {
    return {
      text: ""
    };
  },
  methods: {
    onRead(file) {
      window.console.log(file);
    },
    fabu() {
      window.console.log("哈哈");
    }
  }
};
</script>

<style lang="less" scoped>
html {
  width: 100%;
  height: auto;
  overflow: hidden;
  background-color: red;
}
.kuang {
  position: relative;
  width: 3.75rem;
  height: 2rem;
  padding: 0.15rem 0.3rem;
  box-sizing: border-box;
  border-top: 1px solid rgba(242, 242, 242, 1);
  background-color: #fff;
  background: url("../../assets/Evaluation/pinglun@2x.png");
  // @include bg-image("../../assets/Evaluation/pinglun");
  background-size: 0.115rem 0.09rem;
  background-repeat: no-repeat;
  background-position: 0.16rem 0.2rem;
  .text {
    width: 3.15rem;
    height: 0.7rem;
    color: #999;
    font-size: 0.12rem;
  }
  .upload {
    width: 0.8rem;
    height: 0.8rem;
    position: absolute;
    left: 0.15rem;
    bottom: 0.15rem;
    text-align: center;
    line-height: 1.2rem;
    font-size: 0.1rem;
    color: #333;
    background-color: #fff;
    background: url("../../assets/Evaluation/photo@2x.png");
    // @include bg-image("../../assets/Evaluation/photo");
    background-size: 40%;
    background-repeat: no-repeat;
    background-position: center 20%;
    box-shadow: 0 0 0.05rem 0 rgba(0, 0, 0, 0.1);
    border-radius: 0.06rem;
  }
}
.fabu {
  width: 3.45rem;
  height: 0.45rem;
  margin: 0.3rem auto;
  text-align: center;
  line-height: 0.45rem;
  color: #fff;
  font-size: 0.16rem;
  font-weight: 600;
  background-color: #fc5d65;
}
</style>
