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
      <van-tab class="resets" title="外卖配送">
        <div slot="">
          <div class="header">
            <div class="addressdetail">
              <div
                class="addrestop"
                v-if="!isAddressInfo"
                @click="$router.push({ name: 'AddressList' })"
              >
                <div class="address_1">
                  <p>添加地址</p>
                  <!-- <span>{{ userName }}<span>{{ phone }}</span></p> -->
                </div>
                <div @click="addressEdit">
                  <img src="../../assets/aw1.png" alt="" />
                </div>
              </div>

              <div
                class="addrestop"
                v-else
                @click="$router.push({ name: 'AddressList' })"
              >
                <div class="address_1">
                  <p>{{ addressDetail }}</p>
                  <p>
                    {{ userName }}<span>{{ phone }}</span>
                  </p>
                </div>
                <div @click="addressEdit">
                  <img src="../../assets/aw1.png" alt="" />
                </div>
              </div>
              <!-- <div class="arrivetime">
                <p>送达时间</p>
                <p @click="chooseTime">
                  {{ arriveTime }}<img src="../../assets/aw2.png" alt="" />
                </p>
              </div> -->
            </div>
          </div>
          <div class="goods">
            <div class="goodsname">{{ name }}</div>
            <div
              class="goodsdetail"
              v-for="(item, index) in selectFoods"
              :key="index"
            >
              <div>
                <img :src="item.thumb" alt="" />
              </div>
              <div class="goodstitle">
                <p>{{ item.goods_name }}</p>
                <p>
                  ￥{{ item.price }}<span>x</span
                  ><span>{{ item.quantity }}</span>
                </p>
              </div>
            </div>
          </div>
          <!-- <div class="discount">
            <p>优惠</p>
            <p>{{ coupon_name }}</p>
          </div> -->
          <div class="distribution">
            <div class="">
              <p>配送方式</p>
              <p>{{ shipping_type == "1" ? "外卖配送" : "到店自取" }}</p>
            </div>
            <div class="freight">
              <p>配送费</p>
              <p>￥{{ delivery_fee }}</p>
            </div>
          </div>
          <ul class="discounts">
            <li>
              <p>我的积分：{{ point }}</p>
              <p>使用我的账户积分</p>
              <p>
                抵扣<span>{{ point }}</span
                >元
              </p>
              <p>
                <van-switch
                  size="14px"
                  v-model="jfchecked"
                  active-color="#4CD864"
                />
              </p>
            </li>
            <li>
              <p>我的账户：{{ money }}元</p>
              <p>使用我的账户余额</p>
              <p>
                抵扣<span>{{ money }}</span
                >元
              </p>
              <p>
                <van-switch
                  size="14px"
                  v-model="zhchecked"
                  active-color="#4CD864"
                />
              </p>
            </li>
          </ul>

          <div>
            <van-submit-bar
              :price="totalPrice"
              button-text="确认支付"
              button-type="primary"
              @submit="onSubmit"
            />
          </div>
        </div>
      </van-tab>
      <van-tab class="resets" title="到店自取">
        <div slot="">
          <div class="header">
            <div class="storeaddress">
              <p>{{ storeaddress }}</p>
            </div>
            <div class="addressdetails">
              <div class="addressdetails_1">
                <div class="arrivetimes">
                  <p>自提时间</p>
                  <p @click="chooseTime">
                    {{ arriveTime }}<img src="../../assets/aw2.png" alt="" />
                  </p>
                </div>
                <div class="addrestop_2">
                  <div class="address_2">
                    <p>预留手机</p>
                    <input type="number" v-model="userPhone" />
                    <img src="../../assets/aw2.png" alt="" />
                  </div>
                </div>
              </div>
              <div class="agreement">
                <van-checkbox v-model="serviceChecked" checked-color="#F92D36">
                  我已同意并接受
                </van-checkbox>
                <p class="service">《到店自取服务协议》</p>
              </div>
            </div>
          </div>
          <div class="goods">
            <div class="goodsname">{{ name }}</div>
            <div
              class="goodsdetail"
              v-for="(item, index) in selectFoods"
              :key="index"
            >
              <div>
                <img :src="item.thumb" alt="" />
              </div>
              <div class="goodstitle">
                <p>{{ item.goods_name }}</p>
                <p>
                  ￥{{ item.price }}<span>x</span
                  ><span>{{ item.quantity }}</span>
                </p>
              </div>
            </div>
          </div>
          <!-- <div class="discount">
            <p>优惠</p>
            <p>{{ coupon_name }}</p>
          </div> -->
          <div class="distribution">
            <div class="">
              <p>配送方式</p>
              <p>{{ shipping_type == "1" ? "外卖配送" : "到店自取" }}</p>
            </div>
          </div>
          <ul class="discounts">
            <li>
              <p>我的积分：{{ point }}</p>
              <p>使用我的账户积分</p>
              <p>
                抵扣<span>{{ point }}</span
                >元
              </p>
              <p>
                <van-switch
                  size="14px"
                  v-model="jfchecked"
                  active-color="#4CD864"
                />
              </p>
            </li>
            <li>
              <p>我的账户：{{ money }}元</p>
              <p>使用我的账户余额</p>
              <p>
                抵扣<span>{{ money }}</span
                >元
              </p>
              <p>
                <van-switch
                  size="14px"
                  v-model="zhchecked"
                  active-color="#4CD864"
                />
              </p>
            </li>
          </ul>

          <div>
            <van-submit-bar
              :price="totalPrice"
              button-text="确认支付"
              button-type="primary"
              @submit="onSubmit"
            />
          </div>
        </div>
      </van-tab>
    </van-tabs>
    <div class="datetimepicker" v-if="arrivetimeflag">
      <van-datetime-picker
        v-model="currentDate"
        type="time"
        :min-hour="minHour"
        :max-hour="maxHour"
        @confirm="onConfirm"
        @cancel="onCancel"
      />
    </div>
  </div>
