<template>
  <div v-if="Object.keys(goods).length !== 0" class="base-info">
    <div class="info-title">{{ goods.title }}</div>
    <div class="info-price">
      <span class="n-price">{{ goods.newPrice }}</span>
      <span class="o-price">{{ goods.oldPrice }}</span>
      <span v-if="goods.discount" class="discount">{{ goods.discount }}</span>
    </div>
    <div class="info-other">
      <span>{{ goods.columns[0] }}</span>
      <span>{{ goods.columns[1] }}</span>
      <span>{{ goods.services[goods.services.length - 1].name }}</span>
    </div>
    <div class="info-service">
      <span
        class="info-service-item"
        v-for="index in goods.services.length - 1"
        :key="index"
      >
        <img :src="goods.services[index - 1].icon" />
        <span>{{ goods.services[index - 1].name }}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBaseInfo",
  props: {
    goods: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style scoped>
.base-info {
  margin-top: 15px;
  padding: 0 8px;
  color: #999;
  border-bottom: 5px solid #f2f5f8;
}
.info-title {
  color: #222;
}
.info-price {
  position: relative;
  margin-top: 10px;
}
.info-price .n-price {
  font-size: 24px;
  color: var(--color-high-text);
}
.info-price .o-price {
  font-size: 13px;
  margin-left: 5px;
  text-decoration: line-through;
}
.discount {
  position: absolute;
  height: 20px;
  line-height: 20px;
  text-align: center;
  font-size: 8px;
  color: #fff;
  border: 1px solid var(--color-high-text);
  border-radius: 10px;
  background-color: var(--color-high-text);
}
.info-other {
  margin-top: 23px;
  display: flex;
  margin-bottom: 10px;
}
.info-other span {
  flex: 1;
  font-size: 12px;
  text-align: center;
}
.info-other span:first-child {
  text-align: left;
}
.info-other span:last-child {
  text-align: right;
}
.info-service {
  text-align: center;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  padding: 20px 0;
  display: flex;
}
.info-service span:first-child {
  text-align: left;
}
.info-service span:last-child {
  text-align: right;
}
.info-service-item {
  flex: 1;
}
.info-service-item img {
  width: 10px;
  height: 10px;
}
.info-service-item span {
  color: #333;
  font-size: 12px;
}
</style>