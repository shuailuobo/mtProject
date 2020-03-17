<template>
  <div class="container">
    <!-- <HeaderTop :title="title"></HeaderTop> -->
    <!-- 收货地址列表 -->
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      @add="onAdd"
      @edit="onEdit"
      @select="onSelect"
    />
  </div>
</template>
<script>
import HeaderTop from "../../components/HeaderTop/index";
import GroupMall from "../../config/GroupMall";
import { AddressList, Toast } from "vant";
export default {
  components: {
    HeaderTop,
    [AddressList.name]: AddressList,
    [Toast.name]: Toast
  },
  name: "address-list",
  data() {
    return {
      title: "收货地址列表",
      chosenAddressId: "",
      list: []
    };
  },
  methods: {
    onAdd() {
      this.$router.push({ name: "AddressEdit" });
    },
    onEdit(item) {
      this.$router.push({ name: "adEdit", params: { id: item.id } });
    },
    async onSelect(item) {
      try {
        let data = {
          user_id: this.$cookies.get("userid"),
          id: item.id,
          is_default: 1
        };
        const response = await GroupMall.addressSave(data);
        window.console.log(response.data);
        if (response.data.err_code == 0) {
          this.$router.go("-1");
        }
      } catch (error) {
        window.console.log(error.response);
      }
    }
  },
  async created() {
    try {
      let data = {
        user_id: this.$cookies.get("userid")
      };
      const response = await GroupMall.addressList(data);
      window.console.log(response.data);
      const result = [];
      for (var i in response.data.data) {
        result.push({
          id: response.data.data[i].id,
          name: response.data.data[i].contact,
          tel: response.data.data[i].phone,
          address:
            response.data.data[i].province +
            response.data.data[i].city +
            response.data.data[i].district +
            response.data.data[i].address,
          is_default: response.data.data[i].is_default
        });
        if (response.data.data[i].is_default == 1) {
          this.chosenAddressId = response.data.data[i].id;
        }
      }
      this.list = result;
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

/* .van-radio-group {
  background: #fff;
  padding: 0.1rem 0;
}

.van-radio {
  display: inline-block;
  margin-left: 0.3rem;
} */
</style>
