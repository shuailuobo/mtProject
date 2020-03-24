<template>
  <div class="container">
    <div
      v-if="!isAddressInfo"
      class="addAddress"
      @click="$router.push({ name: 'AddressList' })"
    >
      <div>
        <van-icon name="add" color="#FC5D65" size="24px" />
        <p>添加地址</p>
      </div>
      <van-icon name="arrow" />
    </div>

    <div v-else class="addAddre" @click="$router.push({ name: 'AddressList' })">
      <div style="width:100%;display:flex;">
        <van-icon name="location" color="#FC5D65" size="24px" />
        <div style="margin:0 0.05rem;">
          <div>{{ userName }},{{ phone }}</div>
          <div>{{ addressDetail }}</div>
        </div>
      </div>
      <van-icon name="arrow" />
    </div>

    <div>
      <van-card
        :num="buy_times"
        :price="goodsprice"
        :desc="spec"
        :title="name"
        :thumb="thumb"
      >
        <div slot="num">X{{ buy_times }}</div>
      </van-card>
      <van-cell center title="购买数量">
        <van-stepper v-model="buy_times" />
      </van-cell>
    </div>

    <div>
      <van-cell-group>
        <!-- <van-cell
          title="优惠信息"
          value="满79减20"
        /> -->
        <van-cell title="运费信息" value="包邮" />
      </van-cell-group>
    </div>

    <div>
      <ul class="discounts">
        <li>
          <p>我的积分：{{ point }}</p>
          <p>使用我的账户积分抵扣</p>
          <!-- <p>
            <span>{{ point }}</span>
          </p> -->
          <p>
            <van-switch
              size="14px"
              v-model="jfchecked"
              @change="jfTap"
              active-color="#4CD864"
            />
          </p>
        </li>
        <li>
          <p>我的账户：{{ money }}元</p>
          <p>使用我的账户余额抵扣</p>
          <!-- <p>
            <span>{{ money }}</span
            >元
          </p> -->
          <p>
            <van-switch
              size="14px"
              v-model="zhchecked"
              @change="zhTap"
              active-color="#4CD864"
            />
          </p>
        </li>
        <!-- <li>
          <p>代理账户：528元</p>
          <p>使用代理账户余额</p>
          <p>抵扣<span>500</span>元</p>
          <p>
            <van-switch
              size="14px"
              v-model="dlchecked"
              active-color="#4CD864"
            />
          </p>
        </li> -->
      </ul>
    </div>

    <div>
      <van-submit-bar
        :price="payPrice"
        button-text="去支付"
        @submit="onSubmit"
      />
    </div>
  </div>
