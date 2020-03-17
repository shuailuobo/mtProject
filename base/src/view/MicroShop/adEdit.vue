<template>
  <div class="container">
    <!-- <HeaderTop :title="title"></HeaderTop> -->
    <!-- 新增收货地址 -->
    <van-address-edit
      :area-list="areaList"
      show-delete
      show-set-default
      :addressInfo="addressInfo"
      @save="onSave"
      @delete="onDelete"
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
import HeaderTop from "../../components/HeaderTop/index";
import GroupMall from "../../config/GroupMall";
import { Toast, Dialog } from "vant";
export default {
  components: {
    HeaderTop,
    [Toast.name]: Toast,
    [Dialog.name]: Dialog
  },
  name: "address-edit",
  data() {
    return {
      title: "修改收货地址",
      areaList,
      addressInfo: {
        id: "1",
        name: "",
        tel: "",
        province: "",
        city: "",
        county: "",
        addressDetail: "",
        areaCode: "",
        isDefault: ""
      }
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
      window.console.log(val);
      let is_default;
      if (val.isDefault) {
        is_default = 1;
      } else {
        is_default = 0;
      }
      try {
        let data = {
          id: this.$route.params.id,
          contact: val.name,
          phone: val.tel,
          province: val.province,
          city: val.city,
          district: val.county,
          address: val.addressDetail,
          postcode: val.areaCode,
          is_default: is_default
        };
        const response = await GroupMall.addressSave(data);
        window.console.log(response);
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
    async onDelete() {
      try {
        let data = {
          id: this.$route.params.id
        };
        const response = await GroupMall.addressDelete(data);
        window.console.log(response);
        if (response.data.err_code == 0) {
          this.$router.go(-1);
        } else {
          Dialog.alert({
            message: "删除失败！请稍后重试"
          }).then(() => {
            // on close
          });
        }
      } catch (error) {
        window.console.log(error.response);
      }
    }
  },
  async created() {
    try {
      let data = {
        id: this.$route.params.id
      };
      const response = await GroupMall.addressInfo(data);
      window.console.log(response.data);
      this.addressInfo.id = response.data.data.id;
      this.addressInfo.name = response.data.data.contact;
      this.addressInfo.tel = response.data.data.phone;
      this.addressInfo.province = response.data.data.province;
      this.addressInfo.city = response.data.data.city;
      this.addressInfo.county = response.data.data.district;
      this.addressInfo.addressDetail = response.data.data.address;
      this.addressInfo.areaCode = response.data.data.postcode;
      if (response.data.data.is_default == 1) {
        this.addressInfo.isDefault = true;
      } else {
        this.addressInfo.isDefault = false;
      }

      console.log(this.addressInfo);
    } catch (error) {
      window.console.log(error.response);
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
