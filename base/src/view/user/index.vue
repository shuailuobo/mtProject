<template>
  <div class="container">
    <!-- <HeaderTop :title="title"></HeaderTop> -->
    <!-- tab标签 -->
    <van-tabs
      @click="onClick"
      type="card"
      background="transparent"
      color="#fff"
      title-active-color="#FC5D65"
      class="reset"
    >
      <van-tab class="resets" title="我的账户">
        <div slot="">
          <div class="header">
            <div class="userinformation">
              <div>
                <img :src="head_img_url" alt="" />
              </div>
              <div>
                <p>
                  {{ nickname }}
                  <span v-if="is_partner == '1'">合伙人</span>
                  <span v-else-if="is_agent == '1'">{{
                    agent_level == "1"
                      ? "试用期代理"
                      : agent_level == "2"
                      ? "初级代理"
                      : agent_level == "3"
                      ? "中级代理"
                      : agent_level == "4"
                      ? "高级代理"
                      : "普通会员"
                  }}</span>
                  <span v-else>普通会员</span>
                </p>
                <p>
                  会员卡：<span>{{ vip_card_number }}</span>
                </p>
              </div>
              <div v-if="is_agent == '0'">
                <button @click="application()">申请代理</button>
              </div>
            </div>
          </div>
          <!-- 网购补贴 -->
          <!-- <div class="wgbt">
            <div class="wheader"><span></span>网购补贴</div>
            <div class="wmain">
              <div>
                <p>结算金额</p>
                <p>¥24.00</p>
                <p>已结算(签收未满7天)</p>
              </div>
              <div>
                <p>预估收入</p>
                <p>¥18.00</p>
                <p>待结算(已支付订单)</p>
              </div>
            </div>
            <div class="wprice">
              <p>可提现金额：<span>¥9.00</span></p>
              <button @click="CashTap()">去提现</button>
            </div>
          </div> -->
          <!-- 我的积分 -->
          <div class="wdjf">
            <div class="wheader"><span></span>我的积分</div>
            <div class="wmain">
              <div>
                <p>累计积分总额</p>
                <p>{{ total_point }}</p>
              </div>
              <div>
                <p>
                  自购结算积分<span>{{ buy_point }}</span>
                </p>
                <p>
                  团队结算积分<span>{{ agent_point }}</span>
                </p>
              </div>
              <div>
                <p>
                  自购预估积分<span>{{ buy_frozen_point }}</span>
                </p>
                <p>
                  团队预估积分<span>{{ agent_frozen_point }}</span>
                </p>
              </div>
            </div>
            <div class="wprice">
              <p>
                可兑换积分：<span>{{ point }}</span>
              </p>
              <button @click="$router.push({ name: 'GroupMall' })">
                去兑换
              </button>
            </div>
          </div>
          <!-- 教程指南 -->
          <div class="course">
            <img
              @click="$router.push({ name: 'userCourse' })"
              src="../../assets/amoy/xsjc.png"
              alt=""
            />
            <img
              @click="$router.push({ name: 'proGuide' })"
              src="../../assets/amoy/tgzn.png"
              alt=""
            />
          </div>
          <!-- 选项卡列表 -->
          <div class="celllists">
            <van-cell title="我的团队" is-link to="myteam" />
            <van-cell
              title="我的订单"
              is-link
              :to="{ name: 'MyOrder', params: { activeIndex: 0 } }"
            />
            <van-cell
              :title="is_group == '1' ? '拼团商家端' : '拼团入驻'"
              is-link
              :to="
                is_group == '1' ? 'AssembleManagement' : 'ApplicationAdmission'
              "
            />
            <van-cell
              :title="is_store == '1' ? '微店商家端' : '微店入驻'"
              is-link
              :to="
                is_store == '1'
                  ? 'BackStagemanagement'
                  : 'ApplicationAdmissionwd'
              "
            />
            <van-cell title="玩赚积分" is-link to="earnPoints" />
            <!-- <van-cell title="在线客服" is-link to="index" /> -->
          </div>
        </div>
      </van-tab>
      <van-tab title="代理账户">
        <div slot="">
          <div class="header">
            <div class="userinformation">
              <div>
                <img :src="head_img_url" alt="" />
              </div>
              <div>
                <p>
                  {{ nickname }} <span v-if="is_partner == '1'">合伙人</span>
                  <span v-else-if="is_agent == '1'">{{
                    agent_level == "1"
                      ? "试用期代理"
                      : agent_level == "2"
                      ? "初级代理"
                      : agent_level == "3"
                      ? "中级代理"
                      : agent_level == "4"
                      ? "高级代理"
                      : "普通会员"
                  }}</span>
                  <span v-else>普通会员</span>
                </p>
                <p>
                  会员卡：<span>{{ vip_card_number }}</span>
                </p>
              </div>
              <div v-if="is_agent == '1'">
                <button @click="showShare = true">我的二维码</button>
              </div>
            </div>
          </div>
          <!-- 团队提成 -->
          <!-- this.point = response.data.data.point; //可兑换积分
        this.total_point = response.data.data.total_point; //总积分
        this.buy_point = response.data.data.buy_point; //自购积分
        this.buy_frozen_point = response.data.data.buy_frozen_point; //自购预计积分
        this.agent_point = response.data.data.agent_point; //团队积分
        this.agent_frozen_point = response.data.data.agent_frozen_point; //团队预计积分 -->

          <div class="tdtc">
            <div class="wheader"><span></span>团队提成</div>
            <div class="wmain">
              <div>
                <p>¥0</p>
                <p>上月结算收益</p>
              </div>
              <div>
                <p>¥0</p>
                <p>本月预估收益</p>
              </div>
            </div>
            <div class="wprice">
              <p>可提现金额：<span>¥0</span></p>
              <button @click.prevent="$router.push({ name: 'IncomeAssets' })">
                去提现
              </button>
            </div>
          </div>
          <!-- 收益统计 -->
          <div class="sytj">
            <div class="wheader"><span></span>收益统计</div>
            <div class="wmain">
              <!-- <div>
                <p>领券返利</p>
                <p>今日:<span>¥25.45</span></p>
                <p>累计:<span>¥425.57</span></p>
              </div> -->
              <div>
                <p>拼团商城</p>
                <p>今日:<span>¥0</span></p>
                <p>累计:<span>¥0</span></p>
              </div>
              <div>
                <p>微店</p>
                <p>今日:<span>¥0</span></p>
                <p>累计:<span>¥0</span></p>
              </div>
            </div>
          </div>
          <!-- 教程指南 -->
          <div class="course">
            <img
              @click="$router.push({ name: 'userCourse' })"
              src="../../assets/amoy/xsjc.png"
              alt=""
            />
            <img
              @click="$router.push({ name: 'proGuide' })"
              src="../../assets/amoy/tgzn.png"
              alt=""
            />
          </div>
          <!-- 选项卡列表 -->
          <div class="celllists">
            <van-cell title="我的团队" is-link to="myteam" />
            <!-- <van-cell title="团队订单" is-link to="MyOrder" /> -->
            <!-- <van-cell
              :title="is_group == '1' ? '拼团商家端' : '拼团入驻'"
              is-link
              :to="is_group == '1' ? 'publish' : 'ApplicationAdmission'"
            />
            <van-cell
              :title="is_store == '1' ? '微店商家端' : '微店入驻'"
              is-link
              :to="
                is_store == '1'
                  ? 'BackStagemanagement'
                  : 'ApplicationAdmissionwd'
              "
            /> -->
            <!-- <van-cell title="微店入驻" is-link to="ApplicationAdmissionwd" /> -->
            <van-cell title="提现说明" is-link to="presentation" />
            <!-- <van-cell title="在线客服" is-link to="index" /> -->
          </div>
        </div>

        <section>
          <van-popup v-model="showShare">
            <img :src="qrcode" alt="" style="width:100%;height:auto;" />
          </van-popup>
        </section>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import "../../../static/css/vantreset.css";