</template>
<script>
import "../../../static/css/vantreset.css";
import GroupMall from "../../config/GroupMall";
import MicroShop from "../../config/MicroShop";
import wx from "weixin-jsapi";
import { Toast } from "vant";
export default {
  components: { [Toast.name]: Toast },
  name: "delivery",
  data() {
    return {
      title: "配送",
      currentDate: "12:00",
      minHour: 0,
      maxHour: 23,
      arrivetimeflag: false,
      arriveTime: "请选择",
      discount: "4",
      radio: "1",
      isAddressInfo: false,
      userName: "",
      phone: "",
      addressDetail: "",
      shipping_type: "1",
      serviceChecked: true,
      storeaddress: "",
      delivery_fee: "",
      name: "",
      // coupon_name: "",
      is_delivery: "",
      is_self: "",
      selectFoods: [],
      jfchecked: false,
      zhchecked: false,
      money: "",
      point: "",
      addressId: "",
      userPhone: ""
    };
  },
  methods: {
    onClick(index) {
      this.shipping_type = index + 1;
    },
    onConfirm(value) {
      this.arrivetimeflag = false;
      this.arriveTime = value;
    },
    onCancel() {
      this.arrivetimeflag = false;
    },
    // onSubmit(index, title) {
    //   // this.$toast(title);
    //   this.$router.push({ name: "SuccessPay" });
    // },
    async onSubmit() {
      try {
        let data = {
          user_id: this.$cookies.get("userid"),
          shipping_type: this.shipping_type,
          addr_id: this.addressId,
          point: this.point,
          money: this.money,
          pick_time: this.arriveTime,
          valid_phone: this.userPhone
        };

        if (this.addressId != "") {
          const response = await MicroShop.orderCheckout(data);
          window.console.log(response.data);
          if (response.data.err_code == 0) {
            this.Pay(response.data.data.out_trade_no);
          }
        } else {
          Toast("请选择地址");
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
          point: this.point
        };

        const response = await MicroShop.microOrderPay(data);
        window.console.log(response.data);
        // this.$router.push({ name: "PaySucceed" });
        if (response.data.err_code == 0) {
          let out_trade_no = response.data.data.out_trade_no;
          wx.chooseWXPay({
            appId: response.data.data.appid, //公众号名称，由商户传入
            timestamp: response.data.data.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
            nonceStr: response.data.data.nonceStr, // 支付签名随机串，不长于 32 位
            package: "prepay_id=" + response.data.data.prepayid, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
            signType: response.data.data.sign, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
            paySign: response.data.data.paySign, // 支付签名
            success: function(res) {
              window.console.log(res);
              that.$router.push({
                name: "SuccessPay",
                query: { out_trade_no: out_trade_no }
              });
            }
          });
          // this.$router.push({ name: "ShopDetail", params: { id: id } });
        }
      } catch (error) {
        window.console.log(error.response);
      }
    },
    addressEdit() {
      this.$router.push({ name: "AddressList" });
    },
    chooseTime() {
      this.arrivetimeflag = true;
    }
  },
  mounted() {
    this.common.login();
  },
  async created() {
    try {
      let data = {
        user_id: this.$cookies.get("userid")
        // user_id: "582"
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
          this.userPhone = response.data.data.addr_data.phone;
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

    try {
      let data = {
        id: this.$route.query.store_id
      };
      const response = await MicroShop.getStoreInfo(data);
      window.console.log(response.data);
      this.storeaddress = response.data.data.address;
      // this.phone = response.data.data.phone;
      this.delivery_fee = response.data.data.delivery_fee;
      this.name = response.data.data.name;
      // this.coupon_name = response.data.data.coupon_name;
      this.is_delivery = response.data.data.is_delivery;
      this.is_self = response.data.data.is_self;
    } catch (error) {
      window.console.log(error.response);
    }

    try {
      let data = {
        user_id: this.$cookies.get("userid"),
        store_id: this.$route.query.store_id
      };
      const response = await MicroShop.cartLists(data);
      window.console.log(response.data);
      if (response.data.err_code == 0) {
        this.selectFoods = response.data.data;
      }
    } catch (error) {
      window.console.log(error.response);
    }
  },
  computed: {
    totalPrice() {
      let total = 0;
      // console.log(this.selectFoods);
      this.selectFoods.forEach(food => {
        total += food.price * food.quantity * 100;
      });
      return total;
    }
  }
};
</script>

<style lang="less" scoped>
// .van-button--danger {
//   background-color: #59d178;
//   border: 1px solid #59d178;
// }

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

.header {
  width: 100%;
  height: 1.84rem;
  background: linear-gradient(left, #ff8635, #ff6735);
  // position: relative;
  top: -0.1rem;
  // z-index: -1;
}

.van-tabs--card {
  padding-top: 0.1rem;
}

.resets {
  margin-top: -0.4rem;
  // position: static;
}

.addressdetail {
  background: #fff;
  position: absolute;
  top: 0.6rem;
  left: 0.15rem;
  padding: 0.15rem;
  border-radius: 0.04rem;
  width: 3.45rem;
}

.arrivetime p {
  display: inline-block;
  font-size: 0.12rem;
  color: #333;
  line-height: 0.22rem;
}

.arrivetime p:nth-child(2) {
  float: right;
  color: #2847e0;
}

.arrivetime p img {
  width: 0.05rem;
  height: 0.08rem;
  margin-left: 0.05rem;
}

.addrestop {
  min-height: 0.4rem;
}

.addrestop div {
  display: inline-block;
}

.addrestop div:nth-child(2) {
  float: right;
}

.addrestop div img {
  width: 0.06rem;
  height: 0.1rem;
  margin-top: 0.15rem;
}

.address_1 p:nth-child(1) {
  font-size: 0.14rem;
  font-weight: 600;
  color: #333;
}

.address_1 p:nth-child(2) {
  font-size: 0.12rem;
  color: #333;
  margin: 0.15rem 0;
}

.address_2 p:nth-child(1) {
  font-size: 0.12rem;
  color: #666;
}

.address_2 p:nth-child(2) {
  font-size: 0.12rem;
  color: #333;
  margin-top: 0.15rem;
}

.datetimepicker {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 999;
}

.goods {
  // position: absolute;
  // top: 1.85rem;
  width: 100%;
  background: #fff;
  padding: 0 0.15rem 0.15rem 0.15rem;
}

.goods img {
  width: 0.6rem;
  height: 0.6rem;
  margin-right: 0.1rem;
}

.goodsname {
  font-size: 0.14rem;
  font-weight: 600;
  line-height: 0.4rem;
}

.goodsdetail {
  display: flex;
  margin: 0.05rem 0;
}

.goodstitle p:nth-child(1) {
  font-size: 0.14rem;
  font-weight: 600;
  color: #333;
  max-width: 2.75rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.goodstitle p:nth-child(2) {
  font-size: 0.13rem;
  font-weight: 600;
  color: #f92d36;
  margin-top: 0.3rem;
}

.goodstitle p:nth-child(2) span:nth-child(1) {
  font-size: 0.12rem;
  color: #999;
  margin: 0 0.04rem;
}

.goodstitle p:nth-child(2) span:nth-child(2) {
  font-size: 0.12rem;
  color: #333;
}

.discount {
  // position: absolute;
  // top: 3.12rem;
  width: 100%;
  background: #fff;
  padding: 0.1rem 0.15rem;
  display: flex;
  justify-content: space-between;
}

.discount p {
  font-size: 0.13rem;
  font-weight: 600;
  color: #333;
}

.discount p:nth-child(2) {
  font-weight: normal;
}

.distribution {
  // position: absolute;
  // top: 4.45rem;
  width: 100%;
  background: #fff;
  padding: 0rem 0.15rem;
}

.distribution div {
  display: flex;
  justify-content: space-between;
  padding: 0.1rem 0;
  font-size: 0.13rem;
}

.distribution div p:nth-child(1) {
  font-weight: 600;
}

.arrivetimes {
  margin-top: 0.05rem;
}

.arrivetimes p {
  display: block;
}

.arrivetimes p:nth-child(1) {
  color: #666;
  font-size: 0.12rem;
}

.arrivetimes p:nth-child(2) {
  color: #333;
  font-size: 0.12rem;
  margin-top: 0.15rem;
}

.arrivetimes img,
.address_2 img {
  width: 0.05rem;
  height: 0.08rem;
  vertical-align: middle;
  margin-left: 0.05rem;
}

.address_2 img {
  margin-top: 0.15rem;
}

.storeaddress {
  color: #fff;
  font-size: 0.14rem;
  font-weight: 600;
  padding: 0 0.15rem;
  position: absolute;
  top: 0.55rem;
}

.addressdetails {
  background: #fff;
  position: absolute;
  top: 0.75rem;
  left: 0.15rem;
  padding: 0.1rem 0.15rem 0 0.15rem;
  border-radius: 0.04rem;
  width: 3.45rem;
}

.addressdetails_1 {
  display: flex;
  justify-content: space-between;
}

.agreement {
  display: flex;
  font-size: 0.12rem;
  margin-top: 0.05rem;
  margin-bottom: 0.1rem;
}

.agreement .service {
  line-height: 0.2rem;
  color: #2a57d8;
}

.address_2 input {
  max-width: 0.8rem;
  border: none;
  outline: none;
  text-align: right;
  font-size: 0.12rem;
  color: #333;
  margin-top: 0.15rem;
}

.discounts {
  margin-top: 0.1rem;
  padding: 0 0.1rem;
  background: #fff;
  // position: absolute;
  // top: 3.56rem;
  width: 100%;
  li {
    display: flex;
    justify-content: space-between;
    font-size: 0.12rem;
    border-bottom: 1px solid #f2f2f2;
    padding: 0.1rem 0;
  }
}
</style>
