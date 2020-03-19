<template>
  <div class="container">
    <!-- <HeaderTop :title="title"></HeaderTop> -->
    <!-- 详情头部 -->
    <!-- <div class="box">
      <section>
        <div class="header">
          <h3>商品配送中</h3>
          <div class="header_card">
            <div class="card_left"><img
                src="../../assets/order/wuliu@2x.png"
                alt=""
              ></div>
            <div class="card_right">
              <h3>已抵达南京市栖霞区分布</h3>
              <p>更新时间:<i>2019-01-22 15:55</i></p>
            </div>
            <div class="icon"><img
                src="../../assets/order/r@2x.png"
                alt=""
              ></div>
          </div>
        </div>
      </section> -->
    <!-- 客戶收貨信息開始 -->
    <section>
      <div class="xinxi">
        <div>
          <img src="../../assets/order/dinwei@2x.png" alt="" />
          <h3>
            {{ contact }}<i>{{ phone }}</i>
          </h3>
        </div>
        <p>
          地址 :<i>{{ province }}{{ city }}{{ district }}{{ address }}</i>
        </p>
      </div>
    </section>
    <!-- 商品圖開始 -->
    <section>
      <van-card
        :num="number"
        :price="(total_price / number).toFixed(2)"
        :desc="'规格：' + goods_spec"
        :title="name"
        :thumb="thumb"
      />
    </section>
    <!-- 订单详情开始 -->
    <section>
      <div class="dindan">
        <h3>
          <p>订单编号</p>
          <span>{{ out_trade_no }}</span>
        </h3>
        <h3>
          <p>下单时间</p>
          <span>{{ create_time }}</span>
        </h3>
      </div>
    </section>
    <!-- 价格明细开始 -->
    <section>
      <div class="minxi">
        <ul>
          <li>
            <p>商品</p>
            <span>¥{{ total_price }}</span>
          </li>
          <li>
            <p>账户积分抵扣</p>
            <span>-{{ point }}</span>
          </li>
          <li>
            <p>账户余额抵扣</p>
            <span>-¥{{ money }}</span>
          </li>
          <li>
            <p>运费信息</p>
            <span>¥{{ shipping_fee }}</span>
          </li>
        </ul>
        <h3>
          <p>实付金额</p>
          <span>￥{{ order_price }}</span>
        </h3>
      </div>
    </section>
    <!-- 底部确认收货开始 -->
    <section>
      <van-tabbar style="height:0.4rem;">
        <div class="queren">
          <van-button
            type="default"
            :hairline="true"
            class="mybtn"
            v-if="isConfirm"
            @click="confirmTap()"
            >确认收货</van-button
          >
          <van-button
            type="default"
            :hairline="true"
            class="mybtn"
            style="margin-left:0.075rem"
            @click="ApplicationRefund"
            v-if="isRefund"
            >申请退换</van-button
          >
        </div>
      </van-tabbar>
    </section>
  </div>
</template>
<script>
import GroupMall from "../../config/GroupMall";
import { Toast, Dialog } from "vant";

export default {
  components: {
    [Toast.name]: Toast,
    [Dialog.Component.name]: Dialog.Component
  },
  data() {
    return {
      title: "订单详情",
      address: "",
      city: "",
      contact: "",
      create_time: "",
      district: "",
      goods_id: "",
      money: "",
      number: "",
      out_trade_no: "",
      phone: "",
      province: "",
      shipping_fee: "",
      goods_spec: "",
      thumb: "",
      description: "",
      name: "",
      // goodsprice: "",
      point: "",
      isRefund: false,
      isConfirm: false,
      order_list: [],
      total_price: "",
      order_price: ""
    };
  },
  methods: {
    ApplicationRefund() {
      this.$router.push({
        name: "Refund",
        query: {
          goods_spec: this.goods_spec,
          name: this.name,
          thumb: this.thumb,
          number: this.number,
          money: (this.total_price / this.number).toFixed(2),
          out_trade_no: this.out_trade_no,
          contact: this.contact,
          phone: this.phone
        }
      });
    },
    async confirmTap() {
      let data = {
        id: this.$route.query.id
      };
      try {
        const response = await GroupMall.groupOrderFinishe(data);
        window.console.log(response.data);
        if (response.data.err_code == 0) {
          this.myGroupOrderDetail();
          Dialog.alert({
            message: "已确认收货"
          }).then(() => {
            // on close
          });
        }
      } catch (error) {
        window.console.log(error.response);
      }
    },
    async myGroupOrderDetail() {
      let data = {
        id: this.$route.query.id
      };
      try {
        const response = await GroupMall.groupOrderDetail(data);
        window.console.log(response.data);
        if (response.data.err_code == 0) {
          if (
            response.data.data.pay_status == "1" &&
            response.data.data.status == "2"
          ) {
            this.isRefund = true;
          } else {
            this.isRefund = false;
          }

          if (response.data.data.status == "1") {
            this.isConfirm = true;
          } else {
            this.isConfirm = false;
          }
          this.order_list = response.data.data.order_list;

          this.address = response.data.data.address;
          this.city = response.data.data.city;
          this.contact = response.data.data.contact;
          this.create_time = response.data.data.create_time;
          this.district = response.data.data.district;
          this.goods_id = response.data.data.goods_id;
          this.money = response.data.data.money;
          // this.goodsprice = response.data.data.total_price;
          this.total_price = response.data.data.total_price;
          this.order_price = response.data.data.order_price;
          this.number = response.data.data.number;
          this.out_trade_no = response.data.data.out_trade_no;
          this.phone = response.data.data.phone;
          this.province = response.data.data.province;
          this.shipping_fee = response.data.data.shipping_fee;
          this.status = response.data.data.status;
          this.goods_spec = response.data.data.goods_spec;
          this.point = response.data.data.point;
          this.thumb = response.data.data.thumb;
          this.name = response.data.data.goods_name;
        }
      } catch (error) {
        window.console.log(error.response);
      }
    }
  },
  async created() {},
  mounted() {
    this.myGroupOrderDetail();
  }
};
</script>
<style lang="less" scoped>
.van-card {
  background: #fff;
}

