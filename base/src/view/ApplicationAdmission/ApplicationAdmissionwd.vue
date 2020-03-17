<template>
  <div class="container">
    <!-- <HeaderTop :title="title"></HeaderTop> -->
    <div class="headimg"><img src="../../assets/sqrz.png" alt="" /></div>

    <div class="requirements">
      <div class="requiretitle">
        <p><span></span>入驻要求</p>
      </div>
      <div>
        <p>有实体门店</p>
        <p>入驻蓝鲸生活平台前，需有线下实体店铺</p>
      </div>
      <div>
        <p>有经营资质</p>
        <p>
          申请开店过程中需要您提供符合国家法律规定的经营许可证照，包括但不限于营业执照、各类许可证、特许证件等
        </p>
      </div>
    </div>
    <div class="requirements">
      <div class="requiretitle">
        <p><span></span>入驻流程</p>
      </div>
      <div>
        <p>1.提交资料</p>
        <p>
          填写店铺信息，提交经营资质照片填写您的收款信息，方便开店后快速提现
        </p>
      </div>
      <div>
        <p>2.审核签约</p>
        <p>等待资质审核（1-3个工作日）审核通过，短信签约</p>
      </div>
      <div>
        <p>3.开门营业</p>
        <p>录入商品业务经理到店线下审核，审核通过即可开门营业</p>
      </div>
    </div>
    <div class="platformintro">
      <div class="requiretitle">
        <p><span></span>平台介绍</p>
      </div>
      <div>
        <img src="../../assets/ceshi.png" alt="" />
      </div>
    </div>
    <div><button @click="ApplyTap()" class="subtn">申请入驻</button></div>
  </div>
</template>

<script>
import HeaderTop from "../../components/HeaderTop/index";
export default {
  name: "ApplicationAdmissionwd",
  components: {
    HeaderTop
  },
  data() {
    return {
      title: "微店申请入驻"
    };
  },
  methods: {
    ApplyTap() {
      this.$router.push({ name: "MicroshopAdmission" });
    }
  }
};
</script>

<style lang="less" scoped>
.headimg {
  img {
    width: 100%;
    height: 2rem;
  }
}
.platformintro {
  background: #fff;
  padding: 0 0.15rem;
  div img {
    width: 100%;
    height: auto;
  }
}

.requirements {
  background: #fff;
  padding: 0 0.15rem;
  div:nth-child(2) {
    line-height: 0.22rem;
    p:nth-child(1) {
      color: #333;
      font-size: 0.13rem;
    }
    p:nth-child(2) {
      color: #666;
      font-size: 0.12rem;
    }
  }
  div:nth-child(3) {
    line-height: 0.22rem;
    p:nth-child(1) {
      color: #333;
      font-size: 0.13rem;
    }
    p:nth-child(2) {
      color: #666;
      font-size: 0.12rem;
    }
  }

  div:nth-child(4) {
    line-height: 0.22rem;
    p:nth-child(1) {
      color: #333;
      font-size: 0.13rem;
    }
    p:nth-child(2) {
      color: #666;
      font-size: 0.12rem;
    }
  }
}

.requiretitle {
  height: 0.4rem;
  p {
    line-height: 0.4rem;
    font-size: 0.14rem;
    font-weight: 600;
    color: #333;
    span {
      display: inline-block;
      background: #fc5d65;
      width: 0.02rem;
      height: 0.1rem;
      margin-right: 0.05rem;
    }
  }
}

.subtn {
  display: block;
  margin: 0rem auto;
  margin-top: 0.5rem;
  width: 3.45rem;
  height: 0.45rem;
  font-size: 0.14rem;
  color: #fff;
  background: #fc5d65;
  border: none;
  outline: none;
  border-radius: 0.04rem;
}
</style>
