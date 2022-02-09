<template>
  <div class="contract-settle-card">
    <div class="contract-settle-card__top">
      <div class="contract-settle-card__title">
        {{ item.title }}
      </div>

      <div class="contract-settle-card__btn">
        <img src="@/assets/icons/dots.svg">
      </div>
    </div>

    <div class="contract-settle-card__list">
      <div class="contract-settle-card__item">
        <div class="contract-settle-card__label">
          Номер:
        </div>
        <div class="contract-settle-card__value">
          {{ item.number }}
        </div>
      </div>
      <div class="contract-settle-card__item">
        <div class="contract-settle-card__label">
          Дата создания:
        </div>
        <div class="contract-settle-card__value">
          {{ item.date }}
        </div>
      </div>
      <div class="contract-settle-card__item">
        <div class="contract-settle-card__label">
          Исполнитель:
        </div>
        <div class="contract-settle-card__value">
          {{ item.executor }}
        </div>
      </div>
      <div class="contract-settle-card__item">
        <div class="contract-settle-card__label">
          ВП МО РФ:
        </div>
        <div class="contract-settle-card__value">
          {{ item.vp }}
        </div>
      </div>
      <div
        v-if="item.price"
        class="contract-settle-card__item"
      >
        <div class="contract-settle-card__label">
          Общая стоимость:
        </div>
        <div class="contract-settle-card__value">
          {{ item.price }} руб
        </div>
      </div>
      <div
        v-if="item.contract"
        class="contract-settle-card__item"
      >
        <div class="contract-settle-card__label">
          Договор:
        </div>
        <div class="contract-settle-card__value">
          {{ item.contract }}
        </div>
      </div>
    </div>

    <div class="contract-settle-card__status">
      Выполнена
    </div>

    <div
      v-if="item.total"
      class="contract-settle-card__progress"
    >
      <div class="contract-settle-card__total">
        {{ priceFormat(item.total) }} ₽
      </div>
      <div class="contract-settle-card__bar">
        <div
          :style="`width: ${progress}%`"
          :class="[{'contract-settle-card__bar-line--low' : progress >= 33 && progress <= 66}, {'contract-settle-card__bar-line--good' : progress >= 66}]"
          class="contract-settle-card__bar-line"
        />
      </div>
      <div class="contract-settle-card__current">
        {{ priceFormat(item.current) }} ₽
      </div>
    </div>

    <router-link
      :to="item.link"
      class="contract-settle-card__link"
    >
      посмотреть
    </router-link>
  </div>
</template>

<script>
  export default {
    name: 'ContractSettleCard',
    props: {
      item: {
        type: Object,
        default: () => ({}),
      },
    },
    computed: {
      progress () {
        if (this.item.total && this.item.current) {
          return 100 / this.item.total * this.item.current
        }
        return 0
      }
    },
    methods: {
      priceFormat (price) {
        const str = price.toString();
        return str.replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ');
      },
    }
  }
</script>

<style lang="scss" scoped>
  .contract-settle-card {
    background: $white;
    border-radius: 4px;
    box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.06);
    padding: 25px 25px 20px;
    width: 100%;
    display: flex;
    flex-direction: column;
    font-size: 13px;
    line-height: 15px;
    letter-spacing: 0.01em;
    color: $table-black;

    &__top {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      margin-bottom: 14px;
    }

    &__title {
      font-weight: 500;
      font-size: 18px;
      line-height: 21px;
      letter-spacing: 0.01em;
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
    }

    &__status {
      color: $menu-gray;
      padding-left: 19px;
      position: relative;
      margin-bottom: 10px;
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
        border: 2px solid $green;
      }
    }

    &__progress {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      margin-bottom: 10px;
    }

    &__total {
      font-weight: 500;
      margin-bottom: 7px;
    }

    &__bar {
      width: 100%;
      height: 2px;
      background: #D3D8DD;
      border-radius: 6px;
      position: relative;
      margin-bottom: 7px;
      &-line {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 0%;
        max-width: 100%;
        background: $red;
        &--low {
          background: $yellow;
        }
        &--good {
          background: $green;
        }
      }
    }

    &__current {
      font-size: 10px;
      line-height: 12px;
      color: $table-gray;
    }

    &__link {
      color: $accent-blue;
      text-decoration: underline;
    }
  }
</style>
