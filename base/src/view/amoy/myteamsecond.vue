<template>
  <div class="container">
    <!--二级-->
    <div class="container-body">
      <div class="invites">共{{ myteamlist.length }}人</div>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div
          class="team-list"
          @click="orderDetailTap(item.id)"
          v-for="(item, index) in myteamlist"
          :key="index"
        >
          <div>
            <img
              :src="
                item.head_img_url
                  ? item.head_img_url
                  : require('../../assets/amoy/head.png')
              "
              alt=""
            />
          </div>
          <div style="width:100%;">
            <p>
              {{ item.nickname ? item.nickname : "默认用户" }}
              <span
                :class="[
                  item.agent == 0
                    ? 'color1'
                    : item.agent == 1
                    ? 'color2'
                    : item.agent == 2
                    ? 'color3'
                    : item.agent == 3
                    ? 'color4'
                    : item.agent == 4
                    ? 'color5'
                    : 'color6'
                ]"
                >{{
                  item.agent == 0
                    ? "会员"
                    : item.agent == 1
                    ? "试用期代理"
                    : item.agent == 2
                    ? "初级代理"
                    : item.agent == 3
                    ? "中级代理"
                    : item.agent == 4
                    ? "高级代理"
                    : "合伙人"
                }}</span
              >
            </p>
            <p>{{ item.phone }}</p>
            <div class="invdetails">
              <p>当前注册</p>
              <p>当前下单</p>
              <p>成交总额</p>
            </div>
            <div class="invdetails_1">
              <p>{{ item.total_user }}</p>
              <p>{{ item.total_order }}</p>
              <p>￥{{ item.total_money }}</p>
            </div>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import GroupMall from "../../config/GroupMall";
import { List, Progress } from "vant";
export default {
  components: {
    [List.name]: List,
    [Progress.name]: Progress
  },
  name: "myteamsecond",
  data() {
    return {
      title: "我的团队",
      loading: false,
      finished: false,
      myteamlist: [],
      list: []
    };
  },
  methods: {
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < this.list.length; i++) {
          this.myteamlist.push(this.list[i]);
        }
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.myteamlist.length >= this.list.length) {
          this.finished = true;
        }
      }, 500);
    },
    orderDetailTap(id) {
      this.$router.push({ name: "myteamthird", query: { id: id } });
    }
  },
  async created() {
    //查询邀请人信息
    try {
      let data = {
        parent_id: this.$route.query.id
      };
      const response = await GroupMall.getUserAgent(data);
      window.console.log(response.data);
      this.list = response.data.data;
    } catch (error) {
      window.console.log(error.response);
    }
  }
};
</script>

<style lang="less" scoped>
.navbar {
  flex: none;
  display: flex;
  background: #fff;
  margin-top: 1px;
}

.navbar .item {
  position: relative;
  flex: auto;
  text-align: center;
  line-height: 0.44rem;
  font-size: 0.14rem;
}

.navbar .item.active {
  color: #fc5d65;
}

.navbar .item.active:after {
  content: "";
  display: block;
  position: absolute;
  bottom: 0;
  left: 0;
  // right: 0;
  height: 0.01rem;
  width: 100%;
  background: #fc5d65;
}

.container-body {
  background: #fff;
  // padding-bottom: 0.5rem;
}

.invites {
  font-size: 0.12rem;
  color: #666;
  line-height: 0.2rem;
  margin-left: 0.15rem;
}

.team-list {
  padding: 0.1rem 0.15rem;
  display: flex;
  justify-content: flex-start;
  border-bottom: 1px solid #f2f2f2;
  div:nth-child(1) {
    img {
      width: 0.4rem;
      height: 0.4rem;
      overflow: hidden;
      border-radius: 50%;
      margin-right: 0.15rem;
      vertical-align: middle;
    }
  }
  div:nth-child(2) {
    p {
      display: block;
      font-size: 0.14rem;
      line-height: 0.26rem;
      // color: #333;
      // width: 2.85rem;
    }
    p:nth-child(1) {
      span {
        margin-left: 0.1rem;
        border: 1px solid #f86624;
        color: #f86624;
        border-radius: 0.08rem;
        padding: 0 0.06rem;
        font-size: 0.12rem;
        text-align: center;
        height: 0.16rem;
        line-height: 0.16rem;
      }
    }
  }
}

.container-body-1 {
  padding: 0.1rem 0.15rem;
}

.grade {
  padding: 0 0.15rem;
  width: 3.45rem;
  height: 0.4rem;
  line-height: 0.4rem;
  background: linear-gradient(left, #f3d199, #ddb575);
  color: #735438;
  font-size: 0.14rem;
  p {
    display: inline;
    font-weight: 600;
  }
}

.progressgrade {
  background: #fff;
  height: 0.6rem;
  padding-top: 0.3rem;
  .van-progress {
    margin-top: 0.1rem;
  }
}

.surplus {
  background: #fff;
  padding: 0.1rem 0.15rem;
  text-align: right;
  line-height: 0.6rem;
  font-size: 0.14rem;
  color: #333;
  span {
    font-size: 0.16rem;
  }
}

.invdetails {
  width: 100%;
  color: #666;
  display: flex;
  justify-content: space-between;
  font-size: 0.14rem;
  margin: 0.05rem 0;
  p {
    width: 100%;
    text-align: center;
  }
}

.invdetails_1 {
  width: 100%;
  display: flex;
  justify-content: space-between;
  p {
    width: 100%;
    text-align: center;
  }
  p:nth-child(3) {
    color: #fc5d65;
  }
}

.color1 {
  color: #fbd34a !important;
  border-color: #fbd34a !important;
}

.color2 {
  color: #f87947 !important;
  border-color: #f87947 !important;
}

.color3 {
  color: #ff7f99 !important;
  border-color: #ff7f99 !important;
}

.color4 {
  color: #6ac8d6 !important;
  border-color: #6ac8d6 !important;
}

.color5 {
  color: #aa48d5 !important;
  border-color: #aa48d5 !important;
}

.color6 {
  color: #735438 !important;
  border-color: #735438 !important;
}
</style>
