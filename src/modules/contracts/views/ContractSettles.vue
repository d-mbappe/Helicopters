<template>
  <section>
    <div class="contract-settles">
      <div class="contract-settles__top">
        <div class="contract-settles__tabs">
          <div
            @click="activeTab = 'client'"
            :class="{'active' : activeTab === 'client'}"
            class="contract-settles__tab"
          >
            Гос заказчик
          </div>
          <div
            @click="activeTab = 'executors'"
            :class="{'active' : activeTab === 'executors'}"
            class="contract-settles__tab"
          >
            Исполнители
          </div>
        </div>
      </div>

      <div class="contract-settles__list">
        <template v-if="activeTab === 'client'">
          <contract-settle-card
            v-for="(item, i) in list"
            :key="i"
            :item="item"
            class="contract-settles__item"
          />
        </template>
        <template v-else>
          <CardsGallery
            :data="list2"
          />
        </template>
      </div>
    </div>
  </section>
</template>

<script>
  import ContractSettleCard from '../components/ContractSettles/ContractSettleCard';
  import CardsGallery from '@/components/common/CardsGallery';

  export default {
    name: 'PageContractSettles',
    components: {
      ContractSettleCard,
      CardsGallery,
    },
    data () {
      return {
        activeTab: 'client',
        list: [
          {
            title: 'Спецификация ГК',
            number: 'ВР-20-0056-04-02/СП 6.2',
            date: '02.09.2020',
            executor: 'АО «ВР»',
            vp: '№708',
            price: '20 000 000',
            link: 'settles/client/1',
          },
          {
            title: 'Спецификация ГК',
            number: 'ВР-20-0056-04-02/СП 6.2',
            date: '02.09.2020',
            executor: 'АО «ВР»',
            vp: '№708',
            price: '20 000 000',
            link: 'settles/client/1',
          },
          {
            title: 'Спецификация ГК',
            number: 'ВР-20-0056-04-02/СП 6.2',
            date: '02.09.2020',
            executor: 'АО «ВР»',
            vp: '№708',
            price: '20 000 000',
            link: 'settles/client/1',
          },
        ],
        list2: [
          {
            title: 'АО «356 АРЗ»',
            link: 'settles/executor/1',
          },
          {
            title: 'АО "СМПП"',
            link: 'settles/executor/1',
          },
          {
            title: 'АО «356 АРЗ»',
            link: 'settles/executor/1',
          },
          {
            title: 'АО "СМПП"',
            link: 'settles/executor/1',
          },
          {
            title: 'АО «356 АРЗ»',
            link: 'settles/executor/1',
          },
          {
            title: 'АО "СМПП"',
            link: 'settles/executor/1',
          },
          {
            title: 'АО «356 АРЗ»',
            link: 'settles/executor/1',
          },
          {
            title: 'АО "СМПП"',
            link: 'settles/executor/1',
          },
        ],
      }
    }
  }
</script>

<style lang="scss" scoped>
  .contract-settles {
    &__top {
      margin-bottom: 30px;
    }

    &__tabs {
      display: flex;
      align-items: center;
      margin: 0px -5px;
    }

    &__tab {
      cursor: pointer;
      display: flex;
      align-items: center;
      margin: 0px 5px;
      padding: 0px 15px;
      height: 44px;
      font-size: 12px;
      line-height: 14px;
      font-weight: 500;
      letter-spacing: 0.0em;
      text-transform: uppercase;
      color: $accent-blue;
      background: #E8F1FD;
      border-radius: 4px;
      transition: all .3s;
      &.active, &:hover {
        color: $white;
        background: $accent-blue;
      }
    }

    &__list {
      display: flex;
      flex-wrap: wrap;
      margin: -10px;
    }

    &__item {
      margin: 10px;
      width: calc(100% / 3 - 20px);
      &--2 {
        width: calc(100% / 4 - 20px);
      }
    }
  }
</style>
