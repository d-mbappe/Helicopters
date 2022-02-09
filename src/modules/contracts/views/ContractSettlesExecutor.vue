<template>
  <section>
    <div class="contract-settles-executor">
      <div class="contract-settles-executor__top">
        <a
          @click.prevent="$router.go(-1)"
          href="#"
          class="contract-settles-executor__back"
        >
          Вернуться назад
        </a>
      </div>

      <div class="contract-settles-executor__list">
        <contract-settle-card
          v-for="(item, i) in list"
          :key="i"
          :item="item"
          class="contract-settles-executor__item"
        />
      </div>
    </div>
  </section>
</template>

<script>
  import ContractSettleCard from '../components/ContractSettles/ContractSettleCard';

  export default {
    name: 'ContractSettlesExecutor',
    components: {
      ContractSettleCard,
    },
    data () {
      return {
        list: [
          {
            title: 'Спецификация',
            number: 'ВР-20-0056-04-02/СП 6.2',
            date: '02.09.2020',
            executor: 'АО «ВР»',
            vp: '№708',
            contract: '№ВР-20-0124-04-01',
            total: 566486016,
            current: 440486016,
            link: `${this.$route.params.id}/details`,
          },
          {
            title: 'Спецификация',
            number: 'ВР-20-0056-04-02/СП 6.2',
            date: '02.09.2020',
            executor: 'АО «ВР»',
            vp: '№708',
            contract: '№ВР-20-0124-04-01',
            total: 432116016,
            current: 220486016,
            link: `${this.$route.params.id}/details`,
          },
          {
            title: 'Спецификация',
            number: 'ВР-20-0056-04-02/СП 6.2',
            date: '02.09.2020',
            executor: 'АО «ВР»',
            vp: '№708',
            contract: '№ВР-20-0124-04-01',
            total: 632116016,
            current: 120486016,
            link: `${this.$route.params.id}/details`,
          },
        ],
      }
    }
  }
</script>

<style lang="scss" scoped>
  .contract-settles-executor {
    display: flex;
    flex-direction: column;

    &__top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 30px;
    }

    &__back {
      text-decoration: none;
      color: $accent-blue;
      font-weight: 500;
      font-size: 13px;
      line-height: 15px;
      letter-spacing: 0.01em;
      display: flex;
      align-items: center;
    }

    &__list {
      display: flex;
      flex-wrap: wrap;
      margin: -10px;
    }

    &__item {
      width: calc(100% / 3 - 20px);
      margin: 10px;
    }
  }
</style>
