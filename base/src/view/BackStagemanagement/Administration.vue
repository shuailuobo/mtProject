<template>
  <div class="container">
    <!-- 分类列表 -->
    <van-cell
      style="margin-bottom:0.1rem;"
      :title="item.name"
      v-for="(item, index) in ClassifiedList"
      :key="index"
    >
      <!-- 使用 right-icon 插槽来自定义右侧图标 -->
      <van-icon
        slot="right-icon"
        name="edit"
        size="20px"
        @click="editTap(item.id)"
        style="line-height: inherit;margin:0 0.05rem;"
      />
      <van-icon
        slot="right-icon"
        name="delete"
        @click="deleteTap(item.id)"
        size="20px"
        style="line-height: inherit;margin:0 0.05rem;"
      />
    </van-cell>

    <!-- 底部按钮 -->
    <div class="setBottom">
      <div @click="show = true">
        <van-icon name="add-o" size="24px" color="#CC2C35" />
        <p>新建分类</p>
      </div>
    </div>
    <!--  -->
    <section>
      <van-dialog
        v-model="show"
        @confirm="onConfirm"
        title="新建分类"
        show-cancel-button
      >
        <van-field v-model="classification" placeholder="请输入分类名称" />
      </van-dialog>
    </section>
    <section>
      <van-dialog
        v-model="editshow"
        @confirm="onEdit(editObjid)"
        title="编辑分类"
        show-cancel-button
      >
        <van-field v-model="classification" placeholder="请输入分类名称" />
      </van-dialog>
    </section>
  </div>
</template>

<script>
import BackStagemanagement from "../../config/BackStagemanagement";
import { Dialog } from "vant";
export default {
  components: { [Dialog.Component.name]: Dialog.Component },
  data() {
    return {
      classification: "",
      show: false,
      editshow: false,
      ClassifiedList: [],
      store_id: this.$route.query.store_id,
      editObjid: ""
    };
  },
  computed: {},
  methods: {
    deleteTap(id) {
      Dialog.confirm({
        title: "提示",
        message: "确认删除"
      })
        .then(() => {
          // on confirm
          this.categoryDeleteTap(id);
        })
        .catch(() => {
          // on cancel
        });
    },
    editTap(id) {
      this.editObjid = id;
      this.editshow = true;
    },
    async categoryDeleteTap(id) {
      try {
        let data = {
          id: id
        };
        const response = await BackStagemanagement.categoryDelete(data);
        window.console.log(response.data);
        if (response.data.err_code == 0) {
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
          this.classification = "";
        }
      } catch (error) {
        window.console.log(error.response);
      }
    },
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
    async onEdit(id) {
      try {
        let data = {
          id: id,
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
