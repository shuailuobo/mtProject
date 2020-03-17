<template>
  <div class="container">
    <div>
      <van-card
        :price="goodsprice"
        :title="name"
        :thumb="thumb"
        :desc="'规格：' + goods_spec"
      >
        <div slot="num">已拼{{ buy_times }}</div>
      </van-card>
    </div>

    <div class="Groupdetails">
      <div class="Groupnum">
        还差<span>{{ lack_number }}</span
        >人成团
      </div>
      <div class="count_down">
        <div class="myc">
          距离结束还剩
          <van-count-down :time="expire_time" format="DD天HH:mm:ss">
            <template v-slot="timeData">
              <span class="item">{{ timeData.days }}天</span>
              <span class="item">{{ timeData.hours }}</span
              >: <span class="item">{{ timeData.minutes }}</span
              >:
              <span class="item">{{ timeData.seconds }}</span>
            </template>
          </van-count-down>
        </div>
      </div>
      <div class="Participant">
        <img
          v-for="(item, index) in order_list"
          :key="index"
          :src="item"
          alt=""
        />
      </div>
      <van-button size="large" color="#FC5D65" @click="payTap"
        >立即参团</van-button
      >
    </div>

    <section>
      <div class="baokuan">
        <header class="baokuan_header">
          <div></div>
          <h3>热销爆款</h3>
        </header>
        <div
          class="baokuan_main"
          v-for="(remGood, index) in remGoods"
          :key="index"
        >
          <div
            class="baokuan_mainBox"
            @click="
              $router.push({
                name: 'CommodityDetails',
                params: { id: remGood.id }
              })
            "
          >
            <div class="baokuan_main_left">
              <img :src="remGood.thumb" :alt="remGood.name" />
            </div>
            <div class="baokuan_main_right">
              <h3>{{ remGood.name }}</h3>
              <div class="baokuanjiage">
                <span>￥{{ remGood.price }}</span>
                <i>原价￥{{ remGood.market_price }}</i>
              </div>
              <!-- <div class="baokuanzigoujiage">已拼{{ remGood.buy_times }}</div> -->
              <div class="baokuanzigoujiage">
                自购预估提成<span>￥{{ remGood.user_profit }}</span>
              </div>
              <h4>
                <span
                  >代理购预估提成<i>￥{{ remGood.agent_profit }}</i></span
                >
                <div>已拼{{ remGood.buy_times }}</div>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import HeaderTop from "@/components/HeaderTop/index";
import GroupMall from "../../config/GroupMall";
export default {
  components: {
    HeaderTop
    // [Button.name]: Button
  },
  data() {
    return {
      title: "参与拼团",
      // jfchecked: true,
      // zhchecked: true,
      // dlchecked: true,
      // price: parseInt(this.$route.query.price) * 100,
      buy_times: "",
      goodsprice: "",
      desc: "",
      name: "",
      thumb: "",
      id: "",
      remGoods: "",
      initiator_id: "",
      goods_id: "",
      goods_spec: "",
      price_id: "",
      expire_time: 0,
      lack_number: "",
      order_list: [],
      group_status: ""
    };
  },
  mounted() {
    this.getTeamOrderDetail();
  },
  methods: {
    async getTeamOrderDetail() {
      try {
        let data = {
          id: this.$route.query.id
        };
        const response = await GroupMall.teamOrderDetail(data);
        window.console.log(response.data);
        if (response.data.err_code == 0) {
          this.id = response.data.data.id;
          this.goods_id = response.data.data.goods_id;
          this.initiator_id = response.data.data.initiator_id;
          this.buy_times = this.$route.query.buy_times;
          this.goodsprice = (
            response.data.data.money / response.data.data.number
          ).toFixed(2);
          this.name = response.data.data.goods_name;
          this.thumb = response.data.data.thumb;
          this.goods_spec = response.data.data.goods_spec;
          this.price_id = response.data.data.price_id;
          this.lack_number = response.data.data.lack_number;
          for (let i = 0; i < response.data.data.order_list.length; i++) {
            this.order_list.push(response.data.data.order_list[i].head_img_url);
          }
          // this.order_list.unshift(response.data.data.head_img_url);
          this.group_status = response.data.data.group_status;
          this.getdjsTimes(response.data.data.expire_time);
        }
      } catch (error) {
        window.console.log(error.response);
      }
    },
    getdjsTimes(time) {
      const nowDate = new Date().getTime();
      const oldTime = new Date(time.replace(/-/g, "/")).getTime();
      this.expire_time = oldTime - nowDate;
    },
    payTap() {
      if (this.group_status == 1) {
        this.$toast("拼团已结束！");
      } else {
        this.$router.push({
          name: "fillOrder",
          query: {
            initiator_id: this.initiator_id,
            id: this.goods_id,
            price: this.goodsprice,
            price_id: this.price_id,
            is_alone: 0,
            number: 1,
            spec: this.goods_spec,
            thumb: this.thumb,
            name: this.name
          }
        });
      }
    }
  },
  async created() {
    // try {
    //   let data = {
    //     user_id: this.$cookies.get("userid")
    //   };
    //   const response = await GroupMall.addressMemberInfo(data);
    //   window.console.log(response.data);
    //   if (response.data.err_code == 0) {
    //     if (
    //       response.data.data.addr_data != "" &&
    //       response.data.data.addr_data != null &&
    //       response.data.data.addr_data != undefined
    //     ) {
    //       this.isAddressInfo = true;
    //       this.userName = response.data.data.addr_data.contact;
    //       this.phone = response.data.data.addr_data.phone;
    //       this.addressDetail =
    //         response.data.data.addr_data.province +
    //         response.data.data.addr_data.city +
    //         response.data.data.addr_data.district +
    //         response.data.data.addr_data.address;
    //       this.addressId = response.data.data.addr_data.id;
    //     }
    //   }
    // } catch (error) {
    //   window.console.log(error.response);
    // }

    try {
      const response = await GroupMall.getGroupMallbkGoods(); //热销爆款
      window.console.log(response.data);
      this.remGoods = response.data.data;
    } catch (error) {
      window.console.log(error.response);
    }
  }
  // mounted() {
  //   this.common.login();
  // }
};
</script>
<style lang="less" scoped>
// 团购详情
.Groupdetails {
  padding: 0.1rem 0.15rem;
  background: #fff;
  margin-top: 0.1rem;
  .Groupnum {
    text-align: center;
    font-size: 0.16rem;
    span {
      font-size: 0.2rem;
      color: #fc5d65;
      font-weight: 600;
    }
  }
  .count_down {
    // max-width: 2.2rem;
    margin: 0.15rem 0;
    padding: 0 0.2rem;
    .myc {
      display: flex;
      justify-content: center;
      background: rgba(252, 93, 101, 0.1);
      color: #fc5d65;
      font-size: 0.12rem;
      line-height: 0.2rem;
      border-radius: 0.1rem;
      padding: 0.03rem 0;
    }
  }
  .van-count-down {
    margin-left: 0.05rem;
    color: #fc5d65;
  }
  .Participant {
    display: flex;
    justify-content: center;
    overflow: scroll;
    margin-bottom: 0.2rem;
    img {
      width: 0.4rem;
      height: 0.4rem;
      border-radius: 50%;
      // margin: 0 auto;
      margin: 0 0.05rem;
    }
  }
}

