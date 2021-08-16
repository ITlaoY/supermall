<template>
  <div id="detail">
    <detail-nav-bar />
    <detail-swiper :top-images="topImages" />
    <detail-base-info :goods="goods"></detail-base-info>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";

import { getDetail, Goods } from "../../network/detail";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
    };
  },
  created() {
    //保存iid
    this.iid = this.$route.params.iid;
    //请求数据
    getDetail(this.iid).then((res) => {
      console.log(res);
      const data = res.result;
      //顶部轮播
      this.topImages = data.itemInfo.topImages;
      //获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
    });
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
  },
};
</script>

<style>
</style>