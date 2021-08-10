<template>
  <div class="recommend">
    <div
      v-for="(item, index) in recommends"
      :key="index"
      class="recommend-item"
    >
      <a :href="item.link">
        <img :src="item.image" alt="" />
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeRecommend",
  props: {
    recommends: {
      type: Array,
      defalut() {
        return [];
      },
    },
  },
};
</script>

<style>
.recommend {
  padding: 10px 0 20px;
  border-bottom: 10px solid #eee;
  display: flex;
  width: 100%;
  /* height: 100px; */
  text-align: center;
  font-size: 12px;
}
.recommend-item {
  flex: 1;
}
.recommend-item img {
  width: 70px;
  height: 70px;
  margin-bottom: 10px;
}
</style>