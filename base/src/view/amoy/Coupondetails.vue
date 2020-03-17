<template>
  <!-- 优惠券详情 -->
  <div class="container">
    <!-- <HeaderTop :title="title"></HeaderTop> -->
    <div>
      <img
        class="product"
        src="../../assets/amoy/pro1.png"
        alt=""
      >
      <div class="coupondetail">
        <img
          src="../../assets/amoy/coupon.png"
          alt=""
        >
        <div>
          <p>￥10 <span>优惠券</span></p>
          <p>没有限制</p>
        </div>
        <div>
          <p>优惠折扣</p>
          <p>2019-01-15止</p>
        </div>
      </div>
    </div>
    <div class="coupontaps">
      <img
        src="../../assets/amoy/addcoupon.png"
        alt=""
      >
      <img
        src="../../assets/amoy/usecoupon.png"
        alt=""
      >
    </div>
    <div class="instructions">
      <div>
        <p><span></span> 使用说明</p>
      </div>
      <ul>
        <li>1、在优惠券领取页面点击：立即领取，即可弹出拼多多相关优惠
          券代码，复制优惠代码；</li>
        <li>
          2、点击拼多多官网，前往拼多多购物；</li>
        <li>3、选定商品，加入购物车，点击结算，填写收货人信息，并选择
          支付方式，选择使用优惠券；</li>
        <li>4、在提示框填入一起领券网免费领取到的：拼多多优惠券代码；</li>
        <li>5、提交优惠券代码后，查看是否得到相关优惠；</li>
      </ul>
    </div>
  </div>
</template>
<script>
import HeaderTop from "@/components/HeaderTop/index";
export default {
  name: "Coupondetails",
  components: {
    HeaderTop
  },
  data() {
    return {
      title: "苏州桂花蜜桃水"
    };
  }
};
</script>
<style lang="less" scoped>
.container {
  background: #fff;
}

.product {
  width: 100%;
  height: auto;
}

.coupondetail {
  position: relative;
  div:nth-child(2) {
    position: absolute;
    left: 0.5rem;
    top: 0.25rem;
    color: #fff;
    p:nth-child(1) {
      font-size: 0.28rem;
      font-weight: 600;
      span {
        font-size: 0.22rem;
      }
    }
    p:nth-child(2) {
      font-size: 0.13rem;
      margin-top: 0.25rem;
    }
  }
  div:nth-child(3) {
    width: 1rem;
    max-width: 1rem;
    position: absolute;
    right: 0.2rem;
    top: 0.25rem;
    text-align: center;
    p:nth-child(1) {
      font-size: 0.3rem;
      color: #666;
      padding: 0 0.1rem;
    }
    p:nth-child(2) {
      font-size: 0.12rem;
      color: #999;
      margin-top: 0.1rem;
    }
  }
}

.coupondetail img {
  display: block;
  width: 3.53rem;
  height: 1.28rem;
  margin: 0 auto;
  margin-top: -0.15rem;
}

.coupontaps {
  display: flex;
  justify-content: center;
  margin: 0.2rem 0;
  img {
    width: 0.935rem;
    height: 0.355rem;
    margin: 0 0.15rem;
  }
}

.instructions {
  margin-top: 0.15rem;
  padding: 0 0.15rem;
  div p {
    font-size: 0.16rem;
    color: #333;
    font-weight: 600;
    line-height: 0.3rem;
    span {
      height: 0.1rem;
      margin-right: 0.1rem;
      border-left: 2px solid #e02e24;
    }
  }
  ul li {
    color: #333;
    font-size: 0.14rem;
    line-height: 0.25rem;
  }
}
</style>
