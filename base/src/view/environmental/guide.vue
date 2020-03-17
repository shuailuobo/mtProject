<template>
  <div class="container">
    <!-- <HeaderTop :title="title"></HeaderTop> -->
    <div v-html="content" class="newscontent"></div>
  </div>
</template>

<script>
import HeaderTop from "../../components/HeaderTop/index";
export default {
  components: {
    HeaderTop
  },
  name: "guide",
  data() {
    return {
      id: this.$route.query.id,
      title: "",
      // id: this.$route.params.id,
      // title: this.$route.params.mytitle,
      newstitle: "",
      create_time: "",
      readnum: "",
      content: ""
    };
  },
  methods: {
    info() {
      //四则分类消息
      this.$http
        .post("/page/info", {
          id: this.id
        })
        .then(res => {
          window.console.log(res.data);
          if (res.data.err_code == 0) {
            this.content = res.data.data.content;
          }
        })
        .catch(err => {
          window.console.log(err);
          // alert("请求失败");
        });
    }
  },
  mounted() {
    this.info();
    this.common.login();
    if (this.id == 1) {
      this.title = "新手指南";
      this.common.Share(
        this.title,
        "http://tbk.maitomweb.com/index.html#/guide?id=1",
        "http://tbk.maitomweb.com/img/novice.8d0ef0a9.png",
        "不懂的往这看"
      );
    } else if (this.id == 2) {
      this.title = "垃圾分类";
      this.common.Share(
        this.title,
        "http://tbk.maitomweb.com/index.html#/guide?id=2",
        "http://tbk.maitomweb.com/img/garbage-class.b25e5716.png",
        "正确的辨别垃圾分类"
      );
    } else if (this.id == 3) {
      this.title = "回收指南";
      this.common.Share(
        this.title,
        "http://tbk.maitomweb.com/index.html#/guide?id=3",
        "http://tbk.maitomweb.com/img/recovery.f7497eb9.png",
        "回收的正确操作"
      );
    } else if (this.id == 4) {
      this.title = "积分用途";
      this.common.Share(
        this.title,
        "http://tbk.maitomweb.com/index.html#/guide?id=4",
        "http://tbk.maitomweb.com/img/points.94786b77.png",
        "教你玩转积分"
      );
    }
  }
};
</script>

<style lang="less">
.container {
  background: #fff;
  height: 100%;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
}

.newscontent {
  padding: 0.1rem 0.15rem;
  font-size: 0.14rem;
  // text-indent: 2em;
  line-height: 0.25rem;
  img {
    width: 100%;
    height: auto;
  }
}
</style>
