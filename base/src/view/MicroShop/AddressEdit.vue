<template>
  <div class="container">
    <!-- <HeaderTop :title="title"></HeaderTop> -->
    <!-- 新增收货地址 -->
    <van-address-edit
      :area-list="areaList"
      :show-delete="false"
      show-set-default
      @save="onSave"
      @change-area="onChangeArea"
    >
      <!-- <div slot="">
        <van-radio-group
          v-model="radio"
          @change='onChange'
        >
          <van-radio
            checked-color="#FC5D65"
            name="1"
          >先生</van-radio>
          <van-radio
            checked-color="#FC5D65"
            name="2"
          >女士</van-radio>
        </van-radio-group>
      </div> -->
    </van-address-edit>
  </div>
</template>
<script>
import areaList from "../../config/area";
import GroupMall from "../../config/GroupMall";
import { Toast, Dialog } from "vant";
import HeaderTop from "../../components/HeaderTop/index";
export default {
  components: {
    HeaderTop,
    [Toast.name]: Toast,
    [Dialog.name]: Dialog
  },
  name: "address-edit",
  data() {
    return {
      title: "新增收货地址",
      areaList
    };
  },
  methods: {
    shopdetail(id) {
      this.$router.push({ name: "ShopDetail", params: { id: id } });
    },
    onChange(val) {
      // Toast(name);
      window.console.log(val);
      // Toast("save");
    },
    async onSave(val) {
      // window.console.log(val);
      let is_default;
      if (val.isDefault) {
        is_default = 1;
      } else {
        is_default = 0;
      }
      try {
        let data = {
          user_id: this.$cookies.get("userid"),
          contact: val.name,
          phone: val.tel,
          province: val.province,
          city: val.city,
          district: val.county,
          address: val.addressDetail,
          postcode: val.areaCode,
          is_default: is_default
        };
        const response = await GroupMall.addressAdd(data);
        window.console.log(response.data);
        if (response.data.err_code == 0) {
          Dialog.alert({
            message: "保存成功！"
          }).then(() => {
            // on close
            this.$router.go(-1);
          });
        } else {
          Dialog.alert({
            message: "保存失败！请稍后重试"
          }).then(() => {
            // on close
          });
        }
      } catch (error) {
        window.console.log(error.response);
      }
    },
    onChangeArea(val) {
      window.console.log(val);
    }
  }
};
</script>

<style scoped>
.van-button--danger {
  background-color: #fc5d65;
  border: 1px solid #fc5d65;
}

.van-radio-group {
  background: #fff;
  padding: 0.1rem 0;
}

.van-radio {
  display: inline-block;
  margin-left: 0.3rem;
}
</style>
