<template>
  <div class="cards">
    <Card
      v-for="(card, key) in data"
      :key="key"
      :item="card"
      class="catalog__card"
      data="data"
    />
    <Paginator v-if="isPaginationActive"/>
  </div>
</template>
<script>
import Card from '@/components/common/Card';
export default {
  name: 'CardsGallery',
  components: {
    Card,
  },
  props: {
    data: {
      type: Array,
      default: () => ([]),
    },
    isPaginationActive: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
  .cards {
    display: flex;
    flex-wrap: wrap;
    grid-gap: 10px;
  }
</style>