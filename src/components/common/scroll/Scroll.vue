<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scroll: null,
    };
  },
  mounted() {
    //穿件bscroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      observeDOM: true,
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
    });
    //监听滚动位置
    this.scroll.on("scroll", (position) => {
      // console.log(position);
      this.$emit("scroll", position);
    });
    //监听上拉事件
    this.scroll.on("pullingUp", () => {
      // console.log("111");
      this.$emit("pullingUp");
    });
  },
  methods: {
    scrollTo(x, y, time = 1000) {
      this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll.finishPullUp();
    },
  },
};
</script>

<style>
</style>