import GroupMall from "../../config/GroupMall";
import publish from "../../config/publish";
// import HeaderTop from "../../components/HeaderTop/index";
export default {
  components: {
    // HeaderTop
  },
  name: "user",
  data() {
    return {
      title: "我的账户",
      head_img_url: require("../../assets/user/user.png"),
      nickname: "默认用户",
      vip_card_number: "",
      showShare: false,
      qrcode: "",
      point: "",
      total_point: "",
      buy_point: "",
      buy_frozen_point: "",
      agent_point: "",
      agent_frozen_point: "",
      is_group: "",
      is_store: "",
      is_agent: "",
      is_partner: "",
      agent_level: ""
    };
  },
  methods: {
    onClick(index, title) {
      // this.$toast(title);
      this.title = title;
    },
    application() {
      this.$router.push({ name: "Applicationagent" });
    },
    myteamTap() {
      this.$router.push({ name: "myteam" });
    },
    // 请求openid的方法，需要后端写法
    // getopenid_data(data) {
    //   this.$http
    //     .get("/member/open_id?code=" + data, {})
    //     .then(res => {
    //       window.console.log(res.data);
    //       if (res.data.err_code == 0) {
    //         this.user_info(res.data.data.open_id);
    //         this.head_img_url = res.data.data.head_img_url;
    //         this.nickname = res.data.data.nickname;
    //       } else {
    //         window.console.log(res.data.err_msg);
    //       }
    //     })
    //     .catch(err => {
    //       window.console.log(err);
    //       // alert("请求失败");
    //     });
    // },
    // 注册 open_id,phone,username,email
    // register(open_id) {
    //   this.$http
    //     .post("/member/register", {
    //       open_id: open_id,
    //       head_img_url: this.head_img_url,
    //       nickname: this.nickname
    //     })
    //     .then(res => {
    //       window.console.log(res);
    //       if (res.data.err_code == 0) {
    //         this.$cookies.set("userid", res.data.data.id); //return this
    //         this.myUserInfo();
    //         localStorage.setItem("head_img_url", res.data.data.head_img_url);
    //         localStorage.setItem("nickname", res.data.data.nickname);
    //       }
    //     })
    //     .catch(err => {
    //       window.console.log(err);
    //       // alert("请求失败");
    //     });
    // },
    //查询是否注册
    // user_info(open_id) {
    //   this.$http
    //     .post("/member/info", {
    //       open_id: open_id
    //     })
    //     .then(res => {
    //       window.console.log(res.data);
    //       if (res.data.err_code == 1) {
    //         this.register(open_id);
    //       } else if (res.data.err_code == 0) {
    //         this.$cookies.set("userid", res.data.data.id); //return this
    //         this.myUserInfo();
    //         localStorage.setItem("head_img_url", res.data.data.head_img_url);
    //         localStorage.setItem("nickname", res.data.data.nickname);
    //       }
    //     })
    //     .catch(err => {
    //       window.console.log(err);
    //       // alert("请求失败");
    //     });
    // },
    // getUrlParam(name) {
    //   var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    //   let url = window.location.href.split("#")[0];
    //   let search = url.split("?")[1];
    //   if (search) {
    //     var r = search.substr(0).match(reg);
    //     if (r !== null) return unescape(r[2]);
    //     return null;
    //   } else {
    //     return null;
    //   }
    // },
    async myUserInfo() {
      //查询用户信息 getUserInfo(data)
      try {
        let data = {
          user_id: this.$cookies.get("userid")
        };
        const response = await GroupMall.getUserInfo(data);
        window.console.log(response.data);
        if (response.data.err_code == 0) {
          this.head_img_url = response.data.data.head_img_url;
          this.nickname = response.data.data.nickname;
          this.vip_card_number = response.data.data.vip_card_number;
          this.qrcode = response.data.data.qrcode;
          this.is_agent = response.data.data.is_agent;
          this.point = response.data.data.point; //可兑换积分
          this.total_point = response.data.data.total_point; //总积分
          this.buy_point = response.data.data.buy_point; //自购积分
          this.buy_frozen_point = response.data.data.buy_frozen_point; //自购预计积分
          this.agent_point = response.data.data.agent_point; //团队积分
          this.agent_frozen_point = response.data.data.agent_frozen_point; //团队预计积分
          this.is_group = response.data.data.is_group; //团购审核  1 通过
          this.is_store = response.data.data.is_store; //微店审核

          this.is_partner = response.data.data.is_partner; // 是否是合伙人
          this.agent_level = response.data.data.agent_level; //代理等级
        }
      } catch (error) {
        window.console.log(error.response);
      }
    },
    async myUserProfit() {
      try {
        let data = {
          user_id: this.$cookies.get("userid")
        };
        const response = await GroupMall.getHomeGroup(data); //订单状态查看：0未处理 1已发货 2已完成 3已取消
        //团购状态 0进行中 1结束 2失败
        window.console.log(response.data);
        // if (response.data.data.length > 0) {
        //   this.getMicroShopOrder();
        // }
      } catch (error) {
        window.console.log(error.response);
      }
    },
    async myTeamProfit() {
      try {
        let data = {
          user_id: this.$cookies.get("userid")
        };
        const response = await GroupMall.getHomeStore(data); //订单状态查看：0未处理 1已发货 2已完成 3已取消
        //团购状态 0进行中 1结束 2失败
        window.console.log(response.data);
        // if (response.data.data.length > 0) {
        //   this.getMicroShopOrder();
        // }
      } catch (error) {
        window.console.log(error.response);
      }
    }
  },
  async created() {
    // this.$cookies.set("userid", "582");
    publish.firstRes(this);
    // var code = this.getUrlParam("code");
    // window.console.log(code);
    // var local = encodeURIComponent(window.location.href);
    // if (code == null || code == "") {
    //   let scope = "snsapi_userinfo"; //snsapi_userinfo   //获取微信信息
    //   let appid = "wxd2dabcb848f0aa1a";
    //   window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${local}&response_type=code&scope=${scope}&state=state#wechat_redirect`;
    // } else {
    //   this.code = code;
    //   this.getopenid_data(this.code);
    // }
  },
  mounted() {
    this.myUserInfo();
    this.myUserProfit();
    this.myTeamProfit();
  }
};
</script>

