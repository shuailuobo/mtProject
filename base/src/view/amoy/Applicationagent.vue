<template>
  <div class="container">
    <!-- 申请代理 -->
    <van-form @submit="onSubmit">
      <van-field
        v-model="fullname"
        name="fullname"
        label="姓名"
        placeholder="请输入姓名"
      />
      <van-field
        v-model="phone"
        name="phone"
        type="tel"
        label="手机号"
        placeholder="请输入手机号"
      >
        <van-button
          slot="button"
          size="small"
          type="primary"
          v-show="show"
          @click.prevent="getCode"
          >发送验证码</van-button
        >
        <van-button
          slot="button"
          size="small"
          type="default"
          v-show="!show"
          disabled
          >{{ count }}s</van-button
        >
      </van-field>

      <van-field
        v-model="sms"
        center
        clearable
        label="验证码"
        placeholder="请输入短信验证码"
      />

      <van-field
        v-model="wechat"
        name="wechat"
        label="微信"
        placeholder="请输入微信"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>

    <!-- <div class="bgimg">
    <img src="../../assets/amoy/sqdlbgimg.png" alt="" />
    <input
      type="text"
      id="name"
      v-model="fullname"
      placeholder="请填写您的姓名"
    />
    <input
      type="number"
      id="phone"
      v-model="phone"
      placeholder="请填写您的手机"
    />
    <input
      type="text"
      v-model="wechat"
      id="wechart"
      placeholder="请填写您的微信"
    />
    <button @click="agentApply">提交审核</button>
  </div> -->
  </div>
</template>
<script>
// import HeaderTop from "@/components/HeaderTop/index";
import GroupMall from "../../config/GroupMall";
import { Dialog } from "vant";
export default {
  name: "Applicationagent",
  components: {
    [Dialog.Component.name]: Dialog.Component
  },
  data() {
    return {
      phone: "",
      fullname: "",
      wechat: "",
      sms: "",
      show: true,
      count: "",
      timer: null,
      rightSms: ""
    };
  },
  methods: {
    async onSubmit(values) {
      try {
        let data = {
          user_id: this.$cookies.get("userid"),
          type: "agent",
          phone: values.phone,
          fullname: values.fullname,
          wechat: values.wechat
        };
        if (
          values.phone != "" &&
          values.fullname != "" &&
          values.wechat != ""
        ) {
          if (values.sms == this.rightSms) {
            const response = await GroupMall.agentApply(data);
            window.console.log(response.data);
            if (response.data.err_code == 0) {
              Dialog.alert({
                message: "提交成功"
              }).then(() => {
                this.$router.go(-1); //返回上一层
              });
            } else {
              this.$toast(response.data.err_msg);
            }
          } else {
            this.$toast("验证码错误");
          }
        } else {
          this.$toast("请填写完整");
        }
      } catch (error) {
        // window.console.log(error.response);
      }
    },
    async confirmGetSms() {
      try {
        let data = {
          phone: this.phone
        };
        const response = await GroupMall.getSms(data);
        // window.console.log(response.data);
        if (response.data.err_code == 0) {
          this.rightSms = response.data.code;
        } else {
          this.$toast(response.data.err_msg);
        }
      } catch (error) {
        window.console.log(error.response);
      }
    },
    getCode() {
      if (this.phone != "") {
        this.confirmGetSms();
        const TIME_COUNT = 60;
        if (!this.timer) {
          this.count = TIME_COUNT;
          this.show = false;
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--;
            } else {
              this.show = true;
              clearInterval(this.timer);
              this.timer = null;
            }
          }, 1000);
        }
      } else {
        this.$toast("请填写手机号");
      }
    }
  }
};
</script>
<style lang="less" scoped>
.bgimg {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #ece620;
  img {
    // position: absolute;
    // top: 0;
    width: 100%;
    height: 100%;
  }
  input {
    width: 2.4rem;
    height: 0.4rem;
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 0.08rem;
    font-size: 0.14rem;
    color: #666;
    padding-left: 0.1rem;
  }
  #name {
    position: absolute;
    top: 1.18rem;
    left: 0.9rem;
  }
  #phone {
    position: absolute;
    top: 1.78rem;
    left: 0.9rem;
  }
  #wechart {
    position: absolute;
    top: 2.38rem;
    left: 0.9rem;
  }
  button {
    background: #f84a31;
    width: 2.3rem;
    height: 0.4rem;
    border-radius: 0.2rem;
    color: #fff;
    font-size: 0.14rem;
    font-weight: 600;
    position: absolute;
    border: none;
    top: 3.3rem;
    left: 0.8rem;
  }
}
</style>