.box {
  box-sizing: border-box;
  width: 100%;
}
.header {
  > h3 {
    font-size: 0.18rem;
    font-weight: bold;
    margin-left: 0.31rem;
    transform: translateY(0.205rem);
    color: #fff;
  }
  position: relative;
  height: 0.9rem;
  background: -moz-linear-gradient(left, #ff8635 0%, #ff6735 100%);
  background: -webkit-gradient(
    linear,
    left,
    right,
    color-stop(0%, #ff8635),
    color-stop(100%, #ff6735)
  );
  background: -webkit-linear-gradient(left, #ff8635 0%, #ff6735 100%);
  background: -o-linear-gradient(left, #ff8635 0%, #ff6735 100%);
  background: -ms-linear-gradient(left, #ff8635 0%, #ff6735 100%);
  background: linear-gradient(to right, #ff8635 0%, #ff6735 100%);
  .header_card {
    position: relative;
    display: flex;
    z-index: 9999;
    align-items: center;
    // width: 6.9rem;
    width: 90%;
    height: 0.6rem;
    background-color: #fff;
    position: absolute;
    top: 0.6rem;
    left: 0.15rem;
    padding: 0.17rem 0.13rem;
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    .card_left {
      margin-right: 0.2rem;
      img {
        width: 0.2rem;
        height: 0.19rem;
      }
    }
    .card_right {
      font-size: 0.12rem;
      > h3 {
        color: #333;
        font-weight: bold;
      }
      > p {
        margin-top: 0.075rem;
        color: #666;
        > i {
          margin-left: 0.05rem;
          font-style: normal;
        }
      }
    }
    .icon {
      position: absolute;
      right: 0.15rem;
      top: 50%;
      transform: translateY(-50%);
      img {
        width: 0.045rem;
        height: 0.08rem;
      }
    }
  }
}
.xinxi {
  // height: 1.01rem;
  background-color: #fff;
  padding: 0.2rem 0.145rem;
  font-size: 0.12rem;
  color: #333;
  div {
    display: flex;
    align-items: center;
    img {
      margin-right: 0.075rem;
      width: 0.12rem;
      height: 0.14rem;
    }
    h3 {
      i {
        font-style: normal;
        margin-left: 0.1rem;
      }
    }
  }
  p {
    margin-top: 0.075rem;
    margin-left: 0.025rem;
    i {
      font-style: normal;
      margin-left: 0.075rem;
    }
  }
}
.baokuan_main {
  box-sizing: border-box;
  background-color: #fff;
  margin-top: 0.1rem;
  padding: 0.15rem 0.15rem;
  height: 1.3rem;
  // padding: 0.1rem 0;
  position: relative;
  border-bottom: 1px solid #eee;
  // @include bottom-border-1px(#eee);
  .baokuan_mainBox {
    //   height: 2.4rem;
    // display: flex;
    overflow: hidden;
    .baokuan_main_left {
      float: left;
      width: 1.2rem;
      height: 1.2rem;
      img {
        width: 1rem;
        height: 1rem;
      }
    }
    .baokuan_main_right {
      float: left;
      // padding-left: 0.1rem;
      > h3 {
        line-height: 0.2rem;
        max-width: 2.085rem;
        font-size: 0.13rem;
        font-weight: 700;
        color: #333;
      }
      .baokuanjiage {
        //   margin-top: 0.15rem;
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
        i {
          margin-left: 0.05rem;
          font-style: normal;
        }
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
.dindan {
  margin-top: 0.1rem;
  height: 0.8rem;
  background-color: #fff;
  font-size: 0.12rem;
  h3 {
    height: 0.4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.16rem;
    p {
      color: #666;
    }
    span {
      color: #333;
      font-weight: normal;
    }
  }
}
.minxi {
  height: 1.57rem;
  background-color: #fff;
  margin-top: 0.1rem;
  padding: 0 0.155rem;
  font-size: 0.12rem;
  ul {
    border-bottom: 1px solid #eee;
    // @include bottom-border-1px(#eee);
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      line-height: 0.3rem;
      p {
        color: #999;
      }
      span {
        color: #333;
        font-size: 0.14rem;
      }
    }
  }
  h3 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 0.3rem;
    p {
      color: #999;
    }
    span {
      font-size: 0.14rem;
      color: #f92d36;
    }
  }
}
.queren {
  position: absolute;
  right: 0.25rem;
  line-height: 0.4rem;
}
.mybtn {
  height: 0.26rem;
  // border:1px solid rgba(153,153,153,1);
  border-color: rgba(153, 153, 153, 1);

  line-height: 0.26rem;
}
</style>
