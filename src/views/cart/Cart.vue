<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar>
      <div slot="center" class="nav-bar">购物车({{ cartLength }})</div>
    </nav-bar>
    <!-- //商品列表 -->
    <cart-list></cart-list>
    <!-- //底部汇总 -->
  </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar.vue";

import CartList from "./childComps/CartList.vue";
import { mapGetters } from "vuex";
export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
  },
  computed: {
    ...mapGetters(["cartLength"]),
  },
};
</script>

<style scoped>
.cart {
  height: 100vh;
}
.nav-bar {
  display: block;
  color: #fff;
  font-weight: 700;
  text-align: center;
  background-color: var(--color-tint);
}
</style>