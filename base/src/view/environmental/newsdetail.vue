<template>
  <div class="container">
    <!-- <HeaderTop :title="title"></HeaderTop> -->
    <div class="newstitle">
      <p>{{ newstitle }}</p>
      <p>
        <span>{{ create_time }}</span>
        <span>{{ readnum }}阅读</span>
      </p>
    </div>
    <div v-html="content" class="newscontent"></div>
  </div>
</template>

<script>
import HeaderTop from "../../components/HeaderTop/index";
export default {
  components: {
    HeaderTop
  },
  name: "newsdetail",
  data() {
    return {
      id: this.$route.params.id,
      title: "新闻详情",
      newstitle: "",
      create_time: "",
      readnum: "",
      content: ""
    };
  },
  methods: {
    newsdetail() {
      //新闻详情
      this.$http
        .post("/news/info", {
          id: this.id
        })
        .then(res => {
          window.console.log(res.data.data);
          if (res.data.err_code == 0) {
            this.content = res.data.data.content;
            this.create_time = res.data.data.create_time;
            this.newstitle = res.data.data.title;
            this.readnum = res.data.data.views;
          }
        })
        .catch(err => {
          window.console.log(err);
          // alert("请求失败");
        });
    }
  },
  mounted() {
    this.newsdetail();
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

.newstitle {
  padding: 0.1rem 0.15rem;
  font-size: 0.18rem;
  font-weight: 600;
  text-align: left;
  line-height: 0.2rem;
  p:nth-child(1) {
    margin: 0.1rem 0;
  }

  p:nth-child(2) span {
    font-size: 0.12rem;
    color: #999;
    font-weight: normal;
  }
  p:nth-child(2) span:nth-child(1) {
    margin-right: 0.1rem;
  }
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
