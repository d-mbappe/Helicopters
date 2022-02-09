<template>
  <section>
    <div class="catalog">
      <CardsGallery :data="list" />
    </div>
  </section>
</template>

<script>
  import CardsGallery from '@/components/common/CardsGallery';

  export default {
    name: 'PageCatalog',
    components: {
      CardsGallery,
    },
    data() {
      return {
        routeRequest: null,
        list: [
          { title: 'Виды и подвиды работ', linkName: 'work-types' },
          { title: 'Наименования работ', linkName: 'work-name' },
          { title: 'Государственные заказчики', linkName: 'gov-customers'},
          { title: 'Исполнители/ВП', linkName: 'subcontractor' },
          { title: 'Получатели', linkName: 'recipients' },
          { title: 'Типы и модификации ВТ', linkName: 'helicopter' },
          { title: 'Контрольные точки', linkName: 'control-points' },
          { title: 'КИ', linkName: 'component' },
          { title: 'Единицы измерения', linkName: 'units' },
          { title: 'Справочник Пользователи системы', linkName: 'system-users' },
          { title: 'Статусы контрактов', linkName: 'status-contract' },
          { title: 'Статусы работ в перечне', linkName: 'status-supply' },
          { title: 'Статусы этапов', linkName: 'status-stage' },
          { title: 'Статусы корректировок', linkName: 'status-adjustment' },
          { title: 'Статусы спецификаций', linkName: 'status-specification' },
          { title: 'Прайс-лист Исполнители', linkName: 'performers-prices' },
          { title: 'НТД', linkName: 'catalog-standarts' },
          { title: 'Военные представительства', linkName: 'agency' },
        ],
      };
    },
  };
</script>

<style lang="scss" scoped>
  .catalog {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    margin: -10px;

    &__card {
      width: calc(100% / 4 - 20px);
      margin: 10px;
    }
  }
</style>
