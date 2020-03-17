<template>
  <div class="container">
    <!-- 优惠券单元格 -->
    <van-coupon-cell
      :coupons="coupons"
      :chosen-coupon="chosenCoupon"
      @click="showList = true"
      v-if="!showList"
    />

    <!-- 优惠券列表 -->
    <van-popup v-if="showList" v-model="showList" position="bottom">
      <van-coupon-list
        :coupons="coupons"
        :chosen-coupon="chosenCoupon"
        :disabled-coupons="disabledCoupons"
        @change="onChange"
        @exchange="onExchange"
      />
    </van-popup>
  </div>
</template>

<script>
import { CouponCell, CouponList } from "vant";
const coupon = {
  available: 1,
  condition: "无使用门槛\n最多优惠12元",
  reason: "",
  value: 150,
  name: "优惠券名称",
  startAt: 1489104000,
  endAt: 1514592000,
  valueDesc: "1.5",
  unitDesc: "元"
};
export default {
  components: {
    [CouponList.name]: CouponList,
    [CouponCell.name]: CouponCell
  },
  data() {
    return {
      showList: false,
      chosenCoupon: -1,
      coupons: [coupon],
      disabledCoupons: [coupon]
    };
  },

  methods: {
    onChange(index) {
      this.showList = false;
      this.chosenCoupon = index;
    },
    onExchange(code) {
      this.coupons.push(coupon);
    }
  }
};
</script>

<style lang="less">
.demo-coupon-list {
  .van-popup {
    height: 100%;
  }
}
</style>