<style lang="less" scoped>
.van-tabs--card {
  padding-top: 0;
}

.van-button--danger {
  background-color: #59d178;
  border: 1px solid #59d178;
}

.van-submit-bar__bar {
  background: #424244;
}

.van-submit-bar__price {
  color: #fff;
}

.van-submit-bar__text {
  text-align: left;
  color: #fff;
  margin-left: 0.2rem;
}

.van-tabs__nav--card {
  padding: 0 0.8rem;
}
// header
.header {
  width: 100%;
  height: 1.5rem;
  background: linear-gradient(left, #ff8635, #ff6735);
  // position: relative;
  // top: -0.4rem;
  margin-top: -0.4rem;
}

.reset {
  top: 0.1rem;
}

.userinformation {
  color: #fff;
  padding: 0.15rem;
  // margin-top: 0.5rem;
  padding-top: 0.6rem;
  display: flex;
  // justify-content: space-around;
  div:nth-child(1) img {
    width: 0.5rem;
    height: 0.5rem;
    vertical-align: middle;
    border-radius: 50%;
    margin-top: 0.05rem;
  }
  div:nth-child(2) {
    margin: 0 0.1rem;
  }
  div:nth-child(2) p:nth-child(1) {
    font-size: 0.16rem;
    font-weight: 600;
    width: 1.85rem;
    line-height: 0.3rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    span {
      margin-left: 0.12rem;
      font-size: 0.12rem;
      font-weight: normal;
      padding: 0.04rem 0.15rem;
      background: #8b5a0e;
      border-radius: 0.15rem;
    }
  }
  div:nth-child(2) p:nth-child(2) {
    font-size: 0.12rem;
    margin-top: 0.12rem;
    span {
      font-size: 0.13rem;
    }
  }
  div:nth-child(3) button {
    margin-top: 0.1rem;
    width: 0.9rem;
    height: 0.3rem;
    background: transparent;
    border: 1px solid #fff;
    border-radius: 0.04rem;
    color: #fff;
    font-size: 0.12rem;
  }
}

// 教程
.course {
  margin-top: 0.1rem;
  img {
    display: inline-block;
    width: 1.85rem;
    height: 0.9rem;
  }
  img:nth-child(1) {
    margin-right: 0.05rem;
  }
}
// 网购补贴
.wgbt {
  margin-top: -0.4rem;
  padding: 0rem 0.15rem;
  background: #fff;
  .wheader {
    height: 0.4rem;
    line-height: 0.4rem;
    font-size: 0.14rem;
    font-weight: 600;
    color: #333;
    span {
      display: inline-block;
      height: 0.1rem;
      width: 0.02rem;
      background: #fc5d65;
      margin-right: 0.07rem;
      // border-right: 2px solid #fc5d65;
    }
  }
  .wmain {
    height: 0.9rem;
    display: flex;
    justify-content: space-around;
    border-top: 1px solid #f2f2f2;
    border-bottom: 1px solid #f2f2f2;
    div:nth-child(1) {
      // padding-right: 0.5rem;
      // border-right: 1px solid #f2f2f2;
      line-height: 0.28rem;
      p:nth-child(1) {
        color: #666;
        font-size: 0.12rem;
      }
      p:nth-child(2) {
        color: #333;
        font-weight: 600;
        font-size: 0.13rem;
      }
      p:nth-child(3) {
        color: #47e328;
        font-size: 0.12rem;
      }
    }
    div:nth-child(2) {
      // padding-right: 0.5rem;
      // border-right: 1px solid #f2f2f2;
      line-height: 0.28rem;
      p:nth-child(1) {
        color: #666;
        font-size: 0.12rem;
      }
      p:nth-child(2) {
        color: #333;
        font-weight: 600;
        font-size: 0.13rem;
      }
      p:nth-child(3) {
        color: #e3b028;
        font-size: 0.12rem;
      }
    }
  }
  .wprice {
    display: flex;
    justify-content: space-between;
    height: 0.4rem;
    p {
      font-size: 0.12rem;
      color: #666;
      line-height: 0.4rem;
      span {
        font-size: 0.14rem;
        color: #f92d36;
      }
    }
    button {
      width: 0.6rem;
      height: 0.24rem;
      color: #fff;
      font-size: 0.12rem;
      background: #fc5d65;
      border-radius: 0.12rem;
      border: none;
      outline: none;
      margin-top: 0.08rem;
    }
  }
}

// 我的积分
.wdjf {
  margin-top: 0.1rem;
  padding: 0rem 0.15rem;
  background: #fff;
  .wheader {
    height: 0.4rem;
    line-height: 0.4rem;
    font-size: 0.14rem;
    font-weight: 600;
    color: #333;
    span {
      display: inline-block;
      height: 0.1rem;
      width: 0.02rem;
      background: #fc5d65;
      margin-right: 0.07rem;
      // border-right: 2px solid #fc5d65;
    }
  }
  .wmain {
    display: flex;
    justify-content: space-around;
    border-top: 1px solid #f2f2f2;
    border-bottom: 1px solid #f2f2f2;
    div:nth-child(1) {
      // padding-right: 0.5rem;
      // border-right: 1px solid #f2f2f2;
      line-height: 0.28rem;
      p:nth-child(1) {
        color: #666;
        font-size: 0.12rem;
      }
      p:nth-child(2) {
        color: #333;
        font-size: 0.13rem;
      }
    }
    div:nth-child(2) {
      line-height: 0.28rem;
      p:nth-child(1) {
        color: #666;
        font-size: 0.12rem;
        span {
          color: #f92d36;
          font-size: 0.13rem;
        }
      }
      p:nth-child(2) {
        color: #333;
        font-size: 0.12rem;
        span {
          color: #f92d36;
          font-size: 0.13rem;
        }
      }
    }
    div:nth-child(3) {
      line-height: 0.28rem;
      p:nth-child(1) {
        color: #666;
        font-size: 0.12rem;
        span {
          color: #f92d36;
          font-size: 0.13rem;
        }
      }
      p:nth-child(2) {
        color: #333;
        font-size: 0.12rem;
        span {
          color: #f92d36;
          font-size: 0.13rem;
        }
      }
    }
  }
  .wprice {
    display: flex;
    justify-content: space-between;
    height: 0.4rem;
    p {
      font-size: 0.12rem;
      color: #666;
      line-height: 0.4rem;
      span {
        font-size: 0.14rem;
        color: #f92d36;
      }
    }
    button {
      width: 0.6rem;
      height: 0.24rem;
      color: #fff;
      font-size: 0.12rem;
      background: #fc5d65;
      border-radius: 0.12rem;
      border: none;
      outline: none;
      margin-top: 0.08rem;
    }
  }
}

.celllists {
  margin-top: 0.1rem;
  div:nth-child(3) {
    margin-top: 0.1rem;
  }
  div:nth-child(5) {
    margin-top: 0.1rem;
  }
  div:nth-child(6) {
    padding-bottom: 0.1rem;
  }
}

// 团队提成
.tdtc {
  // margin-top: -0.4rem;
  padding: 0rem 0.15rem;
  background: #fff;
  .wheader {
    height: 0.4rem;
    line-height: 0.4rem;
    font-size: 0.14rem;
    font-weight: 600;
    color: #333;
    span {
      display: inline-block;
      height: 0.1rem;
      width: 0.02rem;
      background: #fc5d65;
      margin-right: 0.07rem;
      // border-right: 2px solid #fc5d65;
    }
  }
  .wmain {
    display: flex;
    justify-content: space-around;
    border-top: 1px solid #f2f2f2;
    border-bottom: 1px solid #f2f2f2;
    div:nth-child(1) {
      // padding-right: 0.5rem;
      // border-right: 1px solid #f2f2f2;
      line-height: 0.28rem;
      p:nth-child(2) {
        color: #666;
        font-size: 0.12rem;
      }
      p:nth-child(1) {
        color: #333;
        font-weight: 600;
        font-size: 0.13rem;
      }
    }
    div:nth-child(2) {
      line-height: 0.28rem;
      p:nth-child(2) {
        color: #666;
        font-size: 0.12rem;
      }
      p:nth-child(1) {
        color: #333;
        font-weight: 600;
        font-size: 0.13rem;
      }
    }
  }
  .wprice {
    display: flex;
    justify-content: space-between;
    height: 0.4rem;
    p {
      font-size: 0.12rem;
      color: #666;
      line-height: 0.4rem;
      span {
        font-size: 0.14rem;
        color: #f92d36;
      }
    }
    button {
      width: 0.6rem;
      height: 0.24rem;
      color: #fff;
      font-size: 0.12rem;
      background: #fc5d65;
      border-radius: 0.12rem;
      border: none;
      outline: none;
      margin-top: 0.08rem;
    }
  }
}

// 收益统计
.sytj {
  margin-top: 0.1rem;
  padding: 0rem 0.15rem;
  background: #fff;
  .wheader {
    height: 0.4rem;
    line-height: 0.4rem;
    font-size: 0.14rem;
    font-weight: 600;
    color: #333;
    span {
      display: inline-block;
      height: 0.1rem;
      width: 0.02rem;
      background: #fc5d65;
      margin-right: 0.07rem;
      // border-right: 2px solid #fc5d65;
    }
  }
  .wmain {
    display: flex;
    justify-content: space-around;
    border-top: 1px solid #f2f2f2;
    border-bottom: 1px solid #f2f2f2;
    div:nth-child(1) {
      line-height: 0.28rem;
      p:nth-child(1) {
        color: #333;
        font-size: 0.13rem;
      }
      p:nth-child(2) {
        color: #333;
        font-size: 0.13rem;
        span {
          color: #f92d36;
          font-size: 0.13rem;
        }
      }
      p:nth-child(3) {
        color: #333;
        font-size: 0.12rem;
        span {
          color: #333;
          font-size: 0.13rem;
        }
      }
    }
    div:nth-child(2) {
      line-height: 0.28rem;
      p:nth-child(1) {
        color: #333;
        font-size: 0.13rem;
      }
      p:nth-child(2) {
        color: #333;
        font-size: 0.12rem;
        span {
          color: #f92d36;
          font-size: 0.13rem;
        }
      }
      p:nth-child(3) {
        color: #333;
        font-size: 0.12rem;
        span {
          color: #333;
          font-size: 0.13rem;
        }
      }
    }
    div:nth-child(3) {
      line-height: 0.28rem;
      p:nth-child(1) {
        color: #333;
        font-size: 0.13rem;
      }
      p:nth-child(2) {
        color: #333;
        font-size: 0.12rem;
        span {
          color: #f92d36;
          font-size: 0.13rem;
        }
      }
      p:nth-child(3) {
        color: #333;
        font-size: 0.12rem;
        span {
          color: #333;
          font-size: 0.13rem;
        }
      }
    }
  }
}
</style>
