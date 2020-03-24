<template>
  <!-- 微店详情 -->
  <div class="headers container">
    <!-- <HeaderTop :title="title"></HeaderTop> -->
    <!-- header -->
    <div class="storeintroimgbox">
      <img class="storeintroimg" :src="bg_url" alt="" />
    </div>
    <div class="stores">
      <div class="storestop">
        <ul>
          <li class="storetitle">
            <p>{{ name }}</p>
            <p>{{ (distance / 1000).toFixed(1) }}km</p>
          </li>
          <li class="storeintro">{{ intro }}</li>
          <li class="storeprice">
            <p>起送￥{{ delivery_threshold }}</p>
            <span>|</span>
            <p>配送￥{{ delivery_fee }}</p>
          </li>
          <li class="storetags">
            <p v-if="is_delivery == 1">
              {{ is_delivery == "1" ? "支持配送" : "" }}
            </p>
            <p v-if="is_self == 1">
              {{ is_self == "1" ? "支持自取" : "" }}
            </p>
            <!-- <p v-if="coupon_name != ''">
              {{ coupon_name }}
            </p> -->
          </li>
        </ul>
        <img class="storelogo" :src="icon" alt="" />
      </div>
      <!--折叠面板  -->
      <van-collapse v-model="activeNames">
        <van-collapse-item title="" name="1" :border="false">
          <ul class="addressdetails">
            <li>
              <img src="../../assets/address.png" alt="" />
              <p>地址：</p>
              <p>{{ address }}</p>
            </li>
            <li>
              <img src="../../assets/phone.png" alt="" />
              <p>联系电话：</p>
              <p>{{ phone }}</p>
            </li>
            <li>
              <img src="../../assets/businesshours.png" alt="" />
              <p>营业时间：</p>
              <p>{{ biz_time }}</p>
            </li>
          </ul>
        </van-collapse-item>
      </van-collapse>
    </div>
    <!-- 商品分类列表 -->
    <div class="main">
      <div class="categroy-left">
        <div
          v-for="(item, index) in category"
          :key="index"
          @click="switchTab(item.id, index)"
          :class="['cate-list', curIndex == index ? 'on' : '']"
        >
          {{ item.name }}
        </div>
      </div>
      <div class="categroy-right">
        <div
          class="product-list"
          v-for="(item, index) in classify"
          :key="index"
        >
          <div>
            <div>
              <img class="goodspic" :src="item.thumb" alt="" />
            </div>

            <div class="goodsnums">
              <p>月售：{{ item.sale_amount }}</p>
            </div>
          </div>
          <div>
            <div class="classname">
              <span>{{ item.cat_name }}</span>
            </div>

            <div class="goodsprice">
              <p>{{ item.price }}</p>
              <p>
                <strike>￥{{ item.market_price }}</strike>
              </p>
            </div>
            <div class="goodspoint">
              <p>自购预估积分：{{ item.com_point }}</p>
            </div>
            <div class="goodspoint">
              <p>代理预估提成：{{ item.sale_amount }}</p>
            </div>

            <!-- <div class="cartcontroll1">
              <transition name="slide-fade">
                <img
                  v-show="item.quantity"
                  class="addgoods"
                  src="../../assets/reduce.png"
                  alt=""
                  @click="decreaseCart(item.id, item.price, item.deleteid)"
                />
              </transition>
              <div class="count" v-show="item.quantity">
                {{ item.quantity }}
              </div>
              <img
                class="addgoods"
                src="../../assets/plus.png"
                alt=""
                @click="adDetail(item.id, item.price)"
              />
            </div> -->
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="van-submit-bar">
      <div class="cart" v-show="totalCount" @click="toggleList">
        <div class="cratNum" :class="{ highlight: totalCount > 0 }">
          {{ totalCount }}
        </div>
        <img src="../../assets/cart.png" alt="" />
      </div>
      <div class="van-submit-bar__bar">
        <div class="van-submit-bar__text">
          <span
            class="van-submit-bar__price"
            :class="{ highlight: totalPrice > 0 }"
            >¥ {{ totalPrice }}</span
          >
          <p>另需配送费{{ delivery_fee }}元/可自取</p>
        </div>
        <button
          @click.stop.prevent="DeliveryTap"
          class="van-button van-button--danger van-button--square"
          :class="payClass"
        >
          {{ payDesc }}
        </button>
      </div>
    </div> -->

    <transition name="fold">
      <div class="shopcart-list" v-show="cartShow">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty" @click="empty">清空</span>
        </div>
        <div class="list-content" ref="listContent">
          <ul>
            <li
              v-for="(food, index) in selectFoods"
              :key="index"
              class="food border-1px"
            >
              <span class="name">{{ food.goods_name }}</span>
              <div class="price">
                <span
                  >￥{{
                    Math.round(food.price * food.quantity * 100) / 100
                  }}</span
                >
              </div>
              <div class="cartcontrol-wrapper">
                <div class="cartcontroll">
                  <transition name="slide-fade">
                    <img
                      v-show="food.quantity"
                      class="addgoods"
                      src="../../assets/reduce.png"
                      alt=""
                      @click="
                        decreaseCart(food.goods_spec_id, food.price, food.id)
                      "
                    />
                  </transition>
                  <div class="count" v-show="food.quantity">
                    {{ food.quantity }}
                  </div>
                  <img
                    class="addgoods"
                    src="../../assets/plus.png"
                    alt=""
                    @click="adDetail(food.goods_spec_id, food.price)"
                  />
                </div>
                <!-- <cartcontrol :food="food"></cartcontrol> -->
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <transition name="mask-fade">
      <div class="list-mask" @click="hideList" v-show="cartShow"></div>
    </transition>
  </div>
