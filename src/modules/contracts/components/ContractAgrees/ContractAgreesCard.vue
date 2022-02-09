<template>
  <div class="contract-agrees-card">
    <div class="contract-agrees-card__header">
      <div class="contract-agrees-card__title">
        {{ item.title }}
      </div>

      <div class="contract-agrees-card__btn">
        <img src="@/assets/icons/dots.svg">
      </div>
    </div>

    <div class="contract-agrees-card__body">
      <div class="contract-agrees-card__item">
        <div class="contract-agrees-card__label">
          Номер:
        </div>
        <div class="contract-agrees-card__value">
          №{{ item.number }}
        </div>
      </div>
      <div class="contract-agrees-card__item">
        <div class="contract-agrees-card__label">
          Дата:
        </div>
        <div class="contract-agrees-card__value">
          {{ item.date }}
        </div>
      </div>
      <div class="contract-agrees-card__item">
        <div class="contract-agrees-card__label">
          Договор:
        </div>
        <div class="contract-agrees-card__value">
          {{ item.contract }}
        </div>
      </div>
      <div class="contract-agrees-card__item">
        <div class="contract-agrees-card__label">
          Исполнитель:
        </div>
        <div class="contract-agrees-card__value">
          {{ item.executor }}
        </div>
      </div>
      <div class="contract-agrees-card__item">
        <div class="contract-agrees-card__label">
          Основание:
        </div>
        <div class="contract-agrees-card__value">
          {{ item.desc }}
        </div>
      </div>
      <div class="contract-agrees-card__item">
        <div class="contract-agrees-card__label">
          Документ:
        </div>
        <a
          href="#"
          class="contract-agrees-card__value contract-agrees-card__value--link">
          {{ item.doc }}
        </a>
      </div>
    </div>

    <div class="contract-agrees-card__footer">
      <router-link
        to="/"
        class="contract-agrees-card__link"
      >
        посмотреть
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ContractAgreesCard',
    props: {
      item: {
        type: Object,
        default: () => ({})
      }
    }
  }
</script>

<style lang="scss" scoped>
  .contract-agrees-card {
    padding: 25px 25px 20px;
    background: $white;
    box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.06);
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    font-size: 13px;
    line-height: 15px;
    letter-spacing: 0.01em;

    &__header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      margin-bottom: 14px;
    }

    &__title {
      font-size: 18px;
      line-height: 21px;
      font-weight: 500;
      color: $table-black;
      max-width: 80%;
    }

    &__btn {
      cursor: pointer;
    }

    &__body {
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
      &--link {
        color: $accent-blue;
        text-decoration: none;
      }
    }

    &__link {
      color: $accent-blue;
      text-decoration: underline;
    }
  }
</style>
