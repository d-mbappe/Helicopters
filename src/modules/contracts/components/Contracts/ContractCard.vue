<template>
  <div class="contract-card">
    <div class="contract-card__header">
      <div class="contract-card__title">
        Наименование
      </div>

      <div class="contract-card__number">
        № {{ item.number }}
      </div>
    </div>

    <div class="contract-card__desc">
      {{ item.title }}
    </div>

    <div class="contract-card__list">
      <div class="contract-card__item">
        <div class="contract-card__label">
          Дата контракта:
        </div>
        <div class="contract-card__value">
          {{ item.date }}
        </div>
      </div>
      <div class="contract-card__item">
        <div class="contract-card__label">
          Срок выполнения:
        </div>
        <div class="contract-card__value">
          {{ item.deadline }}
        </div>
      </div>
    </div>

    <div class="contract-card__cols">
      <div class="contract-card__col">
        <div class="contract-card__head">
          Объем финансирования
        </div>
        <div class="contract-card__text">
          <span
            v-for="(stage, stageKey) in item.stages"
            :key="stageKey"
          >
            {{ stage.year }} - {{ stage.founding }} руб
          </span>
        </div>
      </div>
      <div class="contract-card__col">
        <div class="contract-card__head">
          Заказчик
        </div>
        <div class="contract-card__text">
          {{ item.customer.name }}
        </div>
      </div>
      <div class="contract-card__col">
        <div class="contract-card__head">
          Цена
        </div>
        <div class="contract-card__text">
          {{ item.price }} руб.
        </div>
      </div>
    </div>

    <div class="contract-card__footer">
      <div
        :class="`contract-card__status--${item.status.name.substring(0,2)}`"
        class="contract-card__status"
      >
        {{ item.status.name }}
      </div>

      <div class="contract-card__links">
        <router-link
          :to="{name: 'PageContract', params: {number: item.number, id: item.id}}"
          class="contract-card__link contract-card__link--blue"
        >
          посмотреть
        </router-link>
        <div
          class="contract-card__link"
          @click="$emit('edit-item', item)"
        >
          редактировать
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconSwitch from "@/components/simple/IconSwitch";
export default {
  name: 'ContractCard',
  components: {
    IconSwitch,
  },
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  },

  methods: {
    returnStatus () {
      let str = ''
      switch (this.item.status) {
        case 'end':
          str = 'Завершен'
          break
        case 'progress':
          str = 'На исполнении'
          break
        case 'project':
          str = 'Проект'
          break
        default:
          str = this.item.status
          break
      }
      return str
    }
  }
}
</script>

<style lang="scss" scoped>
  .contract-card {
    background: $white;
    box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.06);
    border-radius: 4px;
    padding: 25px 25px 20px;
    display: flex;
    flex-direction: column;
    font-size: 13px;
    line-height: 15px;
    letter-spacing: 0.01em;
    min-height: 224px;

    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;
    }

    &__title {
      font-size: 18px;
      line-height: 21px;
      font-weight: 500;
      letter-spacing: 0.01em;
      color: $table-black;
    }

    &__number {
      color: #A5ACB1;
    }

    &__desc {
      max-width: 80%;
      color: $table-gray;
      margin-bottom: 6px;
    }

    &__list {
      display: flex;
      flex-direction: column;
      margin-bottom: 10px;
    }

    &__item {
      display: flex;
      align-items: center;
      margin-bottom: 3px;
      &:last-child {
        margin-bottom: 0;
      }
    }

    &__label {
      color: $table-gray;
      margin-right: 2px;
    }

    &__value {
      font-weight: 500;
      color: $table-black;
    }

    &__cols {
      display: flex;
      align-items: flex-start;
      margin-bottom: 10px;
    }

    &__col {
      width: calc(100% / 3);
      padding: 0px 5px;
      display: flex;
      flex-direction: column;
      &:first-child {
        padding-left: 0;
      }
      &:last-child {
        padding-right: 0;
      }
    }

    &__head {
      color: $table-black;
      font-weight: 500;
      margin-bottom: 6px;
    }

    &__text {
      display: flex;
      flex-direction: column;
      color: $table-gray;
    }

    &__footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &__status {
      color: $menu-gray;
      padding-left: 19px;
      position: relative;
      &:before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        border: 2px solid;
      }
      &--Пр {
        &:before {
          border-color: $green;
        }
      }
      &--За {
        &:before {
          border-color: $yellow;
        }
      }
      &--На {
        &:before {
          border-color: $purple;
        }
      }
    }

    &__links {
      display: flex;
      align-items: center;
      margin: 0px -4px;
    }
    &__link {
      color: #A5ACB1;
      text-decoration: underline;
      margin: 0px 4px;
      cursor: pointer;
      &--blue {
        color: $accent-blue;
      }
    }
  }
</style>