</template>
<script>
import Vue from "vue";
import MicroShop from "../../config/MicroShop";

export default {
  components: {},
  name: "myShopDetail",
  data() {
    return {
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      },
      title: "微店详情",
      id: this.$route.query.id,
      distance: this.$route.query.distance,
      activeNames: [],
      category: [
        // { name: "网红食品", type: "0" },
      ],
      type: "0",
      detail: [],
      curIndex: 0,
      is_self: "",
      is_delivery: "",
      icon: "",
      bg_url: "",
      name: "",
      // distance: "",
      // coupon_name: "",
      // tag: ["支持配送", "支持自取", "49-5"],
      delivery_threshold: "",
      delivery_fee: "",
      intro: "",
      address: "",
      phone: "",
      biz_time: "",
      classify: [],
      fold: true,
      cartClassify: [],
      store_id: this.$route.query.store_id
    };
  },
  methods: {
    switchTab(id, index) {
      // this.type = type;
      this.curIndex = index;
      this.getStoreGoodsList(id);
    },
    async myCartEmpty() {
      try {
        let data = {
          user_id: this.$cookies.get("userid")
        };
        const response = await MicroShop.cartEmpty(data);
        window.console.log(response.data);
        if (response.data.err_code == 0) {
          this.getStoreGoodsList();
          this.getCartLists();
        }
      } catch (error) {
        window.console.log(error.response);
      }
    },
    async myCartDelete(id) {
      try {
        let data = {
          id: id
        };
        const response = await MicroShop.cartDelete(data);
        window.console.log(response.data);
        if (response.data.err_code == 0) {
          this.getStoreGoodsList();
          this.getCartLists();
        }
      } catch (error) {
        window.console.log(error.response);
      }
    },
    async addCartSave(id, price, quantity) {
      try {
        let data = {
          //user_id 582,goods_spec_id,price,quantity
          user_id: this.$cookies.get("userid"),
          goods_spec_id: id,
          price: price,
          quantity: quantity
        };
        const response = await MicroShop.cartSave(data);
        window.console.log(response.data);
        if (response.data.err_code == 0) {
          this.getCartLists();
        }
      } catch (error) {
        window.console.log(error.response);
      }
    },
    adDetail(id, price) {
      // let foods = [];
      // this.classify.forEach(good => {
      //   if (good.count) {
      //     foods.push(good);
      //   }
      // });
      this.classify.forEach(val => {
        if (val.id === id) {
          if (!val.quantity) {
            Vue.set(val, "quantity", 1);
            this.addCartSave(id, price, val.quantity);
          } else {
            let totalQuantity = 0;
            totalQuantity = parseInt(val.quantity) + 1;
            this.addCartSave(id, price, totalQuantity);
          }
        }
      });
    },
    decreaseCart(id, price, deleteid) {
      this.classify.forEach(val => {
        if (val.id === id) {
          if (val.quantity) {
            // val.quantity--;
            let decreaseQuantity = 0;
            decreaseQuantity = parseInt(val.quantity) - 1;
            if (decreaseQuantity > 0) {
              this.addCartSave(id, price, decreaseQuantity);
            } else {
              this.myCartDelete(deleteid);
            }
          }
        }
      });
    },
    DeliveryTap() {
      this.$router.push({
        name: "Delivery",
        query: { store_id: this.$route.query.id }
      });
    },
    async getStoreGoodsList(cat_id) {
      try {
        let data = {
          user_id: this.$cookies.get("userid"),
          cat_id: cat_id,
          store_id: this.store_id
        };
        const response = await MicroShop.getStoreGoods(data);
        window.console.log(response.data.data);
        this.classify = response.data.data;
        // this.classify.push(response.data.data[0]);
        this.getCartLists();
      } catch (error) {
        window.console.log(error.response);
      }
    },
    async getCartLists() {
      try {
        let data = {
          //user_id 582
          user_id: this.$cookies.get("userid"),
          store_id: this.$route.query.id
        };
        const response = await MicroShop.cartLists(data);
        // window.console.log(response.data);
        if (response.data.err_code == 0) {
          this.cartClassify = response.data.data;
          if (response.data.data.length > 0) {
            for (let i = 0; i < this.classify.length; i++) {
              for (let j = 0; j < response.data.data.length; j++) {
                if (
                  response.data.data[j].goods_spec_id === this.classify[i].id
                ) {
                  this.classify[i].quantity = response.data.data[j].quantity;
                  this.classify[i].deleteid = response.data.data[j].id;
                }
              }
            }
          }
        }
      } catch (error) {
        window.console.log(error.response);
      }
    },
    async getStoreGoodsInfo(id) {
      try {
        let data = {
          id: id
        };
        const response = await MicroShop.getStoreGoodsInfo(data);
        window.console.log(response.data);
        // this.list = response.data.data;
      } catch (error) {
        window.console.log(error.response);
      }
    },
    toggleList() {
      if (!this.totalCount) {
        return;
      }
      this.fold = !this.fold;
    },
    hideList() {
      this.fold = true;
    },
    empty() {
      this.myCartEmpty();
      // this.selectFoods.forEach(food => {
      //   food.goods_spec_id = 0;
      // });
    },
    pay() {
      if (this.totalPrice < this.minPrice) {
        return;
      }
      window.alert(`需要支付${this.totalPrice}元`);
    }
  },
  async created() {
    try {
      let data = {
        id: this.store_id
      };
      const response = await MicroShop.getStoreInfo(data);
      window.console.log(response.data);
      this.address = response.data.data.address;
      this.phone = response.data.data.phone;
      this.delivery_fee = response.data.data.delivery_fee;
      this.delivery_threshold = response.data.data.delivery_threshold;
      this.minPrice = response.data.data.delivery_threshold;
      this.icon = response.data.data.icon;
      this.bg_url = response.data.data.bg_url;
      this.intro = response.data.data.intro;
      this.name = response.data.data.name;
      this.biz_time = response.data.data.biz_time;
      // this.coupon_name = response.data.data.coupon_name;
      // this.distance = response.data.data.distance;
      this.is_delivery = response.data.data.is_delivery;
      this.is_self = response.data.data.is_self;
    } catch (error) {
      window.console.log(error.response);
    }

    try {
      let data = {
        store_id: this.store_id
      };
      const response = await MicroShop.getStoreCategory(data);
      window.console.log(response.data);
      this.category = response.data.data;
      this.getStoreGoodsList(response.data.data[0].id);
    } catch (error) {
      window.console.log(error.response);
    }
  },
  mounted() {
    // this.getCartLists();
    // this.getStoreGoodsList(this.category[0].id);
  },
  computed: {
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i;
        }
      }
      return 0;
    },
    selectFoods() {
      let foods = [];
      this.cartClassify.forEach(good => {
        if (good.quantity) {
          foods.push(good);
        }
      });
      window.console.log(foods);
      return foods;
    },
    totalPrice() {
      let total = 0;
      // console.log(this.selectFoods);
      this.selectFoods.forEach(food => {
        total += Math.round(food.price * food.quantity * 100) / 100;
      });
      return total;
    },
    totalCount() {
      let total = 0;
      this.selectFoods.forEach(food => {
        total += parseInt(food.quantity);
      });
      return total;
    },
    payDesc() {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}起送`;
      } else if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice;
        return `还差￥${diff}起送`;
      } else {
        return `去结算`;
      }
    },
    payClass() {
      if (this.totalPrice < this.minPrice) {
        return `not-enough`;
      } else {
        return `enough`;
      }
    },
    cartShow() {
      var that = this;
      if (!this.totalCount) {
        that.fold = true;
        return false;
      }
      let show = !this.fold;
      return show;
    }
  }
};
</script>

<style lang="less" scoped>
/* .headers {
  background: #fff;
} */

.storeintroimgbox {
  position: absolute;
  top: 0;
  z-index: -1;
}

.storeintroimg {
  width: 100%;
  // height: auto;
  max-height: 2.11rem;
  // height: 2.11rem;
}

.storelogo {
  width: 0.75rem;
  height: 0.75rem;
  margin-top: -0.38rem;
  box-sizing: border-box;
  border: 1px solid #f2f2f2;
  border-radius: 0.04rem;
}

.stores {
  position: relative;
  padding: 0.1rem 0.1rem 0 0.1rem;
  width: 3.55rem;
  margin: 0 auto;
  background: #fff;
  border-radius: 0.04rem;
  /* height: 1.04rem; */
  margin-top: 1.63rem;
  border: 1px solid #f2f2f2;
}

.storestop {
  display: flex;
  justify-content: space-between;
}

.storestop ul {
  z-index: 1;
}

.storetitle p {
  display: inline-block;
  font-size: 0.13rem;
  color: #333;
  font-weight: 600;
  margin-right: 0.1rem;
}

.storetitle p:nth-child(2) {
  color: #666;
  font-size: 0.12rem;
  font-weight: normal;
  -webkit-transform-origin-x: 0;
  -webkit-transform: scale(0.8);
  transform: scale(0.8);
}

.storetags p {
  margin-top: 0.05rem;
  display: inline-block;
  padding: 0.04rem 0.06rem;
  border: 1px solid #f92d36;
  color: #f92d36;
  font-size: 0.12rem;
  border-radius: 0.03rem;
  /* margin-right: 0.1rem; */
  -webkit-transform-origin-x: 0;
  -webkit-transform: scale(0.8);
  transform: scale(0.8);
}

.storeprice p,
.storeprice span {
  display: inline-block;
  color: #666;
  font-size: 0.12rem;
}

.storeintro {
  margin: 0.1rem 0;
  color: #666;
  font-size: 0.12rem;
}

.van-hairline--top-bottom::after {
  border: none;
}

.van-collapse-item {
  margin-top: -0.4rem;
  z-index: -1;
}

.addressdetails li {
  display: flex;
  justify-content: flex-start;
  height: 0.4rem;
  line-height: 0.4rem;
}

.addressdetails li img {
  width: 0.12rem;
  height: 0.12rem;
  margin-right: 0.1rem;
  vertical-align: middle;
  margin-top: 0.14rem;
}

.addressdetails li:nth-child(1) img {
  width: 0.09rem;
}

/* 分类 */
.navigator-hover {
  background: none;
}

.categroy-left {
  float: left;
  width: 0.8rem;
  height: 3.3rem;
  overflow: auto;
  box-sizing: border-box;
}

.categroy-left .cate-list {
  height: 0.4rem;
  line-height: 0.4rem;
  text-align: center;
  font-size: 0.12rem;
  color: #333;
}

.categroy-left .cate-list.on {
  font-weight: 600;
  background: #fff;
  /* color: #1cb7f8;
  border-color: #1cb7f8; */
}

.categroy-right {
  float: right;
  width: 2.95rem;
  background: #fff;
  height: 3.3rem;
  padding: 0.1rem 0.1rem;
  overflow: auto;
}

.product-list {
  position: relative;
  display: flex;
  /* display: inline-block; */
  width: 100%;
  /* text-align: center; */
  line-height: 0.2rem;
  margin-bottom: 0.1rem;
  font-size: 0.12rem;
}

.product-list:nth-of-type(odd) {
  margin-right: 0.1rem;
}

.goodspic {
  width: 0.8rem;
  height: 0.8rem;
  margin-right: 0.1rem;
}

.classname {
  font-size: 0.14rem;
  font-weight: 600;
  max-width: 1.3rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.goodsnums p {
  font-size: 0.12rem;
  color: #666;
  font-weight: normal;
  -webkit-transform-origin-x: 0;
  -webkit-transform: scale(0.8);
  transform: scale(0.8);
}

.goodspoint {
  font-size: 0.12rem;
  color: #666;
}

.main {
  padding-top: 0.1rem;
  height: 3.3rem;
  overflow: auto;
}

.goodsprice {
  display: inline-block;
  margin: 0.05rem 0;
}

.goodsprice p {
  display: inline-block;
  font-size: 0.14rem;
  color: #f92d36;
  font-weight: 600;
  margin-right: 0.02rem;
}

.goodsprice p:nth-child(2) {
  font-size: 0.12rem;
  color: #666;
  font-weight: normal;
  -webkit-transform-origin-x: 0;
  -webkit-transform: scale(0.83);
  transform: scale(0.83);
}

.addgoods {
  display: inline-block;
  width: 0.2rem;
  height: 0.2rem;
}

/* 底部结算栏 */
.van-submit-bar {
  background: #3a3a3a;
}

.van-button--danger {
  width: 1.15rem;
  font-size: 0.13rem;
  font-weight: 600;
  color: #818181;
  // background-color: #fc5d65;
  // border: 1px solid #fc5d65;
  padding: 0rem 0.2rem;
  height: 0.5rem;
  border: none;
}

.van-submit-bar__price {
  font-size: 0.14rem;
  line-height: 0.22rem;
  color: #72777d;
}

.highlight {
  color: #fff;
}

.van-submit-bar__text p {
  color: #72777d;
  font-size: 0.12rem;
  -webkit-transform-origin-x: 0;
  -webkit-transform: scale(0.83);
  transform: scale(0.83);
}

.van-submit-bar__text {
  text-align: left;
  margin-left: 0.5rem;
}

.cart {
  img {
    position: absolute;
    left: 1.63rem;
    // top: -0.245rem;
    top: -0.2rem;
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    border: 2px solid #fff;
    z-index: 99;
  }
  // .cratNum {
  //   color: #fff;
  // }
  .cratNum {
    position: absolute;
    top: -0.14rem;
    left: 53%;
    padding: 0 0.07rem;
    // width: 24px;
    height: 16px;
    // margin-left: -12px;
    line-height: 16px;
    text-align: center;
    border-radius: 16px;
    font-size: 9px;
    font-weight: 700;
    color: #fff;
    background: #f01414;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
    z-index: 100;
  }
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter,
.slide-fade-leave-to {
  /* .slide-fade-leave-active for below version 2.1.8 */
  transform: translateX(24px) rotate(360deg);
  opacity: 0;
}

.cartcontroll {
  display: flex;
  .count {
    padding: 0 0.07rem;
    line-height: 0.2rem;
    font-size: 0.13rem;
  }
}

.cartcontroll1 {
  display: flex;
  position: absolute;
  right: 0;
  // bottom: 0.34rem;
  .count {
    padding: 0 0.07rem;
    line-height: 0.2rem;
    font-size: 0.13rem;
  }
}

.not-enough {
  background: #555;
}

.enough {
  background: #fc5d65;
  color: #fff;
}

.fold-enter-active,
.fold-leave-active {
  transition: all 0.5s;
  opacity: 1;
  -webkit-transform: none;
  -ms-transform: none;
  transform: none;
}

.fold-enter,
.fold-leave-to {
  opacity: 0;
  -webkit-transform: translate3d(0, 100%, 0);
  transform: translate3d(0, 100%, 0);
}

.shopcart-list {
  position: absolute;
  left: 0;
  bottom: 0.5rem;
  width: 100%;
  z-index: 2;
  .list-header {
    height: 40px;
    line-height: 40px;
    padding: 0 18px;
    background: #f3f5f7;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    .title {
      font-size: 14px;
      float: left;
      color: rgb(7, 17, 27);
    }
    .empty {
      float: right;
      font-size: 12px;
      color: rgb(0, 160, 220);
    }
  }
  .list-content {
    padding: 0 0.1rem;
    max-height: 217px;
    background: #fff;
    overflow: hidden;
    .food {
      display: flex;
      justify-content: space-between;
      // position: relative;
      padding: 12px 0;
      box-sizing: border-box;
      // border-1px(rgba(7,17,27,.1));
      :last-child:after {
        border-top: 0;
      }

      .name {
        line-height: 24px;
        font-size: 14px;
        color: rgb(7, 17, 27);
      }

      .price {
        // position: absolute;
        // right: 90px;
        // bottom: 12px;
        line-height: 24px;
        font-size: 14px;
        font-weight: 700;
        color: rgb(240, 20, 20);
      }

      .cartcontrol-wrapper {
        // position: absolute;
        // right: 0;
        // bottom: 0.34rem;
      }
    }
  }
}

.list-mask {
  position: fixed;
  max-width: 540px;
  top: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  background: rgba(7, 17, 27, 0.6);
  backdrop-filter: blur(10px);
  z-index: 1;
  opacity: 1;
}

.mask-fade-enter-active,
.mask-fade-leave-active {
  transition: all 0.3s;
}

.mask-fade-enter,
.mask-fade-leave-to {
  opacity: 0;
}

.van-submit-bar__bar {
  padding: 0;
}
</style>
