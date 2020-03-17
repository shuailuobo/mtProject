<template>
  <div class="box container">
    <!-- <HeaderTop :title="title"></HeaderTop> -->
    <!-- 商品图开始 -->
    <section>
      <div class="shangpin">
        <img :src="goodDetail.thumb" alt />
        <div class="xs">
          <img src="../../assets/GroupMall/CommodityDetails/xsys@2x.png" alt />
          <div>
            <h3 class="biaoti">
              {{
                goodDetail.type == 1
                  ? "限时秒杀"
                  : goodDetail.type == 2
                  ? "限时预售"
                  : goodDetail.type == 3
                  ? "限时折扣"
                  : "水果拼团"
              }}
            </h3>
            <div class="shijian" v-if="isexpire_time">
              <h3>距离结束还有</h3>
              <div>
                <van-count-down
                  format="DD天 HH:mm:ss"
                  :time="goodDetail.expire_time"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="shangpin_main">
        <h3>{{ goodDetail.name }}</h3>
        <h4>{{ goodDetail.description }}</h4>
        <div>
          <span>￥{{ goodDetail.price }}</span>
          <i>￥{{ goodDetail.market_price }}</i>
          <b>已拼{{ goodDetail.buy_times }}件</b>
        </div>
        <!-- <h5>满79减20 · 满55包邮</h5> -->
      </div>
    </section>
    <!-- 拼团开始 -->
    <section>
      <div class="pintuan_header">
        <van-cell is-link @click="PopupshowTap"
          ><span>{{ goodDetail.order_list.length }}</span
          >人在拼团</van-cell
        >
      </div>
      <div class="pintuan" v-if="goodDetail.order_list.length > 0">
        <div class="pintuan_main">
          <div
            class="pintuan_mainBox"
            v-for="(order, index) in goodDetail.order_list.slice(0, 2)"
            :key="index"
          >
            <div class="pintuan_mainL">
              <img
                :src="
                  order.head_img_url
                    ? order.head_img_url
                    : require('../../assets/amoy/head.png')
                "
              />
              <p>{{ order.nickname ? order.nickname : "默认用户" }}</p>
            </div>
            <div class="pintuan_mainR">
              <div>
                &nbsp;还差
                <i>{{ order.surplus }}</i
                >人拼成
              </div>
              <p>
                剩余
                <van-count-down
                  class="vct"
                  format="DD天HH:mm:ss"
                  :time="order.expire_time"
                />
              </p>
            </div>
            <div>
              <van-button
                @click="
                  $router.push({
                    name: 'JoinCompetition',
                    query: { id: order.id, buy_times: goodDetail.buy_times }
                  })
                "
                type="default"
                size="small"
                >去拼单</van-button
              >
              <!-- <van-button
                @click="
                  $router.push({
                    name: 'JoinCompetition',
                    query: {
                      initiator_id: order.id,
                      id: $route.params.id,
                      price: order.price,
                      price_id: order.price_id,
                      is_alone: 0,
                      number: 1,
                      spec: order.goods_spec,
                      thumb: goodDetail.thumb,
                      name: goodDetail.name
                    }
                  })
                "
                type="default"
                size="small"
                >去拼单</van-button -->
              <!-- > -->
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- 商品评价开始 -->
    <section>
      <div class="pinjia">
        <header class="baokuan_header">
          <div></div>
          <h3>商品评价</h3>
        </header>
        <div
          class="pinjia_main"
          v-for="(comment, index) in goodDetail.comment_list.length > 0
            ? goodDetail.comment_list.slice(0, 1)
            : goodDetail.comment_list"
          :key="index"
        >
          <div class="pinjia_mainT">
            <img
              :src="
                comment.head_img_url
                  ? comment.head_img_url
                  : require('../../assets/amoy/head.png')
              "
            />
            <h3>
              {{ comment.nickname ? comment.nickname : "默认用户" }}
            </h3>
            <h4>{{ comment.create_time }}</h4>
          </div>
          <van-rate v-model="comment.star" size="12px" readonly />
          <div class="pinjia_mainF">
            <div>{{ comment.content }}</div>
          </div>
          <div class="pinjia_footer" v-if="comment.images">
            <ul>
              <li
                v-for="(item, index) in comment.images.split(',')"
                :key="index"
              >
                <img
                  :src="item"
                  alt=""
                  @click="showImagePreview(comment.images.split(','), index)"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="pinjia_footer">
        <button @click="goEvaluate">
          查看全部
          <!-- (<i>{{ goodDetail.comment_list.length }}</i >) -->
        </button>
      </div>
    </section>
    <!-- 商品详情开始 -->
    <section>
      <div class="sxiangqin">
        <header class="sxiangqin_header">
          <div></div>
          <h3>商品详情</h3>
        </header>
        <div class="goodDetails" v-html="goodDetail.content"></div>
      </div>
    </section>
    <!-- 底部导航栏 -->
    <section>
      <van-goods-action style="display:flex;">
        <van-goods-action-icon
          icon="home-o"
          text="首页"
          @click="$router.push('/groupmall')"
        />
        <!-- <van-goods-action-icon icon="share" text="分享" @click="share()" /> -->
        <van-goods-action-button
          type="warning"
          :text="'单独购买'"
          color="#FDAEB2"
          @click="showBase1 = true"
        />
        <van-goods-action-button
          type="danger"
          :text="'拼团购买'"
          color="#FC5D65"
          @click="showBase = true"
        />

        <!-- <van-goods-action-button
          v-for="(price,index) in goodDetail.price_list"
          :key="index"
          :color="index == 0 ? '#FDAEB2' : '#FC5D65' "
          type="warning"
          :text=" index == 0 ? '单独购买￥'+ price.price : '拼团购买￥'+ price.price"
          @click="onClickButton"
        /> -->
      </van-goods-action>
    </section>
    <!-- 弹出层 -->
    <section>
      <!-- 基础用法            :show-soldout-sku='false'-->
      <div class="sku-container">
        <van-sku
          v-model="showBase"
          :hide-stock="false"
          :show-add-cart-btn="false"
          :sku="skuData.sku"
          :goods="skuData.goods_info"
          :goods-id="skuData.goods_id"
          reset-stepper-on-hide
          reset-selected-sku-on-hide
          disable-stepper-input
          :close-on-click-overlay="closeOnClickOverlay"
          :custom-sku-validator="customSkuValidator"
          :show-soldout-sku="false"
          @buy-clicked="onBuyClicked"
        >
          <template slot="extra-sku-group" slot-scope="">
            <div class="teaminfo" @click="infoTap">
              团长提成说明
            </div>
          </template>
        </van-sku>
      </div>
    </section>
    <!-- 弹出层 单独购买 -->
    <section>
      <!-- 基础用法 -->
      <div class="sku-container">
        <van-sku
          v-model="showBase1"
          :hide-stock="false"
          :show-add-cart-btn="false"
          :sku="skuData.sku2"
          :goods="skuData.goods_info"
          :goods-id="skuData.goods_id"
          reset-stepper-on-hide
          reset-selected-sku-on-hide
          disable-stepper-input
          :close-on-click-overlay="closeOnClickOverlay"
          :custom-sku-validator="customSkuValidator"
          @buy-clicked="onBuyClicked2"
        />
      </div>
    </section>

    <section>
      <van-popup
        style="width:70%;max-height:80%;"
        v-model="Popupshow"
        closeable
        close-icon="close"
      >
        <div class="pintuan">
          <div class="pintuan_main">
            <div
              class="pintuan_mainBox"
              style="margin-top: 0.15rem;"
              v-for="(order, index) in goodDetail.order_list"
              :key="index"
            >
              <div class="pintuan_mainL">
                <img
                  :src="
                    order.head_img_url
                      ? order.head_img_url
                      : require('../../assets/amoy/head.png')
                  "
                />
              </div>
              <div class="pintuan_mainR">
                <div style="display:flex;">
                  <p
                    style="width: 0.6rem;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;"
                  >
                    {{ order.nickname ? order.nickname : "默认用户" }}
                  </p>
                  <p>
                    &nbsp;还差<i>{{ order.surplus }}</i
                    >人
                  </p>
                </div>
                <p>
                  剩余
                  <van-count-down
                    class="vct"
                    format="DD天HH:mm:ss"
                    :time="order.expire_time"
                  />
                </p>
              </div>
              <div>
                <van-button
                  @click="
                    $router.push({
                      name: 'JoinCompetition',
                      query: { id: order.id, buy_times: goodDetail.buy_times }
                    })
                  "
                  type="default"
                  size="small"
                  >去拼单</van-button
                >
              </div>
            </div>
          </div>
        </div>
      </van-popup>
    </section>
    <section>
      <van-popup v-model="showShare">
        <img :src="qrcode" alt="" style="width:100%;height:auto;" />
      </van-popup>
    </section>

    <section>
      <van-popup
        v-model="teamShow"
        position="top"
        closeable
        :style="{ height: 'auto' }"
      >
        <div class="teamExplain">{{ teamExplain }}</div>
      </van-popup>
    </section>
  </div>
