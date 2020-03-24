<template>
  <div class="container">
    <!-- <van-field
        readonly
        clickable
        label="商品分类"
        :value="CommodityValue"
        placeholder="选择商品分类"
        @click="Commodityshow = true"
      /> -->

    <div class="ticash">
      <div style="display:flex;">
        <p class="cardFont">到账银行卡</p>
        <p
          v-if="ishave == false"
          @click="
            $router.push({
              name: 'bankCard'
            })
          "
        >
          添加银行卡
        </p>
        <p v-else @click="Commodityshow = true">{{ name }}{{ account_no }}</p>
      </div>
      <p>提现金额（元）<van-icon color="blue" name="question-o" /></p>
      <van-field v-model="amount" placeholder="0" />
      <van-button type="danger" size="large" @click="onSubmit">提现</van-button>
    </div>
    <div>
      <van-cell :value="balance" is-link>
        <!-- 使用 title 插槽来自定义标题 -->
        <template slot="title">
          <span class="custom-title">余额（元）</span>
          <van-icon color="blue" name="question-o" />
        </template>
      </van-cell>
      <van-cell
        title="已提现（元）"
        is-link
        @click="withdrawalShow = true"
        :value="withdrawal"
      />
    </div>
    <!-- 上拉弹窗1 -->
    <van-popup v-model="Commodityshow" position="bottom">
      <van-picker
        show-toolbar
        :columns="Commoditycolumns"
        @cancel="Commodityshow = false"
        @confirm="onCommodityConfirm"
      />
    </van-popup>

    <!-- 上拉弹窗2 -->
    <van-popup
      v-model="withdrawalShow"
      position="bottom"
      closeable
      close-icon="close"
    >
      <p class="withdrawalRecords">提现记录</p>
      <van-cell-group class="vancells">
        <section v-for="(item, index) in WithdrawalList" :key="index">
          <van-cell
            :title="item.create_time"
            :value="'￥' + item.amount"
            :label="
              item.bank_name +
                '(' +
                (item.status == '0'
                  ? '待处理'
                  : item.status == '1'
                  ? '已通过'
                  : item.status == '2'
                  ? '已驳回'
                  : '已取消') +
                ')'
            "
          />
        </section>
      </van-cell-group>
    </van-popup>
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
      withdrawalShow: false,
      ishave: false,
      name: "",
      account_no: "",
      is_default: "",
      // CommodityValue: "",
      Commodityshow: false,
      Commoditycolumns: [],
      WithdrawalList: [],
      withdrawal: 0,
      balance: 0,
      amount: "",
      bankcard_id: ""
    };
  },
  methods: {
    async getBankCardList() {
      try {
        let data = {
          user_id: this.$cookies.get("userid")
        };
        const response = await BackStagemanagement.getBankCard(data);
        window.console.log(response.data);
        if (response.data.err_code == 0) {
          if (response.data.data.length > 0) {
            for (var i in response.data.data) {
              this.Commoditycolumns.push(response.data.data[i].name);
              if (response.data.data[i].is_default == "1") {
                this.name = response.data.data[i].name;
                this.account_no = response.data.data[i].account_no.slice(-4);
                this.bankcard_id = response.data.data[i].id;
              }
            }
            this.Commoditycolumns.push("使用新卡提现");
            this.Commodity = response.data.data;
            this.ishave = true;
          } else {
            this.ishave = false;
          }
        }
      } catch (error) {
        window.console.log(error.response);
      }
    },
    async onSubmit() {
      try {
        if (this.bankcard_id == "") {
          Dialog.alert({
            title: "提示",
            message: "请选择银行卡"
          }).then(() => {});
          return false;
        }
        if (this.amount == "") {
          Dialog.alert({
            title: "提示",
            message: "请输入提现金额"
          }).then(() => {});
          return false;
        }
        let data = {
          user_id: this.$cookies.get("userid"),
          amount: this.amount,
          bankcard_id: this.bankcard_id
        };
        const response = await BackStagemanagement.withdrawalApply(data);
        window.console.log(response.data);
        if (response.data.err_code == 0) {
          Dialog.alert({
            title: "提示",
            message: "提交成功"
          }).then(() => {
            this.getWithdrawalList();
            this.$router.go(-1); //返回上一层
          });
        } else {
          Dialog.alert({
            title: "提示",
            message: response.data.err_msg
          }).then(() => {});
        }
      } catch (error) {
        window.console.log(error.response);
      }
    },
    async getWithdrawalList() {
      try {
        let data = {
          user_id: this.$cookies.get("userid")
        };
        const response = await BackStagemanagement.withdrawalList(data);
        window.console.log(response.data);
        if (response.data.err_code == 0) {
          this.WithdrawalList = response.data.data;
        }
      } catch (error) {
        window.console.log(error.response);
      }
    },
    onCommodityConfirm(value, index) {
      if (value === "使用新卡提现") {
        this.$router.push({ name: "bankCard" });
      } else {
        this.bankcard_id = this.Commodity[index].id;
        this.name = this.Commodity[index].name;
        this.account_no = this.Commodity[index].account_no.slice(-4);
        // this.CommodityValue = value;
      }
      this.Commodityshow = false;
    }
  },
  mounted() {
    this.getBankCardList();
    this.getWithdrawalList();
  },
  async created() {
    try {
      let data = {
        user_id: this.$cookies.get("userid")
      };
      const response = await BackStagemanagement.homeGroup(data);
      window.console.log(response.data);
      if (response.data.err_code == 0) {
        this.balance = response.data.data.balance;
        this.withdrawal = response.data.data.withdrawal_total;
      }
    } catch (error) {
      window.console.log(error.response);
    }
  }
};
</script>

<style lang="less" scoped>
.withdrawalRecords {
  text-align: center;
  position: absolute;
  width: 100px;
  left: 50%;
  margin-left: -50px; //这两行代码也可以替换成
  top: 0.16rem;
  color: #666;
}

.vancells {
  margin-top: 0.5rem;
}

.van-cell__value {
  color: #c4101a;
  font-weight: 600;
}

.ticash {
  width: 92%;
  margin: 0.1rem auto;
  padding: 0.2rem 0.15rem;
  background: #fff;
  border-radius: 10px;
  p {
    color: #999;
    font-size: 0.12rem;
  }
}

.van-button {
  border-radius: 6px;
}

.van-field {
  margin: 0.2rem 0;
  font-size: 0.18rem !important;
  font-weight: 600;
}

.cardFont {
  font-size: 0.14rem !important;
  color: #333 !important;
  font-weight: 600;
  margin-right: 0.1rem;
  margin-bottom: 0.2rem;
}
</style>
