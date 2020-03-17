<template>
  <!-- 淘客首页 -->
  <div class="container">
    <!-- <HeaderTop :title="title"></HeaderTop> -->
    <div class="container-body">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          :immediate-check="false"
          :offset="10"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div class="container-body">
            <div
              class="order-list"
              v-for="(item, index) in newslist"
              :key="index"
              @click="newsdetailTap(item.id)"
            >
              <div class="goods">
                <div class="goodsdetail">
                  <div class="r_goods_div ">
                    <img class="newsimg" :src="item.thumb" alt="" />
                  </div>
                  <div class="newstitle">
                    <p>{{ item.title }}</p>
                    <p class="newsdetail">
                      <span>{{ item.create_time }}</span>
                      <span>{{ item.views }}阅读</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>
<script>
import HeaderTop from "../../components/HeaderTop/index";
import { Swipe, SwipeItem, List, Cell, PullRefresh } from "vant";
export default {
  components: {
    HeaderTop,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [List.name]: List,
    [Cell.name]: Cell,
    [PullRefresh.name]: PullRefresh
  },
  name: "newslists",
  data() {
    return {
      title: "新闻列表",
      newslist: [],
      loading: false,
      finished: false,
      isLoading: false,
      offset: 100 // 滚动条与底部距离小于 offset 时触发load事件
    };
  },
  methods: {
    onLoad() {
      this.news();
    },
    onRefresh() {
      setTimeout(() => {
        this.$toast("刷新成功");
        this.isLoading = false;
        this.upFinished = false; // 不写这句会导致你上拉到底过后在下拉刷新将不能触发下拉加载事件
        this.news(); // 加载数据
      }, 500);
    },
    newsdetailTap(id) {
      this.$router.push({ name: "newsdetail", params: { id: id } });
    },
    news() {
      //新闻列表
      this.$http
        .get("/news")
        .then(res => {
          window.console.log(res);
          if (res.data.err_code == 0) {
            this.newslist = res.data.data.data;
            this.finished = true;
          }
        })
        .catch(err => {
          window.console.log(err);
          // alert("请求失败");
        })
        .finally(() => {
          this.loading = false;
        });
    }
  },
  mounted() {
    this.news();
  },
  created() {}
};
</script>

<style lang="less" scoped>
// 列表详情
.goods {
  width: 100%;
  background: #fff;
  padding: 0.15rem 0.15rem;
}

.goodsdetail {
  display: flex;
}

.goodstitle {
  min-width: 2rem;
}

.container-body {
  background: #fff;
  height: 100%;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
}
// 新闻列表
.newsimg {
  width: 1.2rem;
  height: 0.8rem;
  margin-right: 0.1rem;
}

.newstitle {
  min-width: 2.1rem;
  position: relative;
}

.newstitle p:nth-child(1) {
  font-size: 0.13rem;
  font-weight: 600;
  color: #333;
  max-width: 2.1rem;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 0.18rem;
}

.newstitle p:nth-child(2) {
  font-size: 0.12rem;
  color: #999;
  position: absolute;
  bottom: 0rem;
  width: 100%;
  span:nth-child(2) {
    float: right;
  }
}
</style>