</template>
<script>
import GroupMall from "../../config/GroupMall";
import { ImagePreview } from "vant";
import publish from "../../config/publish";
export default {
  components: {
    [ImagePreview.name]: ImagePreview
  },
  data() {
    return {
      title: "商品详情",
      goodDetaildjs: "",
      skuData: {},
      goodDetail: "",
      showBase: false,
      showBase1: false,
      showCustom: false,
      showStepper: false,
      showSoldout: false,
      closeOnClickOverlay: true,
      Popupshow: false,
      showShare: false,
      teamShow: false,
      qrcode: "",
      isexpire_time: true,
      teamExplain: "试用期代理考核：考核时间90天",
      customSkuValidator: () => "请选择商品!"
    };
  },
  mounted() {
    this.getGroupMallysGoodsDetail();
    // 分享页面
    this.common.login();
  },
  created() {
    publish.firstRes(this);
  },
  methods: {
    PopupshowTap() {
      if (this.goodDetail.order_list.length > 0) {
        this.Popupshow = true;
      }
    },
    onChange(index) {
      this.index = index;
    },
    showImagePreview(images, position, timer) {
      const instance = ImagePreview({
        images,
        swipeDuration: 300,
        asyncClose: !!timer,
        closeOnPopstate: true,
        startPosition: typeof position === "number" ? position : 0
      });
      if (timer) {
        setTimeout(() => {
          instance.close();
        }, timer);
      }
    },
    // showPopup() {
    //   this.Popupshow = true;
    // },
    async getGroupMallysGoodsDetail() {
      try {
        let data = {
          id: this.$route.params.id
        };
        const response = await GroupMall.getGoodsDetail(data);
        window.console.log(response.data);
        this.goodDetaildjs = response.data.data;
        this.common.Share(
          response.data.data.name,
          location.href + "?id=" + response.data.data.id,
          response.data.data.thumb,
          response.data.data.description
        );

        let resdata = response.data.data.spec_list;
        let SkuDatas = [];
        for (let index in resdata) {
          // if (resdata[index].price_data == null) {
          //   let price_data = [
          //     {
          //       goods_spec_id: resdata[index].id
          //     }
          //   ];
          //   resdata[index].price_data = price_data;
          // }
          SkuDatas.push({
            id: resdata[index].id,
            goods_id: resdata[index].goods_id,
            name: resdata[index].name,
            price: resdata[index].price,
            profit: resdata[index].profit,
            stock: Number(resdata[index].stock),
            price_data: resdata[index].price_data
          });
        }

        let resdata2 = SkuDatas;
        let SkuDatas2 = [];
        for (let i in resdata2) {
          for (let j in resdata2[i].price_data) {
            SkuDatas2.push({
              id: resdata2[i].price_data[j].id,
              goods_spec_id: resdata2[i].price_data[j].goods_spec_id,
              price: resdata2[i].price_data[j].price,
              profit: resdata2[i].price_data[j].profit,
              name:
                resdata2[i].price_data[j].number +
                "人 团购价" +
                resdata2[i].price_data[j].price +
                "元 " +
                "团长提成" +
                Math.round((resdata2[i].price_data[j].profit / 2) * 100) / 100 +
                "元/件",
              goods_id: resdata2[i].goods_id,
              stock_num: Number(resdata2[i].stock)
            });
          }
        }

        let resdata3 = SkuDatas;
        let SkuDatas3 = [];
        for (let i in resdata3) {
          for (let j in resdata3[i].price_data) {
            SkuDatas3.push({
              id: j,
              s1: resdata3[i].price_data[j].goods_spec_id,
              s2: resdata3[i].price_data[j].id,
              price: resdata3[i].price_data[j].price * 100,
              discount: resdata3[i].name,
              stock_num: Number(resdata3[i].stock),
              goods_id: resdata3[i].goods_id,
              s3: "0"
            });
          }
        }

        let resdata4 = SkuDatas;
        let SkuDatas4 = [];

        for (let i in resdata4) {
          if (resdata4[i].price_data == null) {
            let price_data = [
              {
                goods_spec_id: resdata4[i].id
              }
            ];
            resdata4[i].price_data = price_data;
          }
          for (let j in resdata4[i].price_data) {
            SkuDatas4.push({
              id: j,
              s1: resdata4[i].price_data[j].goods_spec_id,
              s2: resdata4[i].id,
              price: resdata4[i].price * 100,
              discount: resdata4[i].name,
              stock_num: Number(resdata4[i].stock),
              goods_id: resdata4[i].goods_id
              // s3: "0"
            });
          }
        }
        this.skuData = {
          goods_id: response.data.data.id,
          goods_info: {
            title: response.data.data.name,
            picture: response.data.data.thumb
          },
          sku: {
            price: response.data.data.price,
            stock_num: Number(response.data.data.spec_list[0].stock), // 商品总库存
            tree: [
              {
                k: "规格",
                v: SkuDatas,
                k_s: "s1"
              },
              {
                k: "团购人数",
                v: SkuDatas2,
                k_s: "s2"
              }
            ],
            list: SkuDatas3
          },
          sku2: {
            price: response.data.data.price,
            stock_num: Number(response.data.data.spec_list[0].stock), // 商品总库存
            tree: [
              {
                k: "规格",
                v: SkuDatas,
                k_s: "s1"
              }
            ],
            list: SkuDatas4
          }
        };
        this.getdjsTimes(response.data.data.expire_time);
        for (var key in response.data.data.order_list) {
          this.getdjsTimes2(
            response.data.data.order_list[key].expire_time,
            key
          );
        }
      } catch (error) {
        // window.console.log(error.response);
      }
    },
    getdjsTimes(time) {
      const nowDate = new Date().getTime();
      const oldTime = new Date(time.replace(/-/g, "/")).getTime();
      if (isNaN(oldTime)) {
        this.goodDetaildjs.expire_time = 0;
        this.isexpire_time = false;
      } else {
        this.goodDetaildjs.expire_time = oldTime - nowDate;
      }
      this.goodDetail = this.goodDetaildjs;
    },
    getdjsTimes2(time, key) {
      var times = this.goodDetaildjs.order_list[key].expire_time.replace(
        /-/g,
        "/"
      );
      const nowDate = new Date().getTime();
      const nowDate1 = new Date(times).getTime();
      this.goodDetaildjs.order_list[key].expire_time = nowDate1 - nowDate;
      this.goodDetail = this.goodDetaildjs;
    },
    // onClickButton() {
    //   this.$router.push({
    //     name: "fillOrder",
    //     query: {
    //       id: this.$route.params.id,
    //       price: this.goodDetail.price,
    //       price_id: this.goodDetail.id,
    //       is_alone: 1,
    //       number: 1
    //     }
    //   });
    // },
    goEvaluate() {
      this.$router.push({
        name: "AllEvaluate",
        params: { id: this.$route.params.id }
      });
    },
    infoTap() {
      //团长提成说明
      this.teamShow = true;
    },
    onBuyClicked(data) {
      window.console.log(data);
      this.$router.push({
        name: "fillOrder",
        query: {
          id: data.goodsId,
          price: data.selectedSkuComb.price / 100,
          price_id: data.selectedSkuComb.s2,
          is_alone: 0,
          number: data.selectedNum,
          spec: data.selectedSkuComb.discount,
          thumb: this.goodDetail.thumb,
          name: this.goodDetail.name
        }
      });
    },
    onBuyClicked2(data) {
      window.console.log(data);
      this.$router.push({
        name: "fillOrder",
        query: {
          id: data.goodsId,
          price: data.selectedSkuComb.price / 100,
          price_id: data.selectedSkuComb.s2,
          is_alone: 1,
          number: data.selectedNum,
          spec: data.selectedSkuComb.discount,
          thumb: this.goodDetail.thumb,
          name: this.goodDetail.name
        }
      });
    },
    onAddCartClicked(data) {
      this.$toast("add cart:" + JSON.stringify(data));
    },
    async share() {
      try {
        let data = {
          id: this.$route.params.id
        };
        const response = await GroupMall.getQrcode(data);
        window.console.log(response.data);
        if (response.data.err_code == 0) {
          this.qrcode = response.data.data.qrcode;
          this.showShare = true;
        }
      } catch (error) {
        window.console.log(error.response);
      }
    }
  }
};
</script>
<style lang="less" scoped>
.demo-sku .sku-container {
  padding: 0 15px;
}

