<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" />
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop" />
      <detail-comment-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info :param-info="paramInfo" />
      <detail-pinglun-info :pinglun-info="PinglunInfo" />
      <goods-list :goods="recommends"></goods-list>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue";
import DetailParamInfo from "./childComps/DetailParamInfo.vue";
import DetailPinglunInfo from "./childComps/DetailPinglunInfo.vue";

import Scroll from "../../components/common/scroll/Scroll.vue";
import GoodsList from "../../components/content/goods/GoodsList.vue";
// import { itemListenerMiXin } from "../../common/mixin";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "../../network/detail";
import { debounce } from "../../common/utils";

export default {
  name: "Detail",
  // mixins: [itemListenerMiXin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      PinglunInfo: {},
      recommends: [],
      itemImgListener: null,
    };
  },
  created() {
    //保存iid
    this.iid = this.$route.params.iid;
    //请求详情数据
    getDetail(this.iid).then((res) => {
      // console.log(res);
      const data = res.result;
      //顶部轮播
      this.topImages = data.itemInfo.topImages;

      //获取各个信息
      //1.保存商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      //2.保存店铺信息
      this.shop = new Shop(data.shopInfo);

      //3.保存商品详情数据
      this.detailInfo = data.detailInfo;

      //4.保存参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      //5.评论信息
      if (data.rate.cRate !== 0) {
        this.PinglunInfo = data.rate.list[0];
      }
    });

    //请求推荐数据
    getRecommend().then((res) => {
      console.log(res);
      this.recommends = res.data.list;
    });
  },

  methods: {
    imageLoad() {
      this.$refs.scroll.refresh();
    },
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailCommentInfo,
    DetailParamInfo,
    DetailPinglunInfo,
    GoodsList,
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 200);
    this.itemImgListener = () => {
      refresh();
    };
    this.$bus.$on("itemImgLoad", this.itemImgListener);
  },
  distroyed() {
    this.$bus.$off("itemImgLoad", this.itemImgListener);
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 20;
  background-color: #fff;
  height: 100vh;
}
.content {
  height: calc(100% - 44px);
}
.detail-nav {
  position: relative;
  z-index: 101;
  background-color: #fff;
}
</style>