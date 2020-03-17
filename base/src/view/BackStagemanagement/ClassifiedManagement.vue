<template>
  <div class="container">
    <!-- 分类列表 -->
    <van-cell
      style="margin-bottom:0.1rem;"
      v-for="(item, index) in ClassifiedList"
      :key="index"
      :title="item.name"
      is-link
      :to="{
        name: 'goodsList',
        query: { cat_id: item.id, store_id: store_id }
      }"
      :value="item.total_num + '件商品'"
    />

    <!-- 底部按钮 -->
    <div class="setBottom">
      <div @click="show = true">
        <van-icon name="add-o" size="24px" color="#CC2C35" />
        <p>新建分类</p>
      </div>
      <div
        @click="
          $router.push({
            name: 'Administration',
            query: { store_id: store_id }
          })
        "
      >
        <van-icon name="notes-o" size="24px" color="#CC2C35" />
        <p>管理分类</p>
      </div>
    </div>
    <!--  -->
    <section>
      <van-dialog
        v-model="show"
        title="新建分类"
        show-cancel-button
        @confirm="onConfirm"
      >
        <van-field v-model="classification" placeholder="请输入分类名称" />
      </van-dialog>
    </section>
  </div>
</template>

<script>
import BackStagemanagement from "../../config/BackStagemanagement";
export default {
  components: {},
  data() {
    return {
      store_id: this.$route.query.store_id,
      classification: "",
      show: false,
      ClassifiedList: []
    };
  },
  async created() {
    // console.log(this.$route.query.store_id);
  },
  methods: {
    async onConfirm() {
      try {
        let data = {
          store_id: this.store_id,
          name: this.classification
        };
        const response = await BackStagemanagement.categorySave(data);
        window.console.log(response.data);
        if (response.data.err_code == 0) {
          this.classification = "";
          this.categoryLists();
        }
      } catch (error) {
        window.console.log(error.response);
      }
    },
    async categoryLists() {
      try {
        let data = {
          store_id: this.store_id
        };
        const response = await BackStagemanagement.categoryList(data);
        window.console.log(response.data);
        if (response.data.err_code == 0) {
          this.ClassifiedList = response.data.data;
        }
      } catch (error) {
        window.console.log(error.response);
      }
    }
  },
  mounted() {
    this.categoryLists();
  }
};
</script>

<style lang="less" scoped>
.setBottom {
  position: fixed;
  bottom: 0;
  background: #fff;
  width: 100%;
  padding: 0 0.1rem;
  display: flex;
  justify-content: space-around;
  div {
    display: flex;
    justify-content: space-around;
    p {
      line-height: 0.44rem;
    }
  }
  .van-icon {
    margin-top: 0.1rem;
    margin-right: 0.05rem;
  }
}
</style>