.box {
  padding-bottom: 0;
}
.shangpin {
  width: 100%;
  height: 3.75rem;
  position: relative;
  overflow: hidden;
  > img {
    display: block;
    width: 100%;
    height: 100%;
  }
  > .xs {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1.345rem;
    overflow: hidden;
    img {
      display: block;
      transform: scale(1.1);
      width: 100%;
      position: absolute;
      bottom: -0.09rem;
      left: 0;
    }
    // @include bg-image("../../assets/GroupMall/CommodityDetails/xsys")
    .biaoti {
      position: absolute;
      top: 0.475rem;
      left: 0.15rem;
      line-height: 0.36rem;
      letter-spacing: 0.1rem;
      font-size: 0.24rem;
      width: 1.01rem;
      color: #fff;
    }
    .shijian {
      display: flex;
      position: absolute;
      bottom: 0.1rem;
      right: 0.2rem;
      color: #fff;
      h3 {
        font-size: 0.15rem;
        line-height: 0.275rem;
        height: 100%;
        letter-spacing: 0.03rem;
      }
      div {
        font-size: 0.2rem;
        margin-left: 0.05rem;
        i {
          font-style: normal;
          margin: 0 0.05rem;
        }
      }
    }
  }
}
.shangpin_main {
  background-color: #fff;
  box-sizing: border-box;
  height: auto;
  padding: 0.135rem 0.155rem;
  > h3 {
    font-size: 0.15rem;
    line-height: 0.225rem;
    font-weight: 700;
    color: #333;
  }
  > h4 {
    font-size: 0.12rem;
    //  line-height: 0.45rem;
    margin-top: 0.125rem;
    color: #999999;
  }
  > div {
    position: relative;
    margin-top: 0.15rem;
    span {
      font-size: 0.18rem;
      font-style: normal;
      color: #f92d36;
      margin-right: 0.1rem;
    }
    i {
      display: inline-block;
      font-style: normal;
      position: relative;
      font-size: 0.09rem;
      &::before {
        content: "";
        width: 100%;
        height: 1px;
        background-color: #999999;
        position: absolute;
        top: 0.06rem;
        left: 0.005rem;
        transform: rotate(7deg);
        -ms-transform: rotate(7deg);
        -webkit-transform: rotate(17deg);
      }
    }
    b {
      font-weight: normal;
      position: absolute;
      right: 0;
      bottom: 0;
      font-size: 0.1rem;
      color: #333;
    }
  }
  > h5 {
    // @include top-border-1px(#eee);
    border-bottom: 1px solid #eee;
    margin-top: 0.1rem;
    line-height: 0.245rem;
    font-size: 0.12rem;
    color: #333;
  }
}

