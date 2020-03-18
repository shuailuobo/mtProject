<template>
  <div class="container">
    <!-- <HeaderTop :title="title"></HeaderTop> -->
    <!--导航条-->
    <div class="navbar">
      <p
        v-for="(item, index) in navbar"
        :key="index"
        @click="navbarTap(index)"
        :class="['item', currentTab == index ? 'active' : '']"
      >
        {{ item }}
      </p>
    </div>

    <!--一级-->
    <div v-if="currentTab === 0">
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

                <span class="color6" v-if="item.is_partner == '1'">合伙人</span>
                <span
                  :class="[
                    item.agent_level == 0
                      ? 'color1'
                      : item.agent_level == 1
                      ? 'color2'
                      : item.agent_level == 2
                      ? 'color3'
                      : item.agent_level == 3
                      ? 'color4'
                      : item.agent_level == 4
                      ? 'color5'
                      : 'color6'
                  ]"
                  v-else-if="item.is_agent == '1'"
                  >{{
                    item.agent_level == "1"
                      ? "试用期代理"
                      : item.agent_level == "2"
                      ? "初级代理"
                      : item.agent_level == "3"
                      ? "中级代理"
                      : item.agent_level == "4"
                      ? "高级代理"
                      : "普通会员"
                  }}</span
                >
                <span class="color1" v-else>普通会员</span>
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

    <!--二级-->
    <!-- <div v-if="currentTab === 1">
      <div class="container-body">
        <div class="invites">共25人</div>
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
              <img :src="item.src" alt="" />
            </div>
            <div>
              <p>{{ item.username }}</p>
              <p>{{ item.phone }}</p>
            </div>
          </div>
        </van-list>
      </div>
    </div> -->
    <!--三级-->
    <!-- <div v-if="currentTab === 2">
      <div class="container-body">
        <div class="invites">共15人</div>
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
              <img :src="item.src" alt="" />
            </div>
            <div>
              <p>{{ item.username }}</p>
              <p>{{ item.phone }}</p>
            </div>
          </div>
        </van-list>
      </div>
    </div> -->
    <!--团队晋升-->
    <div v-if="currentTab === 1">
      <div class="container-body-1">
        <div class="grade">
          当前等级：
          <p v-if="is_partner == '1'">合伙人</p>
          <p v-else-if="is_agent == '1'">
            {{
              agent == "1"
                ? "试用期代理"
                : agent == "2"
                ? "初级代理"
                : agent == "3"
                ? "中级代理"
                : agent == "4"
                ? "高级代理"
                : "普通会员"
            }}
          </p>
          <p v-else>普通会员</p>
        </div>
        <div class="progressgrade">
          <van-progress pivot-text="当前" color="#FC5D65" :percentage="50" />
        </div>
        <div class="surplus">
          距离下一等级还差
          <span>{{ disparity }}</span
          >人
        </div>
        <div class="surplus_1">
          <div>
            晋升条件：满足以下任一条件即刻升级为{{ mycondition[agent].t1 }}
          </div>
          <p>
            1、直接关注{{ mycondition[agent].t2 }}人且有{{
              mycondition[agent].t3
            }}人消费
          </p>
          <p>
            消费分为：领券去淘宝或京东或拼多多消费；在拼团商城消费；在微店消费。
          </p>
          <p>
            2、有效代理{{ mycondition[agent].t4 }}名，即直接关注的成人有{{
              mycondition[agent].t5
            }}人满足条件1。
          </p>
        </div>
      </div>
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
  name: "myteam",
  data() {
    return {
      color: "#",
      title: "我的团队",
      condition: 0,
      navbar: ["一级", "团队晋升"],
      currentTab: 0,
      loading: false,
      finished: false,
      myteamlist: [],
      list: [],
      agent: "",
      disparity: "",
      mycondition: [
        {
          t1: "初级代理",
          t2: 30,
          t3: 5,
          t4: 2,
          t5: 2
        },
        {
          t1: "高级代理",
          t2: 80,
          t3: 20,
          t4: 4,
          t5: 4
        },
        {
          t1: "运营商",
          t2: 200,
          t3: 50,
          t4: 10,
          t5: 10
        },
        {
          t1: "合伙人",
          t2: 300,
          t3: 80,
          t4: 20,
          t5: 20
        }
      ]
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
      this.$router.push({ name: "myteamsecond", query: { id: id } });
    },
    // onClick(index, title) {
    //   // this.$toast(title);
    // },
    navbarTap: function(index) {
      this.condition = index;
      this.currentTab = index;
      // this.$toast(this.currentTab);
      // this.myvoice();
    }
  },
  async created() {
    //查询邀请人信息
    try {
      let data = {
        parent_id: this.$cookies.get("userid")
      };
      const response = await GroupMall.getUserAgent(data);
      window.console.log(response.data);
      this.list = response.data.data;
    } catch (error) {
      window.console.log(error.response);
    }

    //查询用户信息 getUserInfo(data)
    try {
      let data = {
        user_id: this.$cookies.get("userid")
      };
      const response = await GroupMall.getUserInfo(data);
      window.console.log(response.data);
      if (response.data.err_code == 0) {
        this.agent = response.data.data.agent_level;
        switch (response.data.data.agent_level) {
          case "0":
            this.disparity = 30 - this.list.length;
            break;
          case "1":
            this.disparity = 80 - this.list.length;
            break;
          case "2":
            this.disparity = 200 - this.list.length;
            break;
          case "3":
            this.disparity = 300 - this.list.length;
            break;
          default:
            this.disparity = 0;
        }
      }
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

.surplus_1 {
  background: #fff;
  padding: 0.1rem 0.15rem;
  line-height: 0.24rem;
  font-size: 0.14rem;
  color: #333;
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
