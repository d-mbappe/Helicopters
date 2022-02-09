<template>
  <div class="catalog-card">
    <div class="catalog-card__title">
      {{ item.title }}
    </div>

    <div v-if="item.data" class="catalog-card__data">
      <div v-for="(item, key) in item.data" :key="key">
        <span class="catalog-card__data--key"> 
          {{ key }}: 
        </span>
        <span class="catalog-card__data--item">
          {{ item }}
        </span>
      </div>
    </div>

    <div v-if="item.status">
      <span class="item.status.type">
        {{ item.status.type }}
      </span>
      {{ item.status.name }}
    </div>

    <router-link
      v-if="item.linkName"
      :to="{ name: item.linkName }"
      class="catalog-card__link"
    >
      посмотреть
    </router-link>
    <router-link
      v-if="item.link"
      :to="item.link"
      class="catalog-card__link"
    >
      посмотреть
    </router-link>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>

<style lang="scss" scoped>
.catalog-card {
  width: 24%;
  padding: 25px 25px 20px;
  box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.06);
  border-radius: 4px;
  background: #fff;
  letter-spacing: 0.01em;
  position: relative;

  &__title {
    flex: 1 1 auto;
    color: #323c47;
    font-size: 18px;
    line-height: 21px;
    font-weight: 500;
  }

  &__data {
    font-size: 13px;
    &--item {
      font-weight: bold;
    }
  }

  &__link {
    flex: 0 0 auto;
    color: #109cf1;
    font-size: 13px;
    line-height: 15px;
  }
}
</style>