.baokuan {
  box-sizing: border-box;
  padding: 0 0.15rem;
  background: #fff;
  margin-top: 0.1rem;
  .baokuan_header {
    height: 0.4rem;
    display: flex;
    align-items: center;
    div {
      width: 0.02rem;
      height: 0.14rem;
      background-color: #fc5d65;
      margin-right: 0.055rem;
      transform: translate(0, 0.01rem);
    }
    h3 {
      font-size: 0.14rem;
      font-weight: 700;
    }
  }
  .baokuan_main {
    height: 1.4rem;
    padding: 0.05rem 0;
    position: relative;
    border-bottom: 1px solid #eee;
    // @include bottom-border-1px(#eee);
    .baokuan_mainBox {
      height: 1.2rem;
      display: flex;
      justify-content: flex-start;
      overflow: hidden;
      .baokuan_main_left {
        // float: left;
        width: 1.2rem;
        height: 1.2rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .baokuan_main_right {
        // float: left;
        padding-left: 0.1rem;
        width: 2.3rem;
        > h3 {
          line-height: 0.2rem;
          max-width: 2.085rem;
          font-size: 0.13rem;
          font-weight: 700;
          color: #333;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .baokuanjiage {
          margin-top: 0.125rem;
          span {
            font-size: 0.16rem;
            color: #f92d36;
            margin-right: 0.15rem;
          }
          i {
            font-style: normal;
            font-size: 0.1rem;
            color: #999999;
            position: relative;
            &::before {
              content: "";
              width: 100%;
              height: 1px;
              background-color: #999999;
              position: absolute;
              top: 0.06rem;
              left: 0;
              transform: rotate(7deg);
              -ms-transform: rotate(7deg);
              -webkit-transform: rotate(7deg);
              -o-transform: rotate(7deg);
            }
          }
        }
        .baokuanzigoujiage {
          margin-top: 0.05rem;
          font-style: normal;
          font-size: 0.11rem;
          color: #999999;
          span {
            margin-left: 0.05rem;
            color: #f92d36;
          }
        }
        h4 {
          margin-top: 0.05rem;
          font-size: 0.11rem;
          color: #999999;
          position: relative;
          span {
            i {
              font-style: normal;
              margin-left: 0.05rem;
              color: #f92d36;
            }
          }
          div {
            font-style: normal;
            position: absolute;
            top: 0;
            right: 0;
          }
        }
      }
    }
  }
}

.item {
  display: inline-block;
  // width: 22px;
  padding: 0 4px;
  margin-right: 5px;
  color: #fff;
  font-size: 12px;
  text-align: center;
  background-color: #fc5d65;
  border-radius: 0.04rem;
}
</style>
