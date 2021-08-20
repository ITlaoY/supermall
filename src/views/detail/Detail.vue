<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav" />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
    >
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop" />
      <detail-comment-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info :param-info="paramInfo" ref="params" />
      <detail-pinglun-info :pinglun-info="PinglunInfo" ref="pinglun" />
      <goods-list :goods="recommends" ref="recommend"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <detail-bottom-bar></detail-bottom-bar>
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
import DetailBottomBar from "./childComps/DetailBottomBar.vue";

import Scroll from "../../components/common/scroll/Scroll.vue";
import GoodsList from "../../components/content/goods/GoodsList.vue";
import BackTop from "../../components/content/backtop/BackTop.vue";
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
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
      isShowBackTop: false,
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

      // this.$nextTick(() => {
      //   //获取各模块offsettop
      //   this.themeTopYs.push(0);
      //   this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.pinglun.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      //   console.log(this.themeTopYs);
      // });
    });

    //请求推荐数据
    getRecommend().then((res) => {
      // console.log(res);
      this.recommends = res.data.list;
    });
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = [];
      //-44是减去navbar的高度
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44);
      this.themeTopYs.push(this.$refs.pinglun.$el.offsetTop - 44);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44);
      this.themeTopYs.push(Number.MAX_VALUE);
      console.log(this.themeTopYs);
    }, 100);
  },

  methods: {
    imageLoad() {
      this.$refs.scroll.refresh();
      this.getThemeTopY();
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200);
    },
    contentScroll(position) {
      const positionY = -position.y;
      let length = this.themeTopYs.length;
      for (let i = 0; i < length - 1; i++) {
        // if (
        //   positionY > this.themeTopYs[i] &&
        //   positionY < this.themeTopYs[i + 1]
        // ) {
        //   console.log(i);
        // }
        if (
          this.currentIndex != i &&
          positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          console.log(i);
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }

      //判断BackTop是否显示
      this.isShowBackTop = -position.y > 1000;
      //决定tabControl是否吸顶
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    backClick() {
      //上拉回到顶部
      this.$refs.scroll.scrollTo(0, 0);
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
    DetailBottomBar,
    BackTop,
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