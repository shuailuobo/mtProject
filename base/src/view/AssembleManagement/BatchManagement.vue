<template>
  <div class="goods container">
    <section v-for="(item, index) in goodsList" :key="index">
      <div class="goodslist">
        <van-checkbox v-model="item.isCheck"></van-checkbox>
        <van-card
          :price="item.price"
          :title="item.name"
          :thumb="item.thumb"
          :origin-price="item.market_price"
        />
      </div>
    </section>

    <!-- <div>
      <van-tabs v-model="for_sale" @click="onClick">
        <van-tab name="1" title="出售中">
          <div class="goodsbox">
            <section v-for="(item, index) in goodsList" :key="index">
              <div class="goodslist">
                <van-checkbox v-model="item.isCheck"></van-checkbox>
                <van-card
                  :price="item.price"
                  :desc="'分类：' + item.cat_name"
                  :title="item.name"
                  :thumb="item.thumb"
                  :origin-price="item.market_price"
                />
              </div>
            </section>
          </div>
        </van-tab>
        <van-tab name="0" title="已下架">
          <div class="goodsbox">
            <section v-for="(item, index) in goodsList" :key="index">
              <div class="goodslist">
                <van-checkbox v-model="item.isCheck"></van-checkbox>
                <van-card
                  :price="item.price"
                  :desc="'分类：' + item.cat_name"
                  :title="item.name"
                  :thumb="item.thumb"
                  :origin-price="item.market_price"
                />
              </div>
            </section>
          </div>
        </van-tab>
      </van-tabs>
    </div> -->

    <div class="selectAll">
      <van-checkbox v-model="allCheck" @click="selectAll(allCheck)"
        >全选</van-checkbox
      >
    </div>

    <div class="bottom">
      <!-- <p @click="LowerShelfTap">{{ for_sale == "1" ? "下架" : "上架" }}</p>
      <p @click="Commodityshow = true">分类至</p> -->
      <p @click="DeleteTap">删除</p>
    </div>

    <!-- 上拉弹窗 -->
    <van-popup v-model="Commodityshow" position="bottom">
      <van-picker
        show-toolbar
        :columns="Commoditycolumns"
        @cancel="Commodityshow = false"
        @confirm="onCommodityConfirm"
      />
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
      /*全选、全不选*/
      allCheck: false, //全选功能
      // store_id: this.$route.query.store_id,
      goodsList: [],
      // CommodityValue: "",
      Commodityshow: false,
      Commoditycolumns: [],
      // for_sale: "1",
      selectedArr: []
    };
  },
  methods: {
    onClick() {
      this.selectedArr = [];
      this.StoreGoodsLists(this.for_sale);
    },
    async DeleteTap() {
      var that = this;
      this.goodsList.forEach(function(item) {
        if (item.isCheck == true) {
          that.selectedArr.push(item.id);
        }
      });
      try {
        let data = {
          id: that.selectedArr.toString()
        };
        const response = await BackStagemanagement.groupGoodsDelete(data);
        window.console.log(response.data);
        if (response.data.err_code == 0) {
          this.StoreGoodsLists();
        }
      } catch (error) {
        window.console.log(error.response);
      }
    },
    async onCommodityConfirm(value, index) {
      var that = this;
      this.goodsList.forEach(function(item) {
        if (item.isCheck == true) {
          that.selectedArr.push(item.id);
        }
      });
      try {
        let data = {
          id: that.selectedArr.toString(),
          cat_id: that.Commodity[index].id
        };
        const response = await BackStagemanagement.goodsBatch(data);
        window.console.log(response.data);
        if (response.data.err_code == 0) {
          this.StoreGoodsLists(this.for_sale);
        }
      } catch (error) {
        window.console.log(error.response);
      }
      this.Commodityshow = false;
    },
    LowerShelfTap() {
      var that = this;
      this.goodsList.forEach(function(item) {
        if (item.isCheck == true) {
          that.selectedArr.push(item.id);
        }
      });
      Dialog.confirm({
        title: "提示",
        message: "确认" + (this.for_sale == "1" ? "下架" : "上架")
      })
        .then(() => {
          // on confirm
          this.LowerShelf();
        })
        .catch(() => {
          // on cancel
        });
    },
    /*点击全选，选中所有复选框*/
    selectAll: function(data) {
      var that = this;
      //如果父级被选中，那么子集循环，全被给checked=true
      if (!data) {
        that.goodsList.forEach(function(item) {
          item.isCheck = true;
        });
      } else {
        //相反，如果没有被选中，子集应该全部checked=false
        that.goodsList.forEach(function(item) {
          item.isCheck = false;
        });
      }
    },
    async LowerShelf() {
      try {
        if (this.for_sale == "1") {
          this.for_sale = "0";
        } else {
          this.for_sale = "1";
        }
        let data = {
          id: this.selectedArr.toString(),
          for_sale: this.for_sale
        };
        const response = await BackStagemanagement.goodsBatch(data);
        window.console.log(response.data);
        if (response.data.err_code == 0) {
          this.StoreGoodsLists(this.for_sale);
        }
      } catch (error) {
        window.console.log(error.response);
      }
    },
    async StoreGoodsLists() {
      try {
        let data = {
          user_id: this.$cookies.get("userid")
          // store_id: this.store_id,
          // for_sale: for_sale
        };
        const response = await BackStagemanagement.groupGoods(data);
        window.console.log(response.data);
        if (response.data.err_code == 0) {
          this.goodsLists = response.data.data;
          for (let i = 0; i < response.data.data.length; i++) {
            this.goodsLists[i].isCheck = false;
          }
          this.goodsList = this.goodsLists;
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
          for (var i in response.data.data) {
            this.Commoditycolumns.push(response.data.data[i].name);
          }
          this.Commodity = response.data.data;
        }
      } catch (error) {
        window.console.log(error.response);
      }
    }
  },
  mounted() {
    this.StoreGoodsLists();
    // this.categoryLists();
  },
  watch: {
    /*监听全选事件*/
    goodsList: {
      handler(value) {
        var that = this;
        var count = 0;
        for (var i = 0; i < value.length; i++) {
          if (value[i].isCheck == true) {
            count++;
          }
        }
        //如果子集全部选中，全选按钮设置选中状态
        if (count == value.length) {
          that.allCheck = true;
        } else {
          that.allCheck = false;
        }
      },
      deep: true
    }
  }
};
</script>
<style lang="less" scoped>
.goodsbox {
  padding-bottom: 0.4rem;
}

.goodslist {
  display: flex;
  justify-content: left;
  background: #fff;
  padding: 0 0.15rem;
}

.van-card {
  background: #fff;
}

.bottom {
  position: fixed;
  bottom: 0;
  padding: 0.15rem 0.1rem;
  background: #fff;
  width: 100%;
  display: flex;
  justify-content: space-around;
}

.selectAll {
  position: fixed;
  width: 100%;
  bottom: 0.45rem;
  padding: 0.1rem 0.15rem;
  background: #fff;
}
</style>
