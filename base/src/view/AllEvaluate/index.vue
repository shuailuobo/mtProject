<template>
  <div class="pinjia container">
    <!-- <HeaderTop :title="title"></HeaderTop> -->
    <!-- 全部评价 -->
    <section>
      <div v-if="noappraise">暂无评价内容</div>
      <div class="pinjiaBox">
        <div
          class="pinjiacloum"
          v-for="(appraiselist, index) in appraiselists"
          :key="index"
        >
          <div class="pinjia_mainT">
            <img
              :src="
                appraiselist.head_img_url
                  ? appraiselist.head_img_url
                  : require('../../assets/amoy/head.png')
              "
              alt=""
            />
            <h3>
              {{ appraiselist.username ? appraiselist.username : "默认用户" }}
            </h3>
            <h4>{{ appraiselist.create_time }}</h4>
          </div>
          <van-rate v-model="appraiselist.star" size="12px" readonly />
          <div class="pinjia_mainF">
            <div>{{ appraiselist.content }}</div>
          </div>
          <div class="pinjia_footer" v-if="appraiselist.images">
            <ul>
              <li
                v-for="(item, index) in appraiselist.images.split(',')"
                :key="index"
              >
                <img
                  :src="item"
                  alt=""
                  @click="
                    showImagePreview(appraiselist.images.split(','), index)
                  "
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
// import HeaderTop from "@/components/HeaderTop/index";
import GroupMall from "../../config/GroupMall";
import { ImagePreview } from "vant";
export default {
  components: {
    [ImagePreview.name]: ImagePreview
  },
  data() {
    return {
      title: "全部评价",
      noappraise: false,
      appraiselists: ""
    };
  },
  async created() {
    let data = {
      id: this.$route.params.id
    };
    try {
      const response = await GroupMall.getGoodsDetail(data);
      window.console.log(response.data);
      if (response.data.data.comment_list.length > 0) {
        this.appraiselists = response.data.data.comment_list;
      } else {
        this.noappraise = true;
      }
    } catch (error) {
      window.console.log(error.response);
    }
  },
  methods: {
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
    }
  }
};
</script>
<style lang="less" scoped>
.pinjia {
  // padding: 0 0.31rem;
}
.pinjiaBox {
  div:nth-child(1) {
    margin-top: 0;
  }
  .pinjiacloum {
    padding: 0.1rem 0.155rem 0.155rem 0.155rem;
    background-color: #fff;
    box-sizing: border-box;
    margin-top: 0.1rem;
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
</style>
