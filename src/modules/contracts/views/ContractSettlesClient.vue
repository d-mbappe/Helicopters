<template>
  <section>
    <div class="contract-settles-client">
      <div class="contract-settles-client__top">
        <a
          @click.prevent="$router.go(-1)"
          href="#"
          class="contract-settles-client__back"
        >
          Вернуться назад
        </a>
      </div>

      <div class="contract-settles-client__stats">
        <div class="contract-settles-client__stat">
          <div class="contract-settles-client__stat-info">
            <div class="contract-settles-client__stat-title">
              Всего Авансов
            </div>
            <div class="contract-settles-client__stat-value">
              391 914 204, 00
            </div>
          </div>
          <div class="contract-settles-client__stat-icon contract-settles-client__stat-icon--green">
            <img src="@/assets/svg/wallet.svg">
          </div>
        </div>
        <div class="contract-settles-client__stat">
          <div class="contract-settles-client__stat-info">
            <div class="contract-settles-client__stat-title">
              Всего Ок. Расчетов
            </div>
            <div class="contract-settles-client__stat-value">
              391 914 204, 00
            </div>
          </div>
          <div class="contract-settles-client__stat-icon contract-settles-client__stat-icon--yellow">
            <img src="@/assets/svg/card.svg">
          </div>
        </div>
        <div class="contract-settles-client__stat">
          <div class="contract-settles-client__stat-info">
            <div class="contract-settles-client__stat-title">
              Всего Сданных работ
            </div>
            <div class="contract-settles-client__stat-value">
              56
            </div>
          </div>
          <div class="contract-settles-client__stat-icon contract-settles-client__stat-icon--purple">
            <img src="@/assets/svg/diagram.svg">
          </div>
        </div>
        <div class="contract-settles-client__stat">
          <div class="contract-settles-client__stat-info">
            <div class="contract-settles-client__stat-title">
              ГК в ценах АО “ВР”
            </div>
            <div class="contract-settles-client__stat-value">
              400 914 204, 00
            </div>
          </div>
          <div class="contract-settles-client__stat-icon contract-settles-client__stat-icon--red">
            <img src="@/assets/svg/discount.svg">
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'PageContractSettlesClient'
  }
</script>

<style lang="scss" scoped>
  .contract-settles-client {
    display: flex;
    flex-direction: column;

    &__top {
      display: flex;
      align-items: center;
      margin-bottom: 33px;
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

    &__stats {
      display: flex;
      margin: 0px -10px 20px;
    }

    &__stat {
      width: calc(100% / 4 - 20px);
      margin: 0px 10px;
      background: $white;
      box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.06);
      padding: 25px;
      display: flex;
      &-info {
        flex: 1 1 auto;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        font-weight: 500;
        letter-spacing: 0.01em;
      }
      &-title {
        font-size: 15px;
        line-height: 18px;
        color: $table-black;
      }
      &-value {
        font-size: 13px;
        line-height: 15px;
        color: $table-gray;
      }
      &-icon {
        flex: 0 0 auto;
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
        &--green {
          background: #EAFEF3;
        }
        &--yellow {
          background: #FFF0D8;
        }
        &--purple {
          background: #F2ECFF;
        }
        &--red {
          background: #FFEEF3;
        }
      }
    }
  }
</style>
