<template>
  <section>
    <div class="contract">
      <CardsGallery
        :data="list"
      />
    </div>
  </section>
</template>

<script>
  import CardsGallery from '@/components/common/CardsGallery';

  export default {
    name: 'PageContract',
    components: {
      CardsGallery,
    },
    data () {
      return {
        list: [
          { title: 'Перечень работ', linkName: 'PageContractWorkList' },
          { title: 'Кооперация', linkName: 'Cooperations' },
          { title: 'Спецификации', linkName: 'Specifications' },
          { title: 'Доп. соглашения', linkName: 'PageContractAgrees' },
          { title: 'Взаиморасчеты', linkName: 'PageContractSettles' },
          { title: 'Сопроводительные док.', linkName: 'PageContractWorkDocs' },
          { title: 'Ход исполнения', linkName: 'CooperationProgress' },
        ],
      }
    }
  }
</script>

<style lang="scss" scoped>
  .contract {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    margin: -10px;

    &__item {
      margin: 10px;
    }
  }
</style>
