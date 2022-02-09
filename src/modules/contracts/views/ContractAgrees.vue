<template>
  <section>
    <div class="contract-agrees">
      <div class="contract-agrees__top">
        <div class="contract-agrees__btns">
          <div class="contract-agrees__filter">
            <img src="@/assets/svg/filter.svg">
          </div>

          <v-btn
            @click="isModal = true"
            label="Создать доп. соглашение"
            class="btn--primary btn--normal contract-agrees__btn"
          />
        </div>
      </div>

      <div class="contract-agrees__list">
        <contract-agrees-card
          v-for="(item, i) in list"
          :key="i"
          :item="item"
          class="contract-agrees__item"
        />
      </div>
    </div>

    <add-agreement
      v-if="isModal"
      @close="isModal = false"
    />
  </section>
</template>

<script>
  import ContractAgreesCard from '../components/ContractAgrees/ContractAgreesCard'

  export default {
    name: 'PageContractAgrees',
    components: {
      ContractAgreesCard,
      AddAgreement: () => import('../modals/AddAgreement')
    },
    data () {
      return {
        isModal: false, // попап создания доп. соглашения
        list: [
          {
            title: 'Дополнительное соглашение',
            number: 'ВР-20-0124-04-01/ДС-1',
            date: '21.08.2020',
            contract: '№ВР-20-0124-04-01',
            executor: 'АО “356 АРЗ”',
            desc: 'Корректировка спецификации',
            doc: 'ДС №ВР-20-0124-04-01/ДС-1'
          },
          {
            title: 'Дополнительное соглашение',
            number: '№ВР-20-0124-04-01/ДС-1',
            date: '21.08.2020',
            contract: '№ВР-20-0124-04-01',
            executor: 'АО “356 АРЗ”',
            desc: 'Корректировка спецификации',
            doc: 'ДС №ВР-20-0124-04-01/ДС-1'
          },
          {
            title: 'Дополнительное соглашение',
            number: '№ВР-20-0124-04-01/ДС-1',
            date: '21.08.2020',
            contract: '№ВР-20-0124-04-01',
            executor: 'АО “356 АРЗ”',
            desc: 'Корректировка спецификации',
            doc: 'ДС №ВР-20-0124-04-01/ДС-1'
          },
        ],
      }
    },
  }
</script>

<style lang="scss" scoped>
  .contract-agrees {
    display: flex;
    flex-direction: column;

    &__top {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin-bottom: 20px;
    }

    &__btns {
      display: flex;
      align-items: center;
    }

    &__filter {
      margin-right: 20px;
    }

    &__btn {
      width: 211px;
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