</template>
<script>
// import HeaderTop from "@/components/HeaderTop/index";
import GroupMall from "../../config/GroupMall";
import { Dialog } from "vant";
import wx from "weixin-jsapi";
export default {
  components: {
    // HeaderTop
    [Dialog.Component.name]: Dialog.Component
  },
  data() {
    return {
      title: "限时折扣",
      jfchecked: false,
      zhchecked: false,
      dlchecked: false,
      // price: Math.round(this.$route.query.price * 100),
      price: this.$route.query.price,
      buy_times: 1,
      goodsprice: "",
      spec: "",
      name: "",
      thumb: "",
      id: "",
      isAddressInfo: false,
      userName: "",
      phone: "",
      addressDetail: "",
      addressId: "",
      point: "",
      money: "",
      choosepoint: 0,
      choosemoney: 0
    };
  },
  computed: {
    payPrice() {
      return parseInt(Number(this.price * this.buy_times) * 100);
    }
  },
  async created() {
    this.buy_times = this.$route.query.number;
    this.goodsprice = this.$route.query.price;
    this.name = this.$route.query.name;
    this.thumb = this.$route.query.thumb;
    this.spec = "规格：" + this.$route.query.spec;
    try {
      let data = {
        user_id: this.$cookies.get("userid")
      };
      const response = await GroupMall.addressMemberInfo(data);
      window.console.log(response.data);
      if (response.data.err_code == 0) {
        this.point = response.data.data.point;
        this.money = response.data.data.money;
        if (
          response.data.data.addr_data != "" &&
          response.data.data.addr_data != null &&
          response.data.data.addr_data != undefined
        ) {
          this.isAddressInfo = true;
          this.userName = response.data.data.addr_data.contact;
          this.phone = response.data.data.addr_data.phone;
          this.addressDetail =
            response.data.data.addr_data.province +
            response.data.data.addr_data.city +
            response.data.data.addr_data.district +
            response.data.data.addr_data.address;
          this.addressId = response.data.data.addr_data.id;
        }
      }
    } catch (error) {
      window.console.log(error.response);
    }
  },
  methods: {
    jfTap(value) {
      if (value) {
        this.choosepoint = this.point;
      } else {
        this.choosepoint = 0;
      }
    },
    zhTap(value) {
      if (value) {
        this.choosemoney = Number(this.money);
      } else {
        this.choosemoney = 0;
      }
    },
    async onSubmit() {
      try {
        let data;
        if (this.$route.query.is_alone == 1) {
          data = {
            //initiator_id 团长id  传空就是普通订单 不传就是团长了
            user_id: this.$cookies.get("userid"),
            goods_id: this.$route.query.id,
            price_id: this.$route.query.price_id,
            is_alone: this.$route.query.is_alone,
            number: this.buy_times,
            address_id: this.addressId
            // point: this.point,
            // money: this.money
          };
        } else {
          if (
            this.$route.query.initiator_id != "" &&
            this.$route.query.initiator_id != undefined
          ) {
            data = {
              //initiator_id 团长id  传空就是普通订单 不传就是团长了 如果是参团的，is_initiator=0
              user_id: this.$cookies.get("userid"),
              goods_id: this.$route.query.id,
              price_id: this.$route.query.price_id,
              is_alone: this.$route.query.is_alone,
              number: this.buy_times,
              address_id: this.addressId,
              // point: this.point,
              // money: this.money,
              initiator_id: this.$route.query.initiator_id,
              is_initiator: 0
            };
          } else {
            data = {
              //initiator_id 团长id  传空就是普通订单 不传就是团长了 如果是发起拼团的，is_initiator=1
              user_id: this.$cookies.get("userid"),
              goods_id: this.$route.query.id,
              price_id: this.$route.query.price_id,
              is_alone: this.$route.query.is_alone,
              number: this.buy_times,
              address_id: this.addressId,
              // point: this.point,
              // money: this.money,
              is_initiator: 1
            };
          }
        }

        if (this.addressId != "") {
          const response = await GroupMall.checkout(data);
          window.console.log(response.data);
          if (response.data.err_code == 0) {
            this.Pay(response.data.data.out_trade_no);
          }
        } else {
          alert("请选择地址");
        }
      } catch (error) {
        window.console.log(error.response);
      }
    },
    async Pay(out_trade_no) {
      var that = this;
      try {
        let data = {
          user_id: this.$cookies.get("userid"),
          out_trade_no: out_trade_no,
          point: this.choosepoint,
          money: this.choosemoney
        };

        const response = await GroupMall.pay(data);
        window.console.log(response.data);
        // this.$router.push({ name: "PaySucceed" });
        if (response.data.err_code == 0) {
          // window.console.log(response.data.data.length);
          if (response.data.data.length == 0) {
            Dialog.alert({
              title: "提示",
              message: "账户抵扣成功"
            }).then(() => {
              that.$router.replace({ name: "PaySucceed" });
            });
          } else {
            wx.chooseWXPay({
              appId: response.data.data.appid, //公众号名称，由商户传入
              timestamp: response.data.data.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
              nonceStr: response.data.data.nonceStr, // 支付签名随机串，不长于 32 位
              package: "prepay_id=" + response.data.data.prepayid, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
              signType: response.data.data.sign, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
              paySign: response.data.data.paySign, // 支付签名
              success: function(res) {
                window.console.log(res);
                that.$router.replace({ name: "PaySucceed" });
              }
            });
          }
          // this.$router.push({ name: "ShopDetail", params: { id: id } });
        }
      } catch (error) {
        window.console.log(error.response);
      }
    }
  },
  mounted() {
    this.common.login();
  }
};
</script>
<style lang="less" scoped>
.van-card {
  background: #fff;
}

.van-button--danger {
  background-color: #fc5d65;
  border: 1px solid #fc5d65;
}

.van-submit-bar__price {
  color: #fc5d65;
}

.addAddress {
  display: flex;
  justify-content: space-between;
  padding: 0.1rem 0.15rem;
  background: #fff;
  margin-bottom: 0.1rem;
  div {
    display: flex;
    justify-content: start;
    p {
      font-size: 0.14rem;
      line-height: 0.24rem;
      margin-left: 0.1rem;
    }
  }
}

.addAddre {
  display: flex;
  justify-content: space-between;
  padding: 0.1rem 0.15rem;
  background: #fff;
  margin-bottom: 0.1rem;
  div {
    font-size: 0.13rem;
    margin: 0.05rem 0;
  }
  .van-icon {
    margin-top: 0.12rem;
  }
}

.discounts {
  margin-top: 0.1rem;
  padding: 0 0.1rem;
  background: #fff;
  li {
    display: flex;
    justify-content: space-between;
    font-size: 0.12rem;
    border-bottom: 1px solid #f2f2f2;
    padding: 0.1rem 0;
  }
}
</style>
