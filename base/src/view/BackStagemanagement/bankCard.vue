<template>
  <div class="container">
    <van-form @submit="onSubmit">
      <van-field
        v-model="account"
        name="account"
        label="持卡人"
        placeholder="请填写"
        :rules="[{ required: true, message: '请填写持卡人' }]"
      />
      <van-field
        v-model="name"
        name="name"
        label="开户行"
        placeholder="请填写"
        :rules="[{ required: true, message: '请填写开户行' }]"
      />
      <van-field
        v-model="account_no"
        type="number"
        name="account_no"
        label="卡号"
        placeholder="请填写"
        :rules="[{ required: true, message: '请填写卡号' }]"
      />

      <van-field name="is_default" label="默认银行卡">
        <template #input>
          <van-switch v-model="is_default" size="20" />
        </template>
      </van-field>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import BackStagemanagement from "../../config/BackStagemanagement";
import { Dialog } from "vant";
export default {
  components: {
    [Dialog.Component.name]: Dialog.Component
  },
  data() {
    return {
      name: "",
      account: "",
      account_no: "",
      is_default: "0"
    };
  },
  methods: {
    async onSubmit(values) {
      if (values.is_default == true) {
        this.is_default = 1;
      } else {
        this.is_default = 0;
      }
      try {
        let data = {
          name: values.name,
          account: values.account,
          account_no: values.account_no,
          is_default: this.is_default,
          user_id: this.$cookies.get("userid")
        };
        const response = await BackStagemanagement.bankCardSave(data);
        window.console.log(response.data);
        if (response.data.err_code == 0) {
          Dialog.alert({
            title: "提示",
            message: "提交成功"
          }).then(() => {
            this.$router.go(-1); //返回上一层
          });
        }
      } catch (error) {
        window.console.log(error.response);
      }
    }
  }
};
</script>

<style lang="less" scoped></style>