.pintuan_header {
  margin-top: 0.1rem;
  span {
    font-style: normal;
    color: #fc5d65;
  }
}

.pintuan {
  height: auto;
  padding: 0.15rem 0.155rem;
  background-color: #fff;
  // margin-top: 0.1rem;
  .pintuan_main {
    overflow: hidden;
    > .pintuan_mainBox {
      margin-top: 0.0325rem;
      // height: 1.3rem;
      align-items: center;
      justify-content: space-between;
      display: flex;
      > .pintuan_mainL {
        display: flex;
        > img {
          display: block;
          width: 0.4rem;
          height: 0.4rem;
          border-radius: 50%;
          background-color: green;
        }
        > p {
          line-height: 0.4rem;
          margin-left: 0.1rem;
          font-size: 0.14rem;
          color: #333;
          width: 1rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      .pintuan_mainR {
        line-height: 0.25rem;
        // transform: translateX(0.4rem);
        font-size: 0.12rem;
        > div {
          i {
            font-style: normal;
            color: #fc5d65;
          }
        }
        p {
          i {
            font-style: normal;
          }
        }
      }
    }
  }
}
.pinjia {
  box-sizing: border-box;
  margin-top: 0.1rem;
  // height: 1.15rem;
  padding: 0.1rem 0.155rem;
  background-color: #fff;
  .baokuan_header {
    height: 0.4rem;
    display: flex;
    align-items: center;
    div {
      width: 0.02rem;
      height: 0.14rem;
      background-color: #fc5d65;
      margin-right: 0.055rem;
      transform: translate(0, 0.01rem);
    }
    h3 {
      font-size: 0.14rem;
      font-weight: 700;
    }
  }
  .pinjia_main {
    .pinjia_mainT {
      display: flex;
      align-items: center;
      position: relative;
      > img {
        display: block;
        width: 0.25rem;
        height: 0.25rem;
        border-radius: 50%;
        background-color: green;
        margin-right: 0.1rem;
      }
      h3 {
        font-size: 0.12rem;
        color: #666666;
      }
      h4 {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        font-size: 0.1rem;
        color: #999999;
        i {
          font-style: normal;
          margin-left: 0.075rem;
        }
      }
    }
    .pinjia_mainF {
      div {
        font-size: 0.12rem;
        color: #333;
        margin-top: 0.1rem;
      }
    }
    .pinjia_footer {
      height: 1.1rem;
      margin-top: 0.155rem;
      > ul {
        display: flex;
        li {
          margin-right: 0.05rem;
          img {
            width: 1.1rem;
            height: 1.1rem;
          }
        }
      }
    }
  }
}
.pinjia_footer {
  height: 0.3rem;
  text-align: center;
  background-color: #fff;
  line-height: 0.3rem;
  overflow: hidden;
  border-top: 1px solid #eee;
  // @include top-border-1px(#eee);
  button {
    border: none;
    background-color: #fff;
    font-size: 0.1rem;

    i {
      font-style: normal;
    }
  }
}

.sxiangqin {
  box-sizing: border-box;
  margin-top: 0.1rem;
  padding: 0 0.155rem;
  background-color: #fff;
  .sxiangqin_header {
    height: 0.4rem;
    display: flex;
    align-items: center;
    div {
      width: 0.02rem;
      height: 0.14rem;
      background-color: #fc5d65;
      margin-right: 0.055rem;
      transform: translate(0, 0.01rem);
    }
    h3 {
      font-size: 0.14rem;
      font-weight: 700;
    }
  }
  .goodDetails {
    /deep/ img {
      width: 100%;
      height: auto;
    }
  }
}
.footNav {
  height: 0.49rem;
  position: fixed;
  bottom: 0;
  left: 0;
  border-top: 1px solid #eee;
  // @include top-border-1px(#eee);
  background-color: #fff;
}

.dandu {
  // box-sizing: border-box;
  display: inline-block;
  background-color: #fdaeb2;
  border-color: #fdaeb2;
  position: relative;
  // top: 0.18rem;
  padding: 0;
  height: 44px;
  line-height: 42px;
  font-size: 0.1rem;
  border-radius: 34px 0 0 34px;
  text-align: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-appearance: none;
  -webkit-text-size-adjust: 100%;
  margin-left: 0.25rem;
}
.faqi {
  display: inline-block;
  position: relative;
  // top: 0.18rem;
  right: 4px;
  padding: 0;
  height: 44px;
  line-height: 42px;
  font-size: 0.1rem;
  border-radius: 0 34px 34px 0;
  text-align: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-appearance: none;
  -webkit-text-size-adjust: 100%;
}
.van-goods-action-big-btn {
  /* -webkit-box-flex: 1; */
  // -ms-flex: 1;
  //  flex: 0.5;
  padding: 0;
  height: 0.34rem;
  width: 1.05rem;
  align-items: center;
}
.van-goods-action {
  justify-content: start;
  left: 0;
  right: 0;
  bottom: 0;
  display: -webkit-box;
  display: -ms-flexbox;
  // display: flex;
  position: fixed;
  background-color: #fff;
  // @include top-border-1px(#eee);
  align-items: center;
}

.van-count-down {
  color: #fff;
}

.vct {
  color: #000;
  display: inline-block;
  font-size: 0.12rem;
}

.van-button--default {
  background: #fc5d65;
  color: #fff;
  // border: none;
  // height: 0.3rem;
  // line-height: 0.3rem;
}

.teaminfo {
  color: #4d92f1;
  margin-left: 0.15rem;
}

.teamExplain {
  text-indent: 2em;
  margin-top: 0.3rem;
  padding: 0.1rem 0.15rem;
  font-size: 0.14rem;
  line-height: 0.24rem;
}
</style>
