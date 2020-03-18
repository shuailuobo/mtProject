<template>
  <div class="container">
    <!-- <HeaderTop :title="title"></HeaderTop> -->
    <!-- 商品圖開始 -->
    <section>
      <van-card
        :num="number"
        :price="money"
        :desc="'规格：' + goods_spec"
        :title="name"
        :thumb="thumb"
      />
    </section>
    <!-- 价格明细开始 -->
    <section>
      <div class="minxi">
        <h3>申请原因</h3>
        <ul>
          <li
            v-for="(item, index) of reasonlists"
            :key="index"
            @click="changeList(index, item)"
          >
            <p>{{ item }}</p>
            <span>
              <input
                type="radio"
                :id="'checkbox-1-' + item"
                class="regular-checkbox"
                name="x"
              />
              <label :for="'checkbox-1-' + item"></label>
            </span>
          </li>
        </ul>
      </div>
    </section>
    <!-- 问题描述开始 -->
    <section>
      <!-- <div class="miaoshu">
        <h3>问题描述</h3>
        <div class="text">
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            placeholder="请描述申请退换的具体原因"
            maxlength=500
          ></textarea>
          <h3><i>0</i>/<span>500</span></h3>
        </div>
      </div> -->
      <van-cell-group>
        <van-field
          v-model="message"
          rows="3"
          autosize
          label="问题描述"
          type="textarea"
          maxlength="200"
          placeholder="请描述申请退换的具体原因"
          show-word-limit
        />
      </van-cell-group>
    </section>
    <section>
      <div class="dindan">
        <h3>
          <p>联系人</p>
          <span>{{ contact }}</span>
        </h3>
        <h3>
          <p>联系电话</p>
          <span>{{ phone }}</span>
        </h3>
      </div>
    </section>
    <section>
      <div class="lianxi">提交订单后会有专员与您联系，请保持手机畅通</div>
    </section>
    <section>
      <van-tabbar style="height:0.45rem;">
        <van-button type="default" class="mybtn" @click="submit"
          >提交</van-button
        >
      </van-tabbar>
    </section>
  </div>
</template>
<script>
import GroupMall from "../../config/GroupMall";

export default {
  components: {},
  data() {
    return {
      title: "申请退换",
      reasonlists: [
        "商品损坏",
        "缺少件",
        "不想要了",
        "发错货",
        "质量问题",
        "其他"
      ],
      goods_spec: "",
      name: "",
      thumb: "",
      number: "",
      money: "",
      out_trade_no: "",
      contact: "",
      phone: "",
      message: "",
      reason: ""
    };
  },
  async created() {
    this.goods_spec = this.$route.query.goods_spec;
    this.name = this.$route.query.name;
    this.thumb = this.$route.query.thumb;
    this.number = this.$route.query.number;
    this.money = this.$route.query.money;
    this.out_trade_no = this.$route.query.out_trade_no;
    this.contact = this.$route.query.contact;
    this.phone = this.$route.query.phone;
  },
  methods: {
    changeList(index, item) {
      // console.log(item);
      this.reason = item; //this指向app
    },
    async submit() {
      //入参：user_id,reason,description,contact,phone
      let data = {
        user_id: this.$cookies.get("userid"),
        reason: this.reason,
        description: this.message,
        contact: this.contact,
        phone: this.phone,
        out_trade_no: this.out_trade_no
      };
      window.console.log(data);
      if (this.reason != "") {
        try {
          const response = await GroupMall.groupOrderExchange(data);
          window.console.log(response.data);
          if (response.data.err_code == 0) {
            this.$toast("提交成功");
          }
          // this.responsedetail = response.data;
        } catch (error) {
          window.console.log(error.response);
        }
      } else {
        this.$toast("请选择申请原因");
      }
    }
  }
};
</script>
<style lang="less" scoped>
.van-card {
  background: #fff;
}

.baokuan_main {
  box-sizing: border-box;
  background-color: #fff;
  margin-top: 0.1rem;
  padding: 0.15rem;
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
          margin-left: 0.05em;
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
.minxi {
  height: 2.125rem;
  background-color: #fff;
  margin-top: 0.1rem;
  padding: 0 0.155rem;
  font-size: 0.12rem;
  ul {
    //    @include bottom-border-1px(#eee);
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      line-height: 0.29rem;
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
    font-size: 0.14rem;
    color: #333;
    font-weight: bold;
    line-height: 0.3rem;
  }
}
.regular-checkbox + label {
  display: inline-block;
  position: relative;
  padding: 7px;
  border-radius: 50%;
  margin-right: 5px;
  background-color: #fafafa;
  cursor: pointer;
  border: 1px solid #cacece;
  font-size: 0.14rem;
}

.regular-checkbox:checked + label {
  background-color: #fc5d65;
  border: 1px solid #fc5d65;
  font-size: 0.14rem;
}
.regular-checkbox:checked + label:after {
  content: "\2714";
  font-size: 0.12rem;
  color: white;
  height: 0.16rem;
  width: 0.16rem;
  line-height: 0.14rem;
  display: inline-block;
  position: absolute;
  top: 0px;
  left: 0px;
  margin-left: 2px;
}

input[type="radio"] {
  display: none;
}
.miaoshu {
  margin-top: 0.1rem;
  background-color: #fff;
  height: 1.36rem;
  box-sizing: border-box;
  padding: 0 0.15rem;
  h3 {
    line-height: 0.3rem;
    color: #333;
    font-weight: bold;
  }
  textarea {
    margin-top: 0.05rem;
    width: 100%;
    height: 0.9rem;
    background-color: #f2f2f2;
    // padding: 0.1rem;
    border: none;
    border-radius: 5px;
    font-size: 0.12rem;
  }
  .text {
    position: relative;
    h3 {
      position: absolute;
      bottom: 0.05rem;
      right: 0.1rem;
      font-size: 0.12rem;
      font-weight: normal;
      color: #999999;
      i {
        font-style: normal;
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
    //   justify-content: space-between;
    align-items: center;
    padding: 0 0.16rem;
    p {
      color: #333;
      font-size: 0.14rem;
      font-weight: bold;
      width: 0.7rem;
    }
    span {
      color: #333;
    }
  }
}
.mybtn {
  width: 100%;
  height: 100%;
  background-color: #fc5d65;
  font-size: 0.14rem;
  font-weight: bold;
  color: #fff;
}
.lianxi {
  margin: 0 auto;
  text-align: center;
  line-height: 0.4rem;
  color: #333;
  font-size: 0.12rem;
}
</style>
